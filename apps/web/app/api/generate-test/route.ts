import { authOptions } from "@/config/auth";
import { openai } from "@/config/openai";
import { OPENAI_TASKS } from "@/constants/openai";
import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { prompt, difficulty = 2 } = await req.json();
  if (!prompt)
    return NextResponse.json({ error: "Missing prompt" }, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const ai = await openai.chat.completions.create({
    model: OPENAI_TASKS.generateTest.model,
    messages: [
      {
        role: "user",
        content: JSON.stringify({
          instructions: `${OPENAI_TASKS.generateTest.system}
            The desired difficulty level is ${difficulty}/3 
            (1 = easy, 2 = medium, 3 = hard).`,
          prompt,
        }),
      },
    ],
    response_format: { type: "json_object" },
  });

  const result = JSON.parse(ai.choices[0]?.message.content || "{}");

  if (result.error || !result.title || !result.question || !result.solution) {
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { warnings: { increment: 1 } },
    });

    if (updated.warnings >= 2) {
      return NextResponse.json({
        blocked: true,
        feedback:
          "Your account has been locked due to repeated invalid or spammy prompts.",
      });
    }

    return NextResponse.json({
      warning: true,
      warnings: updated.warnings,
      feedback:
        result.error ||
        "Your prompt was considered invalid or meaningless. Please provide a clearer description.",
    });
  }

  const test = await prisma.test.create({
    data: {
      userId: user.id,
      title: result.title,
      language: result.language || "Unknown",
      question: result.question,
      prompt,
      solution: result.solution,
    },
  });

  return NextResponse.json(test);
}

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

  const { prompt } = await req.json();
  if (!prompt)
    return NextResponse.json({ error: "Missing prompt" }, { status: 400 });

  const ai = await openai.chat.completions.create({
    model: OPENAI_TASKS.generateTest.model,
    messages: [
      {
        role: "user",
        content: JSON.stringify({
          instructions: OPENAI_TASKS.generateTest.system,
          prompt,
        }),
      },
    ],
    response_format: { type: "json_object" },
  });

  const result = JSON.parse(ai.choices[0]?.message.content || "{}");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const test = await prisma.test.create({
    data: {
      userId: user!.id,
      title: result.title || "Untitled test",
      language: "typescript",
      question: result.question || "",
      prompt,
      solution: result.solution || "",
      explanation: result.explanation || "",
    },
  });

  return NextResponse.json(test);
}

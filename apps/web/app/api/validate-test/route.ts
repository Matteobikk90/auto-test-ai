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

  const { testId, code } = await req.json();
  if (!testId || !code)
    return NextResponse.json({ error: "Missing data" }, { status: 400 });

  const test = await prisma.test.findUnique({ where: { id: testId } });
  if (!test)
    return NextResponse.json({ error: "Test not found" }, { status: 404 });

  const ai = await openai.chat.completions.create({
    model: OPENAI_TASKS.validateSubmission.model,
    messages: [
      {
        role: "user",
        content: JSON.stringify({
          instructions: OPENAI_TASKS.validateSubmission.system,
          question: test.question,
          solution: test.solution,
          userCode: code,
        }),
      },
    ],
    response_format: { type: "json_object" },
  });

  const result = JSON.parse(ai.choices[0]?.message.content || "{}");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  const submission = await prisma.submission.create({
    data: {
      testId,
      userId: user!.id,
      code,
      passed: result.passed,
      feedback: result.feedback,
    },
  });

  return NextResponse.json(submission);
}

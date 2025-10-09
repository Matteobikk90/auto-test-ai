import { prisma } from "@repo/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, name, bio, image } = await req.json();
    if (!email || !password)
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );

    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { email, password: hashed, name, bio, image },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}

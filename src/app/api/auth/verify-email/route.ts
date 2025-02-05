import { NextRequest, NextResponse } from "next/server";
import { verifyResetPasswordToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/session";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }
  const payload = await verifyResetPasswordToken(token);

  if (!payload?.userId) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  try {
    await prisma.user.update({
      where: { id: payload.userId as string },
      data: { isVerified: true },
    });
  } catch (error) {
    console.error("Failed to verify account", error);
    return NextResponse.json(
      { error: "Failed to verify account" },
      { status: 500 },
    );
  }

  await createSession(payload.userId as string);

  redirect("/dashboard");
}

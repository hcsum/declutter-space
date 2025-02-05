"use server";

import "server-only";
import { SignJWT, jwtVerify } from "jose";

const RESET_PASSWORD_TOKEN_SECRET =
  process.env.RESET_PASSWORD_TOKEN_SECRET || "fallback-secret";
const encodedKey = new TextEncoder().encode(RESET_PASSWORD_TOKEN_SECRET);

export async function createResetPasswordToken(userId: string) {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS512" })
    .setExpirationTime("1h")
    .setIssuedAt()
    .sign(encodedKey);
}

export async function verifyResetPasswordToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS512"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify reset token", error);
  }
}

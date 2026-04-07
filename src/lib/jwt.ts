"use server";

import "server-only";
import { SignJWT, jwtVerify } from "jose";

const USER_1H_TOKEN_SECRET = process.env.USER_1H_TOKEN_SECRET;

if (!USER_1H_TOKEN_SECRET) {
  throw new Error("USER_1H_TOKEN_SECRET is missing in environment variables");
}

const encodedKey = new TextEncoder().encode(USER_1H_TOKEN_SECRET);

export async function createUser1HToken(userId: string) {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS512" })
    .setExpirationTime("1h")
    .setIssuedAt()
    .sign(encodedKey);
}

export async function verifyUser1HToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS512"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify reset token", error);
  }
}

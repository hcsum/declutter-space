import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import type { SessionPayload } from "@/lib/definitions";

export async function GET() {
  const cookie = (await cookies()).get("session")?.value;
  const payload = (await decrypt(cookie)) as SessionPayload | null;
  const loggedIn = Boolean(payload?.userId);
  return NextResponse.json({ loggedIn });
}

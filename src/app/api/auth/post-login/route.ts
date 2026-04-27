import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session";
import { createUser } from "@/actions/user";
import { sanitizePostLoginNextPath } from "@/lib/google-auth";

// Ensure Node runtime for Prisma/bcrypt compatibility
export const runtime = "nodejs";

// After a successful OAuth login with NextAuth, we land here to
// map the NextAuth user to our own User record and set our app session cookie.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const nextPath = sanitizePostLoginNextPath(url.searchParams.get("next"));

  const session = await getServerSession(authOptions);
  const email = session?.user?.email as string | undefined;
  const name = session?.user?.name as string | undefined;

  if (!email) {
    // Could not read email from NextAuth session; send user back to login.
    return NextResponse.redirect(new URL("/?error=google_no_email", url));
  }

  // Find or create the user in our own DB.
  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    // Create a random password so the required field is satisfied.
    const random = `oauth-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const hashedPassword = await bcrypt.hash(random, 10);

    user = await createUser({
      name: name || email.split("@")[0],
      email,
      password: hashedPassword,
      isVerified: true, // Email verified via Google OAuth
    });
  } else if (!user.isVerified) {
    // Trust Google-verfied email for OAuth logins.
    user = await prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true },
    });
  }

  await createSession(user.id);

  return NextResponse.redirect(new URL(nextPath, url));
}

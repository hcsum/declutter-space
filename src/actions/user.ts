"use server";
import { verifySession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { checkMembershipStatus } from "./membership";
import { createPresetCategories } from "./category";
import Stripe from "stripe";
import { redirect } from "next/navigation";

export async function createUser(data: Prisma.UserCreateInput) {
  const user = await prisma.user.create({
    data,
  });

  await createPresetCategories(user.id);

  return user;
}

export async function getUserInfo<T extends Prisma.UserSelect>(
  select?: T,
): Promise<
  Prisma.UserGetPayload<{ select: T }> & {
    membership: Stripe.Subscription | null;
  }
> {
  const { userId } = await verifySession();

  const result = (await prisma.user.findUnique({
    where: {
      id: userId as string,
    },
    select: {
      id: true,
      name: true,
      email: true,
      imageAnalysisUsedCount: true,
      isVerified: true,
      ...select,
    },
  })) as Prisma.UserGetPayload<{ select: T }> | null;

  if (!result) {
    // (await cookies()).delete("session"); // won't work, nextjs complains: Cookies can only be modified in a Server Action or Route Handler.
    // so this is not a freaking server action, just a server function, wtf
    // heck: redirect to a path call /logout, and modify cookie there, then redirect to login page.
    redirect("/logout");
  }

  const membership = await checkMembershipStatus();

  return { ...result, membership };
}

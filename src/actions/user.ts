"use server";
import { verifySession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { checkSubscriptionStatus, SubscriptionStatus } from "./subscription";

export async function getUserInfo<T extends Prisma.UserSelect>(
  select?: T,
): Promise<
  Prisma.UserGetPayload<{ select: T }> & { status: SubscriptionStatus }
> {
  const { userId } = await verifySession();

  const result = (await prisma.user.findUniqueOrThrow({
    where: {
      id: userId as string,
    },
    select: {
      id: true,
      name: true,
      email: true,
      ...select,
    },
  })) as Prisma.UserGetPayload<{ select: T }>;

  const status = await checkSubscriptionStatus();

  return { ...result, status };
}

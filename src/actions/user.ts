"use server";
import { verifySession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { checkMembershipStatus, MembershipStatus } from "./membership";

export async function getUserInfo<T extends Prisma.UserSelect>(
  select?: T,
): Promise<
  Prisma.UserGetPayload<{ select: T }> & {
    membership: {
      status: MembershipStatus;
      currentPeriodEnd: Date | null;
    };
  }
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

  const membership = await checkMembershipStatus();

  return { ...result, membership };
}

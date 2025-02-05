"use server";
import { verifySession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getUserInfo<T extends Prisma.UserSelect>(
  select?: T,
): Promise<Prisma.UserGetPayload<{ select: T }>> {
  const { userId } = await verifySession();

  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId as string,
    },
    select: {
      id: true,
      ...select,
    },
  });

  return result as Prisma.UserGetPayload<{ select: T }>;
}

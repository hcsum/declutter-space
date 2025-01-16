"use server";
import { verifySession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function getUserById() {
  const { userId } = await verifySession();
  const result = await prisma.user.findUnique({
    where: {
      id: userId as string,
    },
    select: {
      id: true,
    },
  });
  return result;
}

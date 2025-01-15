"use server";
import { prisma } from "@/lib/prisma";

export default async function getUserById() {
  const result = await prisma.user.findUnique({
    where: {
      id: "20a01eeb-534a-4909-b118-f008cf05ce0f",
    },
  });
  return result;
}

"use server";

import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { Prisma } from "@prisma/client";

export async function getItems() {
  const { userId } = await verifySession();
  console.log("userId", userId);
  const items = await prisma.item.findMany({
    where: { userId: userId },
  });
  return items;
}

export async function createItem(
  item: Omit<Prisma.ItemCreateInput, "userId" | "user">,
) {
  const { userId } = await verifySession();
  const newItem = await prisma.item.create({
    data: {
      ...item,
      user: { connect: { id: userId } },
    },
  });
  return newItem;
}

export async function deleteItem(id: string) {
  const { userId } = await verifySession();
  await prisma.item.delete({
    where: { id, userId: userId },
  });
}

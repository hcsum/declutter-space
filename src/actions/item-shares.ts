"use server";

import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { z } from "zod";

const shareSchema = z.object({
  story: z.string().trim().max(600),
  // New images are compressed in the browser. Never accept an arbitrary URL.
  image: z
    .string()
    .max(1_800_000)
    .regex(/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/)
    .nullable(),
});

export async function getItemShare(itemId: string) {
  const { userId } = await verifySession();
  const item = await prisma.item.findUniqueOrThrow({
    where: { id: itemId, userId },
    select: { share: { select: { token: true, story: true, image: true } } },
  });
  return item.share;
}

export async function saveItemShare(
  itemId: string,
  input: { story: string; image: string | null },
) {
  const { userId } = await verifySession();
  const data = shareSchema.parse(input);
  // Ownership is checked inside the same transaction as publishing.
  return prisma.$transaction(async (tx) => {
    await tx.item.findUniqueOrThrow({ where: { id: itemId, userId } });
    const share = await tx.itemShare.upsert({
      where: { itemId },
      create: { itemId, ...data },
      update: data,
      select: { token: true },
    });
    return share;
  });
}

export async function disableItemShare(itemId: string) {
  const { userId } = await verifySession();
  await prisma.itemShare.deleteMany({ where: { itemId, item: { userId } } });
}

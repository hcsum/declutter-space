"use server";

import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { z } from "zod";

const uploadedImageSchema = z
  .string()
  .max(1_800_000)
  .regex(/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/);

const shareSchema = z.object({
  story: z.string().trim().max(600),
  image: z.string().max(1_800_000).nullable(),
});

export async function saveItemPhoto(itemId: string, image: string) {
  const { userId } = await verifySession();
  const validated = uploadedImageSchema.parse(image);
  await prisma.item.update({
    where: { id: itemId, userId },
    data: { image: validated },
  });
}

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
    const item = await tx.item.findUniqueOrThrow({
      where: { id: itemId, userId },
      select: { image: true, share: { select: { image: true } } },
    });
    // Only accept new uploaded data or a photo already belonging to this item.
    if (
      data.image &&
      data.image !== item.image &&
      data.image !== item.share?.image
    ) {
      uploadedImageSchema.parse(data.image);
    }
    const image = data.image ?? item.image;
    if (image && image !== item.image) {
      await tx.item.update({ where: { id: itemId, userId }, data: { image } });
    }
    const share = await tx.itemShare.upsert({
      where: { itemId },
      create: { itemId, story: data.story, image },
      update: { story: data.story, image },
      select: { token: true, image: true },
    });
    return share;
  });
}

export async function disableItemShare(itemId: string) {
  const { userId } = await verifySession();
  await prisma.itemShare.deleteMany({ where: { itemId, item: { userId } } });
}

"use server";

import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { uploadImageToWorker } from "@/lib/upload-helper";
import { Prisma } from "@prisma/client";
import fs from "fs";

export type ItemCreateInput = Omit<Prisma.ItemCreateInput, "userId" | "user">;

export async function getItems() {
  const { userId } = await verifySession();
  console.log("userId", userId);
  const items = await prisma.item.findMany({
    where: { userId: userId },
  });
  return items;
}

export async function createItem(item: ItemCreateInput) {
  const { userId } = await verifySession();
  const newItem = await prisma.item.create({
    data: {
      ...item,
      user: { connect: { id: userId } },
    },
  });
  return newItem;
}

export async function createManyItems(items: ItemCreateInput[]) {
  const { userId } = await verifySession();
  const newItems = await prisma.item.createMany({
    data: items.map((item) => ({
      ...item,
      userId: userId,
    })),
  });
  return newItems;
}

export async function deleteItem(id: string) {
  const { userId } = await verifySession();
  await prisma.item.delete({
    where: { id, userId: userId },
  });
}

export async function bulkAddItemsByImage(imageData: string) {
  // const { userId } = await verifySession();

  // Convert base64 to buffer and save to temp file
  const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  const tempFilePath = `/tmp/upload-${Date.now()}.png`;
  fs.writeFileSync(tempFilePath, buffer);

  try {
    // Upload image and process it
    const items = await uploadImageToWorker(tempFilePath);
    console.log("items", items);

    // Clean up temp file
    fs.unlinkSync(tempFilePath);

    return items.filter((item) => item.score > 0.5);
  } catch (error) {
    console.error("Error processing image:", error);
    throw new Error("Failed to process image");
  }
}

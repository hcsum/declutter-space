"use server";

import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { uploadImageToWorker } from "@/lib/upload-helper";
import { ItemPlan, Prisma } from "@prisma/client";
import fs from "fs";
import { revalidatePath } from "next/cache";

export type ItemCreateInput = Omit<Prisma.ItemCreateInput, "userId" | "user">;

export async function getItems() {
  const { userId } = await verifySession();
  const items = await prisma.item.findMany({
    where: { userId: userId },
  });
  return items;
}

export async function createItem(formData: FormData) {
  const { userId } = await verifySession();

  const name = formData.get("name") as string;
  const pieces = parseInt(formData.get("pieces") as string);
  const deadlineMonths = parseInt(formData.get("deadline") as string);
  const deadline = new Date();
  deadline.setMonth(deadline.getMonth() + deadlineMonths);

  await prisma.item.create({
    data: {
      name,
      pieces,
      deadline,
      plan: ItemPlan.UNDECIDED,
      user: { connect: { id: userId } },
    },
  });
  revalidatePath("/dashboard");
}

export async function createManyItems(items: ItemCreateInput[]) {
  const { userId } = await verifySession();
  await prisma.item.createMany({
    data: items.map((item) => ({
      ...item,
      userId: userId,
    })),
  });
  revalidatePath("/dashboard");
}

export async function deleteItem(id: string) {
  const { userId } = await verifySession();
  await prisma.item.delete({
    where: { id, userId: userId },
  });
}

export async function bulkAddItemsByImage(imageData: string) {
  await verifySession();

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

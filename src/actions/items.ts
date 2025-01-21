"use server";

import { ItemFormSchema, ItemFormState } from "@/lib/definitions";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { uploadImageToWorker } from "@/lib/upload-helper";
import { ItemPlan, Prisma } from "@prisma/client";
import fs from "fs";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type ItemCreateInput = Omit<Prisma.ItemCreateInput, "userId" | "user">;

export async function getItems(
  page: number = 1,
  limit: number = 10,
  search?: string,
) {
  const { userId } = await verifySession();

  const whereClause = {
    userId: userId,
    ...(search
      ? {
          name: {
            contains: search,
            mode: "insensitive" as const,
          },
        }
      : {}),
  };

  // Get total count for pagination
  const total = await prisma.item.count({
    where: whereClause,
  });

  const items = await prisma.item.findMany({
    where: whereClause,
    orderBy: [
      { updatedAt: "desc" },
      { createdAt: "desc" },
      { deadline: "asc" },
    ],
    take: limit,
    skip: (page - 1) * limit,
  });

  return {
    items,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function createItem(
  state: ItemFormState | undefined,
  formData: FormData,
): Promise<ItemFormState | undefined> {
  const { userId } = await verifySession();

  const validationResult = ItemFormSchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { name, pieces, deadline } = validationResult.data;

  const deadlineDate = new Date();
  deadlineDate.setMonth(deadlineDate.getMonth() + deadline);

  await prisma.item.create({
    data: {
      name,
      pieces,
      deadline: deadlineDate,
      plan: ItemPlan.UNDECIDED,
      user: { connect: { id: userId } },
    },
  });
  revalidatePath("/dashboard");
}

export async function createManyItems(
  items: ItemCreateInput[],
): Promise<{ errors?: string } | undefined> {
  const { userId } = await verifySession();

  const validationResult = z.array(ItemFormSchema).safeParse(items);

  if (!validationResult.success) {
    return {
      errors: "invalid items",
    };
  }

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

    // Clean up temp file
    fs.unlinkSync(tempFilePath);

    return items.filter((item) => item.score > 0.5);
  } catch (error) {
    console.error("Error processing image:", error);
    throw new Error("Failed to process image");
  }
}

export async function updateItem(
  id: string,
  data: {
    name: string;
    pieces: number;
    deadline: Date;
  },
) {
  const { userId } = await verifySession();

  const validationResult = ItemFormSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  await prisma.item.update({
    where: {
      id,
      userId,
    },
    data: {
      name: data.name,
      pieces: data.pieces,
      deadline: data.deadline,
    },
  });

  revalidatePath("/dashboard");
  return { success: true };
}

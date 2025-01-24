"use server";

import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { uploadImageToWorker } from "@/lib/upload-helper";
import { ItemPlan, Prisma } from "@prisma/client";
import fs from "fs";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type ItemCreateInput = {
  name: string;
  pieces: number;
  deadline: Date;
};

const ItemFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  pieces: z.coerce.number().min(1, { message: "Must be at least 1 piece." }),
  deadline: z.coerce
    .date()
    .min(new Date(), { message: "Deadline must be in the future." }),
});

export type ItemFormState =
  | {
      errors?: {
        name?: string[];
        pieces?: string[];
        deadline?: string[];
      };
    }
  | undefined;

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

  const total = await prisma.item.count({
    where: whereClause,
  });

  const items = await prisma.item.findMany({
    where: whereClause,
    orderBy: [
      { updatedAt: "desc" },
      { createdAt: "desc" },
      { deadline: "desc" },
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

  await prisma.item.create({
    data: {
      name,
      pieces,
      deadline,
      startDate: new Date(),
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
    data: validationResult.data.map((item) => ({
      ...item,
      userId: userId,
      startDate: new Date(),
      deadline: item.deadline,
      plan: ItemPlan.UNDECIDED,
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

    return items.filter((item) => item.score > 0.2);
  } catch (error) {
    console.error("Error processing image:", error);
    throw new Error("Failed to process image");
  }
}

export async function updateItem(id: string, data: Partial<ItemCreateInput>) {
  const { userId } = await verifySession();

  const validationResult = ItemFormSchema.partial().safeParse(data);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const item = await prisma.item.findUniqueOrThrow({
    where: {
      id,
      userId,
    },
  });

  const updateData: Prisma.ItemUpdateInput = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.pieces !== undefined) updateData.pieces = data.pieces;
  if (data.deadline !== undefined) updateData.deadline = data.deadline;
  if (data.deadline !== item.deadline) {
    updateData.startDate = new Date();
  }

  await prisma.item.update({
    where: {
      id,
      userId,
    },
    data: updateData,
  });

  revalidatePath("/dashboard");
  return { success: true };
}

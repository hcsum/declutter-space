"use server";

import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import {
  DetectedItemChatGPT,
  uploadImageToWorker,
} from "@/lib/upload-helper-chatgpt";
import { validateImageAnalysisUsage } from "@/lib/utils";
import { ItemPlan, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { checkMembershipStatus } from "./membership";
import {
  ERROR_FREE_TRAIL_ITEM_LIMIT,
  FREE_TRAIL_ITEMS_LIMIT,
} from "@/lib/definitions";

export type ItemCreateInput = {
  name: string;
  pieces: number;
  deadline: number; // Represented in months
  categoryId?: string; // Optional category ID
};

export type ItemUpdateInput = {
  name: string | null;
  pieces: number | null;
  deadline: Date | null;
  categoryId: string | null;
};

const CreateItemFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  pieces: z.coerce.number().min(1, { message: "Must be at least 1 piece." }),
  deadline: z.coerce.number().min(1, { message: "Invalid deadline." }),
  categoryId: z.string().optional(), // Validate as optional string
});

const UpdateItemFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim()
    .optional(),
  pieces: z.coerce
    .number()
    .min(1, { message: "Must be at least 1 piece." })
    .optional(),
  deadline: z.coerce
    .date()
    // .refine(
    //   (date) => date.getTime() > new Date().getTime() - 1000 * 60 * 60 * 24,
    //   {
    //     message: "Deadline must be in the future.",
    //   },
    // )
    .optional(),
  categoryId: z.string().optional(), // Validate as optional string
});

export type ItemFormState =
  | {
      errors?: {
        name?: string[];
        pieces?: string[];
        deadline?: string[];
        categoryId?: string[];
        freeTrailLimitReached?: boolean;
      };
      success?: boolean;
    }
  | undefined;

export async function getItems(
  page: number = 1,
  limit: number = 10,
  search?: string,
  category?: string,
  archived?: boolean,
) {
  const { userId } = await verifySession();

  const whereClause = {
    userId,
    ...(search
      ? {
          name: {
            contains: search,
            mode: "insensitive" as const,
          },
        }
      : {}),
    ...(category
      ? {
          category: {
            id: category,
          },
        }
      : {}),
    ...(archived ? { archivedAt: { not: null } } : { archivedAt: null }),
  };

  const total = await prisma.item.count({
    where: whereClause,
  });

  const items = await prisma.item.findMany({
    where: whereClause,
    orderBy: [{ deadline: "asc" }, { createdAt: "desc" }, { id: "desc" }],
    include: { category: true },
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
  formData: FormData,
): Promise<ItemFormState | undefined> {
  const { userId } = await verifySession();

  try {
    await verifyFreeTrialLimit();
  } catch {
    return {
      errors: {
        freeTrailLimitReached: true,
      },
    };
  }

  const validationResult = CreateItemFormSchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { name, pieces, deadline, categoryId } = validationResult.data;

  const deadlineDate = new Date(
    new Date().setMonth(new Date().getMonth() + deadline),
  );

  await prisma.item.create({
    data: {
      name,
      pieces,
      deadline: deadlineDate,
      startDate: new Date(),
      plan: ItemPlan.UNDECIDED,
      user: { connect: { id: userId } },
      category: categoryId ? { connect: { id: categoryId } } : undefined,
    },
  });
  revalidatePath("/dashboard");

  return {
    success: true,
  };
}

export async function createManyItems(
  items: ItemCreateInput[],
): Promise<{ error?: string } | undefined> {
  const { userId } = await verifySession();

  try {
    await verifyFreeTrialLimit();
  } catch {
    return {
      error: ERROR_FREE_TRAIL_ITEM_LIMIT,
    };
  }

  const validationResult = z.array(CreateItemFormSchema).safeParse(items);

  if (!validationResult.success) {
    return {
      error: "invalid items",
    };
  }
  console.log("items", items);

  await prisma.item.createMany({
    data: validationResult.data.map((item) => ({
      ...item,
      userId: userId,
      startDate: new Date(),
      deadline: new Date(
        new Date().setMonth(new Date().getMonth() + item.deadline),
      ),
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

export async function bulkAddItemsByImage(imageData: string): Promise<{
  error?: string;
  items?: DetectedItemChatGPT[];
}> {
  try {
    await verifyFreeTrialLimit();
  } catch {
    return {
      error: ERROR_FREE_TRAIL_ITEM_LIMIT,
    };
  }

  const { userId } = await verifySession();

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
  });

  validateImageAnalysisUsage(user);

  try {
    const base64WithPrefix = imageData.startsWith("data:image/")
      ? imageData
      : `data:image/jpeg;base64,${imageData}`;

    const items = await uploadImageToWorker(base64WithPrefix);

    await prisma.user.update({
      where: { id: userId },
      data: {
        imageAnalysisUsedCount: { increment: 1 },
        imageAnalysisUsedAt: new Date(),
      },
    });

    return { items };
  } catch (error) {
    console.error("Error processing image:", error);
    throw new Error("Failed to process image");
  }
}

export async function updateItem(id: string, data: Partial<ItemUpdateInput>) {
  const { userId } = await verifySession();

  const validationResult = UpdateItemFormSchema.safeParse(data);

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
  if (data.name !== null) updateData.name = data.name;
  if (data.pieces !== null) updateData.pieces = data.pieces;
  if (data.deadline !== null) updateData.deadline = data.deadline;
  if (data.categoryId !== null) {
    updateData.category = data.categoryId
      ? { connect: { id: data.categoryId } }
      : { disconnect: true };
  }

  if (updateData.deadline && updateData.deadline !== item.deadline) {
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
}

export async function archiveItem(id: string) {
  await prisma.item.update({
    where: { id },
    data: { archivedAt: new Date() },
  });
}

async function verifyFreeTrialLimit() {
  const [membership, { total }] = await Promise.all([
    checkMembershipStatus(),
    getItems(),
  ]);

  if (!membership?.isActive && total >= FREE_TRAIL_ITEMS_LIMIT) {
    throw ERROR_FREE_TRAIL_ITEM_LIMIT;
  }
}

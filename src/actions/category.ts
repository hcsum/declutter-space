"use server";

import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { z } from "zod";

const presetCategories = [
  "Wardrobe (Clothes, Shoes, Accessories)",
  "Kitchen (Utensils, Appliances, Pantry Items)",
  "Electronics (Gadgets, Cables, Old Devices)",
  "Furniture (Chairs, Tables, Storage Units)",
  "Books & Stationery (Books, Notebooks, Office Supplies)",
  "Toys & Games (Kids' Toys, Board Games, Video Games)",
  "Decor & Collectibles (Wall Art, Figurines, Seasonal Decor)",
  "Personal Care (Cosmetics, Skincare, Grooming Items)",
  "Garage & Tools (Hardware, DIY Tools, Car Accessories)",
  "Sports & Fitness (Workout Equipment, Sports Gear)",
  "Outdoor & Camping (Tents, Travel Gear, Gardening Tools)",
  "Hobby & Craft (Sewing, Painting, Musical Instruments)",
];

const CategorySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Category name is required." })
    .max(15, { message: "Category name must be 15 characters or less." }),
});

export type CategoryFormState =
  | {
      errors?: {
        name?: string[];
      };
    }
  | undefined;

export const getCategories = async () => {
  const { userId } = await verifySession();
  return await prisma.category.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });
};

export const createCategory = async (
  state: CategoryFormState | undefined,
  formData: FormData,
): Promise<CategoryFormState | undefined> => {
  const { userId } = await verifySession();

  const validationResult = CategorySchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  await prisma.category.create({
    data: { name: validationResult.data.name, userId },
  });

  return undefined;
};

export const createPresetCategories = async (userId: string) => {
  await prisma.category.createMany({
    data: presetCategories.map((name) => ({ name, userId })),
  });
};

export const updateCategory = async (
  id: string,
  name: string,
): Promise<CategoryFormState | undefined> => {
  const { userId } = await verifySession();

  const validationResult = CategorySchema.safeParse({ name });
  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  await prisma.category.update({
    where: { id, userId },
    data: { name: validationResult.data.name },
  });
};

export const deleteCategory = async (id: string) => {
  const { userId } = await verifySession();
  return await prisma.category.delete({
    where: { id, userId },
  });
};

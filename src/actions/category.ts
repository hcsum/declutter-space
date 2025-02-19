"use server";

import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// const presetCategories = [
//   "Wardrobe (Clothes, Shoes, Accessories)",
//   "Kitchen (Utensils, Appliances, Pantry Items)",
//   "Electronics (Gadgets, Cables, Old Devices)",
//   "Furniture (Chairs, Tables, Storage Units)",
//   "Books & Stationery (Books, Notebooks, Office Supplies)",
//   "Toys & Games (Kids' Toys, Board Games, Video Games)",
//   "Decor & Collectibles (Wall Art, Figurines, Seasonal Decor)",
//   "Personal Care (Cosmetics, Skincare, Grooming Items)",
//   "Garage & Tools (Hardware, DIY Tools, Car Accessories)",
//   "Sports & Fitness (Workout Equipment, Sports Gear)",
//   "Outdoor & Camping (Tents, Travel Gear, Gardening Tools)",
//   "Hobby & Craft (Sewing, Painting, Musical Instruments)",
// ];
const presetCategories = [
  "wardrobe",
  "kitchen",
  "sentimental",
  "electronics",
  "furniture",
  "books & stationery",
  "toys & games",
  "decor & collectibles",
  "personal care",
  "garage & tools",
  "sports & fitness",
  "outdoor & camping",
  "hobby & craft",
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
  return (
    await prisma.category.findMany({
      where: { userId },
      orderBy: { name: "asc" },
    })
  ).map((cat) => ({
    ...cat,
    name: cat.name.charAt(0).toUpperCase() + cat.name.slice(1),
  }));
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

  try {
    await prisma.category.create({
      data: { name: validationResult.data.name.toLocaleLowerCase(), userId },
    });
    revalidatePath("/dashboard");
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes(
        "Unique constraint failed on the fields: (`userId`,`name`)",
      )
    ) {
      return {
        errors: {
          name: ["This category already exists"],
        },
      };
    } else {
      console.log("error", error);
    }
  }
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

  try {
    await prisma.category.update({
      where: { id, userId },
      data: { name: validationResult.data.name.toLocaleLowerCase() },
    });
    revalidatePath("/dashboard");
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes(
        "Unique constraint failed on the fields: (`userId`,`name`)",
      )
    ) {
      return {
        errors: {
          name: ["This category already exists"],
        },
      };
    } else {
      console.log("error", error);
    }
  }
};

export const deleteCategory = async (id: string) => {
  const { userId } = await verifySession();
  const items = await prisma.item.findMany({
    where: { categoryId: id },
  });
  if (items.length > 0) {
    return {
      errors: {
        name: ["Category is used by items"],
      },
    };
  }
  await prisma.category.delete({
    where: { id, userId },
  });
  revalidatePath("/dashboard");
};

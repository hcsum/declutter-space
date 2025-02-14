"use server";

import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";

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

export const getCategories = async () => {
  const { userId } = await verifySession();
  return await prisma.category.findMany({
    where: { userId },
  });
};

export const createCategory = async (name: string) => {
  const { userId } = await verifySession();
  return await prisma.category.create({
    data: { name, userId },
  });
};

export const createPresetCategories = async (userId: string) => {
  await prisma.category.createMany({
    data: presetCategories.map((name) => ({ name, userId })),
  });
};

export const updateCategory = async (id: string, name: string) => {
  const { userId } = await verifySession();
  return await prisma.category.update({
    where: { id, userId },
    data: { name },
  });
};

export const deleteCategory = async (id: string) => {
  const { userId } = await verifySession();
  return await prisma.category.delete({
    where: { id, userId },
  });
};

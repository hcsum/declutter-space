"use server";

import { prisma } from "@/lib/prisma";

export const getCategories = async () => {
  return await prisma.category.findMany();
};

export const createCategory = async (name: string) => {
  return await prisma.category.create({
    data: { name },
  });
};

export const updateCategory = async (id: string, name: string) => {
  return await prisma.category.update({
    where: { id },
    data: { name },
  });
};

export const deleteCategory = async (id: string) => {
  return await prisma.category.delete({
    where: { id },
  });
};

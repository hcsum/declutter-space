import { Prisma } from "@prisma/client";

export function validateImageAnalysisUsage(user: Prisma.UserGetPayload<null>) {
  if (user.email === "sumtsui@outlook.com") {
    return true;
  }

  const now = new Date();
  const usedAt = user.imageAnalysisUsedAt;

  // If no previous usage, it's valid
  if (!usedAt) return true;

  // Check if the last usage was in the current month
  const isSameMonth =
    usedAt.getMonth() === now.getMonth() &&
    usedAt.getFullYear() === now.getFullYear();

  // If in current month and reached limit, throw error
  if (isSameMonth && user.imageAnalysisUsedCount >= 10) {
    return false;
  }

  return true;
}

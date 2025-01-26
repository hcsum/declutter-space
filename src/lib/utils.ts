import { Prisma } from "@prisma/client";

export function validateImageAnalysisUsage(user: Prisma.UserGetPayload<null>) {
  if (user.email === "sumtsui@outlook.com") {
    return true;
  }

  const now = new Date();
  const usedAt = user.imageAnalysisUsedAt;

  if (!usedAt) return true;

  const isSameMonth =
    usedAt.getMonth() === now.getMonth() &&
    usedAt.getFullYear() === now.getFullYear();

  if (isSameMonth && user.imageAnalysisUsedCount >= 10) {
    return false;
  }

  return true;
}

import { Prisma } from "@prisma/client";
import { MAX_IMAGE_ANALYSIS_COUNT_PER_MONTH } from "./definitions";

export function validateImageAnalysisUsage(user: Prisma.UserGetPayload<null>) {
  if (user.email === "sumtsui@outlook.com") {
    return;
  }

  const limit = MAX_IMAGE_ANALYSIS_COUNT_PER_MONTH;
  const now = new Date();
  const usedAt = user.imageAnalysisUsedAt;

  if (!usedAt) return true;

  const isSameMonth =
    usedAt.getMonth() === now.getMonth() &&
    usedAt.getFullYear() === now.getFullYear();

  if (isSameMonth && user.imageAnalysisUsedCount >= limit) {
    throw new Error(
      `Monthly image analysis limit reached (${limit} analyses per month)`,
    );
  }

  return;
}

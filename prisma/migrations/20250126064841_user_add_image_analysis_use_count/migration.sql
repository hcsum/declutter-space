-- AlterTable
ALTER TABLE "User" ADD COLUMN     "imageAnalysisUsedAt" TIMESTAMP(3),
ADD COLUMN     "imageAnalysisUsedCount" INTEGER NOT NULL DEFAULT 0;

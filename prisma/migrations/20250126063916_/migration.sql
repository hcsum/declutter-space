/*
  Warnings:

  - Added the required column `deadline` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pieces` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ItemPlan" AS ENUM ('GIVE_AWAY', 'DISCARD', 'SELL', 'KEEP', 'UNDECIDED');

-- CreateEnum
CREATE TYPE "ItemReminderType" AS ENUM ('FIRST', 'SECOND', 'THIRD');

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "pieces" INTEGER NOT NULL,
ADD COLUMN     "plan" "ItemPlan" NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "ItemReminder" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "type" "ItemReminderType" NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemReminder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemReminder" ADD CONSTRAINT "ItemReminder_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

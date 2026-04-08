-- CreateEnum
CREATE TYPE "ChecklistListSource" AS ENUM ('PRESET', 'IMPORTED');

-- CreateEnum
CREATE TYPE "ChecklistItemSource" AS ENUM ('PRESET', 'CUSTOM', 'IMPORTED');

-- CreateTable
CREATE TABLE "ChecklistList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "source" "ChecklistListSource" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChecklistList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChecklistItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    "itemKey" TEXT NOT NULL,
    "entryKey" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "source" "ChecklistItemSource" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "archivedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChecklistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChecklistCompletion" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "completedOn" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChecklistCompletion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChecklistPreference" (
    "userId" TEXT NOT NULL,
    "hasSeenMomentumDialog" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChecklistPreference_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE INDEX "ChecklistList_userId_isActive_idx" ON "ChecklistList"("userId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "ChecklistList_userId_key_key" ON "ChecklistList"("userId", "key");

-- CreateIndex
CREATE INDEX "ChecklistItem_userId_isActive_idx" ON "ChecklistItem"("userId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "ChecklistItem_userId_entryKey_key" ON "ChecklistItem"("userId", "entryKey");

-- CreateIndex
CREATE UNIQUE INDEX "ChecklistItem_listId_itemKey_key" ON "ChecklistItem"("listId", "itemKey");

-- CreateIndex
CREATE INDEX "ChecklistCompletion_userId_completedOn_idx" ON "ChecklistCompletion"("userId", "completedOn");

-- CreateIndex
CREATE UNIQUE INDEX "ChecklistCompletion_userId_itemId_completedOn_key" ON "ChecklistCompletion"("userId", "itemId", "completedOn");

-- AddForeignKey
ALTER TABLE "ChecklistList" ADD CONSTRAINT "ChecklistList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistItem" ADD CONSTRAINT "ChecklistItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistItem" ADD CONSTRAINT "ChecklistItem_listId_fkey" FOREIGN KEY ("listId") REFERENCES "ChecklistList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistCompletion" ADD CONSTRAINT "ChecklistCompletion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistCompletion" ADD CONSTRAINT "ChecklistCompletion_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "ChecklistItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistPreference" ADD CONSTRAINT "ChecklistPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

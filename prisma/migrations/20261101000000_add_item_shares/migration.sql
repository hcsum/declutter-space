CREATE TABLE "ItemShare" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "story" TEXT NOT NULL DEFAULT '',
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ItemShare_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ItemShare_token_key" ON "ItemShare"("token");
CREATE UNIQUE INDEX "ItemShare_itemId_key" ON "ItemShare"("itemId");
ALTER TABLE "ItemShare" ADD CONSTRAINT "ItemShare_itemId_fkey"
    FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

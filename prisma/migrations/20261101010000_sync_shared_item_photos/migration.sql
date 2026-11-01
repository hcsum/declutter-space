-- Preserve photos previously uploaded only through the sharing dialog.
UPDATE "Item" AS item
SET "image" = share."image", "updatedAt" = CURRENT_TIMESTAMP
FROM "ItemShare" AS share
WHERE share."itemId" = item."id"
  AND (item."image" IS NULL OR item."image" = '')
  AND share."image" IS NOT NULL
  AND share."image" <> '';

-- Snapshot existing item photos so later uploads do not silently change a
-- published card before its owner saves the sharing changes.
UPDATE "ItemShare" AS share
SET "image" = item."image", "updatedAt" = CURRENT_TIMESTAMP
FROM "Item" AS item
WHERE share."itemId" = item."id"
  AND share."image" IS NULL
  AND item."image" IS NOT NULL;

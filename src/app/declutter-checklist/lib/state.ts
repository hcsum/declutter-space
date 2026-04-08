import {
  ArchivedItemsByEntryKey,
  CustomItem,
  CustomItemsByCategory,
  HistoryByDate,
  ImportedList,
  RemovedItemsByCategory,
  sanitizeImportedLists,
} from "./checklist";

export type ChecklistState = {
  customItemsByCategory: CustomItemsByCategory;
  archivedItemsByEntryKey: ArchivedItemsByEntryKey;
  removedItemsByCategory: RemovedItemsByCategory;
  historyByDate: HistoryByDate;
  importedLists: ImportedList[];
  hasSeenMomentumDialog: boolean;
};

export const emptyChecklistState: ChecklistState = {
  customItemsByCategory: {},
  archivedItemsByEntryKey: {},
  removedItemsByCategory: {},
  historyByDate: {},
  importedLists: [],
  hasSeenMomentumDialog: false,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeCustomItem(value: unknown): CustomItem | null {
  if (!isRecord(value)) return null;
  const id = typeof value.id === "string" ? value.id.trim() : "";
  const text = typeof value.text === "string" ? value.text.trim() : "";
  if (!id || !text) return null;
  return { id, text };
}

function normalizeCustomItemsByCategory(value: unknown): CustomItemsByCategory {
  if (!isRecord(value)) return {};

  return Object.fromEntries(
    Object.entries(value)
      .map(([categoryKey, items]) => {
        if (!Array.isArray(items)) return null;
        const normalizedItems = items
          .map(normalizeCustomItem)
          .filter((item): item is CustomItem => Boolean(item));
        if (!categoryKey || normalizedItems.length === 0) return null;
        return [categoryKey, normalizedItems];
      })
      .filter(
        (entry): entry is [string, CustomItem[]] =>
          Array.isArray(entry) && entry.length === 2,
      ),
  );
}

function normalizeRemovedItemsByCategory(
  value: unknown,
): RemovedItemsByCategory {
  if (!isRecord(value)) return {};

  return Object.fromEntries(
    Object.entries(value)
      .map(([categoryKey, itemIds]) => {
        if (!Array.isArray(itemIds)) return null;
        const normalizedItemIds = Array.from(
          new Set(
            itemIds
              .filter((itemId): itemId is string => typeof itemId === "string")
              .map((itemId) => itemId.trim())
              .filter(Boolean),
          ),
        );
        if (!categoryKey || normalizedItemIds.length === 0) return null;
        return [categoryKey, normalizedItemIds];
      })
      .filter(
        (entry): entry is [string, string[]] =>
          Array.isArray(entry) && entry.length === 2,
      ),
  );
}

function normalizeArchivedItemsByEntryKey(
  value: unknown,
): ArchivedItemsByEntryKey {
  if (!isRecord(value)) return {};

  return Object.fromEntries(
    Object.entries(value)
      .map(([entryKey, details]) => {
        if (!isRecord(details)) return null;
        const category =
          typeof details.category === "string" ? details.category.trim() : "";
        const text =
          typeof details.text === "string" ? details.text.trim() : "";
        if (!entryKey || !category || !text) return null;
        return [entryKey, { category, text }];
      })
      .filter(
        (entry): entry is [string, { category: string; text: string }] =>
          Array.isArray(entry) && entry.length === 2,
      ),
  );
}

function normalizeHistoryByDate(value: unknown): HistoryByDate {
  if (!isRecord(value)) return {};

  return Object.fromEntries(
    Object.entries(value)
      .map(([dateKey, entryKeys]) => {
        if (!Array.isArray(entryKeys)) return null;
        const normalizedEntryKeys = Array.from(
          new Set(
            entryKeys
              .filter(
                (entryKey): entryKey is string => typeof entryKey === "string",
              )
              .map((entryKey) => entryKey.trim())
              .filter(Boolean),
          ),
        );
        if (!dateKey || normalizedEntryKeys.length === 0) return null;
        return [dateKey, normalizedEntryKeys];
      })
      .filter(
        (entry): entry is [string, string[]] =>
          Array.isArray(entry) && entry.length === 2,
      ),
  );
}

export function normalizeChecklistState(value: unknown): ChecklistState {
  if (!isRecord(value)) return emptyChecklistState;

  return {
    customItemsByCategory: normalizeCustomItemsByCategory(
      value.customItemsByCategory,
    ),
    archivedItemsByEntryKey: normalizeArchivedItemsByEntryKey(
      value.archivedItemsByEntryKey,
    ),
    removedItemsByCategory: normalizeRemovedItemsByCategory(
      value.removedItemsByCategory,
    ),
    historyByDate: normalizeHistoryByDate(value.historyByDate),
    importedLists: sanitizeImportedLists(
      Array.isArray(value.importedLists)
        ? (value.importedLists as ImportedList[])
        : [],
    ),
    hasSeenMomentumDialog: value.hasSeenMomentumDialog === true,
  };
}

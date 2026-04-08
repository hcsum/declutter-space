import data from "@/const/declutter-checklist.json";

export type DeclutterCategory = { category: string; items: string[] };
export type CustomItem = { id: string; text: string };
export type CustomItemsByCategory = Record<string, CustomItem[]>;
export type RemovedItemsByCategory = Record<string, string[]>;
export type ArchivedItemsByEntryKey = Record<
  string,
  { category: string; text: string }
>;
export type HistoryByDate = Record<string, string[]>;
export type ImportedList = {
  id: string;
  title: string;
  items: CustomItem[];
};
export type ChecklistCategory = DeclutterCategory & {
  key: string;
  defaultItems: CustomItem[];
  source: "built-in" | "imported";
};

const checklist = data as DeclutterCategory[];

export const CUSTOM_ITEMS_STORAGE_KEY = "declutter-checklist-custom-items";
export const REMOVED_ITEMS_STORAGE_KEY = "declutter-checklist-removed-items";
export const ARCHIVED_ITEMS_STORAGE_KEY = "declutter-checklist-archived-items";
export const HISTORY_STORAGE_KEY = "declutter-checklist-history";
export const MOMENTUM_DIALOG_STORAGE_KEY =
  "declutter-checklist-momentum-dialog-seen";
export const IMPORTED_LISTS_STORAGE_KEY = "declutter-checklist-imported-lists";

export const monthDayFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

export const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function buildEntryKey(categoryKey: string, itemId: string) {
  return `${categoryKey}::${itemId}`;
}

export function buildCategoryKey(category: string, index: number) {
  return `${slugify(category)}-${index}`;
}

export function getChecklistCategories() {
  return checklist.map((category, index) => ({
    ...category,
    key: buildCategoryKey(category.category, index),
    defaultItems: category.items.map((text, itemIndex) => ({
      id: `default-${itemIndex}`,
      text,
    })),
    source: "built-in" as const,
  }));
}

export function buildImportedListId(title: string) {
  return `imported-${slugify(title)}`;
}

export function buildImportedItemId(text: string) {
  return `imported-item-${slugify(text)}`;
}

export function sanitizeImportedLists(importedLists: ImportedList[]) {
  const seenListIds = new Set<string>();

  return importedLists
    .map((list) => {
      const title = list.title.trim();
      if (!title) return null;

      const listId = buildImportedListId(title);
      if (seenListIds.has(listId)) return null;
      seenListIds.add(listId);

      const seenItemIds = new Set<string>();
      const items = list.items
        .map((item) => item.text.trim())
        .filter(Boolean)
        .map((text) => ({ id: buildImportedItemId(text), text }))
        .filter((item) => {
          if (seenItemIds.has(item.id)) return false;
          seenItemIds.add(item.id);
          return true;
        })
        .sort((left, right) => left.text.localeCompare(right.text));

      if (items.length === 0) return null;

      return {
        id: listId,
        title,
        items,
      } satisfies ImportedList;
    })
    .filter((list): list is ImportedList => Boolean(list));
}

export function getImportedCategories(importedLists: ImportedList[]) {
  return sanitizeImportedLists(importedLists).map((list) => ({
    category: list.title,
    items: list.items.map((item) => item.text),
    key: list.id,
    defaultItems: list.items,
    source: "imported" as const,
  }));
}

export function getAllChecklistCategories(importedLists: ImportedList[] = []) {
  if (importedLists.length > 0) return getImportedCategories(importedLists);
  return getChecklistCategories();
}

export function getTimelineDates(startDate: Date, endDate: Date) {
  const dates: Date[] = [];
  const cursor = new Date(startDate);
  cursor.setHours(0, 0, 0, 0);

  const last = new Date(endDate);
  last.setHours(0, 0, 0, 0);

  while (cursor <= last) {
    dates.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

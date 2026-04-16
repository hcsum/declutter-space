import data from "@/const/declutter-checklist.json";
import zhData from "@/const/declutter-checklist.zh.json";
import { defaultLocale, type Locale } from "@/i18n/config";

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
const localizedChecklists: Record<Locale, DeclutterCategory[]> = {
  en: checklist,
  zh: zhData as DeclutterCategory[],
};

export const CUSTOM_ITEMS_STORAGE_KEY = "declutter-checklist-custom-items";
export const REMOVED_ITEMS_STORAGE_KEY = "declutter-checklist-removed-items";
export const ARCHIVED_ITEMS_STORAGE_KEY = "declutter-checklist-archived-items";
export const HISTORY_STORAGE_KEY = "declutter-checklist-history";
export const MOMENTUM_DIALOG_STORAGE_KEY =
  "declutter-checklist-momentum-dialog-seen";
export const IMPORTED_LISTS_STORAGE_KEY = "declutter-checklist-imported-lists";

export function getChecklistDateFormatters(locale: Locale) {
  return {
    monthDayFormatter: new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
    }),
    longDateFormatter: new Intl.DateTimeFormat(locale, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  };
}

export function slugify(value: string) {
  return Array.from(value.toLowerCase())
    .map((char) =>
      /^[a-z0-9]$/.test(char) || /^[\u4e00-\u9fff]$/.test(char) ? char : "-",
    )
    .join("")
    .replace(/-+/g, "-")
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

export function getChecklistCategories(locale: Locale = defaultLocale) {
  const localizedChecklist = localizedChecklists[locale] ?? checklist;

  return checklist.map((baseCategory, index) => {
    const localizedCategory = localizedChecklist[index] ?? baseCategory;

    return {
      ...localizedCategory,
      key: buildCategoryKey(baseCategory.category, index),
      defaultItems: baseCategory.items.map((baseText, itemIndex) => ({
        id: `default-${itemIndex}`,
        text: localizedCategory.items[itemIndex] ?? baseText,
      })),
      source: "built-in" as const,
    };
  });
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

export function getLocalizedChecklistCategories(
  locale: Locale,
  importedLists: ImportedList[] = [],
) {
  if (importedLists.length > 0) return getImportedCategories(importedLists);
  return getChecklistCategories(locale);
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

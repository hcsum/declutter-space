import type { Locale } from "@/i18n/config";
import { getChecklistCategoryBySlug } from "./checklist";
import config from "./printables.json";

export const printableAreas = config.areas;
export const printableCopy = config.copy;
const titleOverrides: Partial<Record<Locale, Record<string, string>>> =
  config.titleOverrides;

export function getChecklistPrintable(slug: string, locale: Locale) {
  if (!printableAreas.some((area) => area.slug === slug)) return null;
  const category = getChecklistCategoryBySlug(slug, locale);
  if (!category) return null;
  const copy = printableCopy[locale];
  const itemCount = category.defaultItems.length;
  const pageCount = Math.ceil(itemCount / config.itemsPerPage);
  const base = `/checklists/${locale}/${slug}-declutter-checklist`;

  return {
    slug,
    title:
      titleOverrides[locale]?.[slug] ??
      copy.title.replace("{area}", category.category),
    pdf: `${base}.pdf`,
    preview: `${base}.webp`,
    previewAlt: copy.previewAlt.replace("{area}", category.category),
    itemCount,
    pageCount,
    specs: copy.specs
      .replace("{items}", String(itemCount))
      .replace("{pages}", String(pageCount))
      .replace("{pageUnit}", copy.pageUnit[pageCount === 1 ? 0 : 1])
      .replace("{language}", copy.language),
  };
}

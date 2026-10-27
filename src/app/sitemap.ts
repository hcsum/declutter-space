import type { MetadataRoute } from "next";
import { type Locale } from "@/i18n/config";
import { siteUrl } from "@/lib/site";
import { getChecklistCategorySlugs } from "@/lib/checklist/checklist";
import {
  DE_ONLY_PATHS,
  ES_ONLY_PATHS,
  JA_ONLY_PATHS,
  NON_SPANISH_PATHS,
  defaultLocaleForPath,
  localesForPath,
} from "@/i18n/page-locales";
import {
  getChecklistPrintable,
  printableAreas,
} from "@/lib/checklist/printables";

// Only declare dates for substantive edits whose date is known. An omitted
// lastmod is more accurate than changing every URL on each deployment.
const contentUpdated: Record<string, string> = {
  "/en/how-to-declutter-sentimental-items": "2026-10-16",
  "/zh/how-to-declutter-sentimental-items": "2026-10-16",
  "/ja/how-to-declutter-sentimental-items": "2026-10-16",
  "/en/how-to-declutter-old-cards-and-letters": "2026-10-16",
  "/es/rutina-de-limpieza-del-hogar": "2026-10-16",
  "/es/plan-de-limpieza-semanal": "2026-10-16",
  "/en/how-to-declutter-your-kitchen": "2026-10-17",
  "/en/how-to-declutter-your-bathroom": "2026-10-17",
  "/zh/how-to-declutter-your-kitchen": "2026-10-17",
  "/ja/how-to-declutter-your-kitchen": "2026-10-17",
  "/zh/how-to-declutter-your-bathroom": "2026-10-17",
  "/ja/how-to-declutter-your-bathroom": "2026-10-17",
};

const checklistAreaPaths = getChecklistCategorySlugs().map(
  (slug) => `/declutter-checklist/${slug}`,
);

/** Paths that exist in every locale, Spanish included. */
const allLocalePaths = ["", "/declutter-checklist", ...checklistAreaPaths];

function localizedUrl(locale: string, path: string) {
  return `${siteUrl}/${locale}${path}`;
}

function priorityFor(path: string) {
  if (path === "") return 1;
  if (checklistAreaPaths.includes(path)) return 0.6;
  return 0.8;
}

function entriesFor(path: string): MetadataRoute.Sitemap {
  const pathLocales = localesForPath(path);
  const languages: Record<string, string> = Object.fromEntries(
    pathLocales.map((alt) => [alt, localizedUrl(alt, path)]),
  );
  const xDefault = defaultLocaleForPath(path);
  languages["x-default"] = localizedUrl(xDefault, path);

  return pathLocales.map((locale) => ({
    url: localizedUrl(locale, path),
    ...(locale === "de"
      ? { lastModified: "2026-10-27" }
      : path === "/declutter-checklist" ||
          printableAreas.some(
            (area) => path === `/declutter-checklist/${area.slug}`,
          )
        ? { lastModified: "2026-10-20" }
        : contentUpdated[`/${locale}${path}`]
          ? { lastModified: contentUpdated[`/${locale}${path}`] }
          : {}),
    ...(path === "/declutter-checklist" || checklistAreaPaths.includes(path)
      ? { images: imagesForPath(path, locale) }
      : {}),
    changeFrequency: "weekly" as const,
    priority: priorityFor(path),
    alternates: { languages },
  }));
}

function imagesForPath(path: string, locale: Locale) {
  return printableAreas
    .filter(
      (area) =>
        path === "/declutter-checklist" ||
        path === `/declutter-checklist/${area.slug}`,
    )
    .flatMap(({ slug }) => {
      const resource = getChecklistPrintable(slug, locale);
      return resource ? [`${siteUrl}${resource.preview}`] : [];
    });
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...allLocalePaths.flatMap(entriesFor),
    ...NON_SPANISH_PATHS.flatMap(entriesFor),
    ...DE_ONLY_PATHS.flatMap(entriesFor),
    ...ES_ONLY_PATHS.flatMap(entriesFor),
    ...JA_ONLY_PATHS.flatMap(entriesFor),
    ...entriesFor("/how-to-declutter-old-cards-and-letters"),
  ];
}

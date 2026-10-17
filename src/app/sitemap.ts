import type { MetadataRoute } from "next";
import { locales, defaultLocale, type Locale } from "@/i18n/config";
import { siteUrl } from "@/lib/site";
import { getChecklistCategorySlugs } from "@/lib/checklist/checklist";
import { ES_ONLY_PATHS, JA_ONLY_PATHS } from "@/lib/seo";

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

/**
 * English-slug pages with no Spanish copy yet. They ship for en / zh / ja only,
 * so the Spanish rollout doesn't publish machine-thin duplicates.
 */
const nonSpanishPaths = [
  "/decluttering-decision-guide",
  "/should-i-buy-it",
  "/cost-per-wear-calculator",
  "/things-to-declutter",
  "/things-to-stop-buying",
  "/how-to-declutter-sentimental-items",
  "/how-to-declutter-unwanted-gifts",
  "/decluttering-after-a-death",
  "/swedish-death-cleaning",
  "/decluttering-before-a-move",
  "/adhd-cleaning-checklist",
  "/how-to-declutter-your-bedroom",
  "/how-to-declutter-your-living-room",
  "/how-to-declutter-your-kitchen",
  "/how-to-declutter-your-bathroom",
  "/how-to-declutter-your-home-office",
  "/how-to-declutter-your-closet",
];

const nonSpanishLocales = locales.filter((locale) => locale !== "es");

function localizedUrl(locale: string, path: string) {
  return `${siteUrl}/${locale}${path}`;
}

function priorityFor(path: string) {
  if (path === "") return 1;
  if (checklistAreaPaths.includes(path)) return 0.6;
  return 0.8;
}

function entriesFor(
  path: string,
  pathLocales: readonly Locale[],
): MetadataRoute.Sitemap {
  const languages: Record<string, string> = Object.fromEntries(
    pathLocales.map((alt) => [alt, localizedUrl(alt, path)]),
  );
  const xDefault = pathLocales.includes(defaultLocale)
    ? defaultLocale
    : pathLocales[0];
  languages["x-default"] = localizedUrl(xDefault, path);

  return pathLocales.map((locale) => ({
    url: localizedUrl(locale, path),
    ...(contentUpdated[`/${locale}${path}`]
      ? { lastModified: contentUpdated[`/${locale}${path}`] }
      : {}),
    changeFrequency: "weekly" as const,
    priority: priorityFor(path),
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...allLocalePaths.flatMap((path) =>
      entriesFor(path, locales),
    ),
    ...nonSpanishPaths.flatMap((path) =>
      entriesFor(path, nonSpanishLocales),
    ),
    ...ES_ONLY_PATHS.flatMap((path) => entriesFor(path, ["es"])),
    ...JA_ONLY_PATHS.flatMap((path) => entriesFor(path, ["ja"])),
    ...entriesFor(
      "/how-to-declutter-old-cards-and-letters",
      ["en"],
    ),
  ];
}

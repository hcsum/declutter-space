import type { MetadataRoute } from "next";
import { locales, defaultLocale, type Locale } from "@/i18n/config";
import { siteUrl } from "@/lib/site";
import { getChecklistCategorySlugs } from "@/lib/checklist/checklist";
import { ES_ONLY_PATHS } from "@/lib/seo";

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
  lastModified: Date,
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
    lastModified,
    changeFrequency: "weekly" as const,
    priority: priorityFor(path),
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...allLocalePaths.flatMap((path) => entriesFor(path, locales, lastModified)),
    ...nonSpanishPaths.flatMap((path) =>
      entriesFor(path, nonSpanishLocales, lastModified),
    ),
    ...ES_ONLY_PATHS.flatMap((path) =>
      entriesFor(path, ["es"], lastModified),
    ),
  ];
}

import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n/config";
import { siteUrl } from "@/lib/site";

const sitemapPaths = [
  "",
  "/declutter-checklist",
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

function localizedUrl(locale: string, path: string) {
  return `${siteUrl}/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return sitemapPaths.flatMap((path) =>
    locales.map((locale) => {
      const languages: Record<string, string> = Object.fromEntries(
        locales.map((alt) => [alt, localizedUrl(alt, path)]),
      );
      languages["x-default"] = localizedUrl(defaultLocale, path);

      return {
        url: localizedUrl(locale, path),
        lastModified,
        changeFrequency: "weekly" as const,
        priority: path === "" ? 1 : 0.8,
        alternates: { languages },
      };
    }),
  );
}

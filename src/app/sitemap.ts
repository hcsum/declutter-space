import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

const siteUrl = "https://declutterspace.net";
const sitemapPaths = ["", "/declutter-checklist"];

function localizedUrl(locale: string, path: string) {
  return `${siteUrl}/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return sitemapPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: localizedUrl(locale, path),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alternateLocale) => [
            alternateLocale,
            localizedUrl(alternateLocale, path),
          ]),
        ),
      },
    })),
  );
}

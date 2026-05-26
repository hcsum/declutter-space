import type { Metadata } from "next";
import { locales, defaultLocale, type Locale } from "@/i18n/config";

/**
 * Build canonical + hreflang alternates for a localized page.
 * - canonical: `/{locale}{path}`
 * - languages: each locale + `x-default` pointing to defaultLocale
 *
 * `path` should start with `/` and NOT include the locale prefix
 * (e.g. "/declutter-checklist", or "" for the locale root).
 */
export function buildLanguageAlternates(
  locale: Locale,
  path: string = "",
): NonNullable<Metadata["alternates"]> {
  const normalizedPath = path === "/" ? "" : path;
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((alt) => [alt, `/${alt}${normalizedPath}`]),
  );
  languages["x-default"] = `/${defaultLocale}${normalizedPath}`;

  return {
    canonical: `/${locale}${normalizedPath}`,
    languages,
  };
}

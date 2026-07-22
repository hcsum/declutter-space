import type { Metadata } from "next";
import { locales, defaultLocale, type Locale } from "@/i18n/config";
import { siteUrl } from "@/lib/site";

/**
 * Shared paths (English slugs) that also have real Spanish copy.
 *
 * The Spanish rollout is keyword-led rather than a full translation of the
 * English site, so most English-slug guides have no `es` version. Only the
 * paths listed here — plus `/declutter-checklist/*` area pages, which are
 * driven by translated data — may advertise an `es` hreflang.
 */
const ES_READY_SHARED_PATHS = new Set(["", "/declutter-checklist"]);

/**
 * Spanish-only pages built around Spanish keywords. They exist at `/es/...`
 * and nowhere else, so they self-canonicalize with no hreflang siblings.
 */
export const ES_ONLY_PATHS = [
  "/rutina-de-limpieza-del-hogar",
  "/como-ordenar-armarios",
  "/como-ordenar-la-cocina",
  "/como-ordenar-la-habitacion",
] as const;

const esOnlyPathSet: ReadonlySet<string> = new Set(ES_ONLY_PATHS);

export function isEsOnlyPath(path: string) {
  return esOnlyPathSet.has(path);
}

/**
 * Japanese-only pages built around Japanese keywords. Same rationale as the
 * Spanish rollout: keyword-led native pages that exist at `/ja/...` and nowhere
 * else, so they self-canonicalize with no hreflang siblings.
 */
export const JA_ONLY_PATHS = [
  "/katazukerarenai",
  "/danshari-yarikata",
] as const;

const jaOnlyPathSet: ReadonlySet<string> = new Set(JA_ONLY_PATHS);

export function isJaOnlyPath(path: string) {
  return jaOnlyPathSet.has(path);
}

function localesForPath(path: string): readonly Locale[] {
  if (isEsOnlyPath(path)) return ["es"];
  if (isJaOnlyPath(path)) return ["ja"];

  const esReady =
    ES_READY_SHARED_PATHS.has(path) || path.startsWith("/declutter-checklist/");

  return esReady ? locales : locales.filter((locale) => locale !== "es");
}

/**
 * Build canonical + hreflang alternates for a localized page.
 * - canonical: `/{locale}{path}`
 * - languages: each locale that actually has this page, + `x-default`
 *
 * `path` should start with `/` and NOT include the locale prefix
 * (e.g. "/declutter-checklist", or "" for the locale root).
 */
export function buildLanguageAlternates(
  locale: Locale,
  path: string = "",
): NonNullable<Metadata["alternates"]> {
  const normalizedPath = path === "/" ? "" : path;
  const available = localesForPath(normalizedPath);

  const languages: Record<string, string> = Object.fromEntries(
    available.map((alt) => [alt, `/${alt}${normalizedPath}`]),
  );

  const xDefault = available.includes(defaultLocale)
    ? defaultLocale
    : available[0];
  languages["x-default"] = `/${xDefault}${normalizedPath}`;

  return {
    canonical: `/${locale}${normalizedPath}`,
    languages,
  };
}

export function buildFaqPageSchema(
  faqs: readonly { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * `path` should start with `/` and NOT include the locale prefix, matching
 * `buildLanguageAlternates`. Pass `[]` for the site root crumb.
 */
export function buildBreadcrumbSchema(
  locale: Locale,
  crumbs: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}/${locale}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };
}

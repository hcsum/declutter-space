import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { type Locale } from "@/i18n/config";
import { defaultLocaleForPath, localesForPath } from "@/i18n/page-locales";
import { siteUrl } from "@/lib/site";

export {
  ES_ONLY_PATHS,
  JA_ONLY_PATHS,
  isEsOnlyPath,
  isJaOnlyPath,
} from "@/i18n/page-locales";

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
  // Reject untranslated routes as well as omitting them from hreflang/sitemap.
  // This runs during metadata generation, before a static page is published.
  if (!available.includes(locale)) notFound();

  const languages: Record<string, string> = Object.fromEntries(
    available.map((alt) => [alt, `/${alt}${normalizedPath}`]),
  );

  const xDefault = defaultLocaleForPath(normalizedPath);
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

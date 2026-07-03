import type { Metadata } from "next";
import { locales, defaultLocale, type Locale } from "@/i18n/config";
import { siteUrl } from "@/lib/site";

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

import ClientPage from "./ClientPage";
import { Suspense } from "react";
import type { Metadata } from "next";
import getDictionary from "@/i18n/getDictionary";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import { buildBreadcrumbSchema, buildFaqPageSchema, buildLanguageAlternates } from "@/lib/seo";
import { checklistSeoContent } from "@/lib/checklist/seo-content";
import { JsonLd } from "@/components/json-ld";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(locale);

  return {
    title: dict.checklist.metaTitle,
    description: dict.checklist.metaDescription,
    keywords: [
      "declutter checklist",
      "decluttering checklist",
      "room by room declutter checklist",
      "home declutter checklist",
      "free declutter checklist",
      "declutter checklist pdf",
      "printable declutter checklist",
    ],
    alternates: buildLanguageAlternates(locale, "/declutter-checklist"),
  };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(locale);
  const seoContent =
    checklistSeoContent[locale as keyof typeof checklistSeoContent] ??
    checklistSeoContent.en;
  const homeLabel = locale === "ja" ? "ホーム" : "Home";

  return (
    <>
      <JsonLd data={buildFaqPageSchema(seoContent.faqs)} />
      <JsonLd
        data={buildBreadcrumbSchema(locale, [
          { name: homeLabel, path: "/" },
          { name: dict.checklist.headerLabel, path: "/declutter-checklist" },
        ])}
      />
      <Suspense fallback={null}>
        <ClientPage />
      </Suspense>
    </>
  );
}

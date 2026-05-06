import ClientPage from "./ClientPage";
import { Suspense } from "react";
import type { Metadata } from "next";
import getDictionary from "@/i18n/getDictionary";
import { defaultLocale, isValidLocale, locales } from "@/i18n/config";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(locale);

  return {
    title: dict.checklist.metaTitle,
    description: dict.checklist.metaDescription,
    alternates: {
      canonical: `/${locale}/declutter-checklist`,
      languages: Object.fromEntries(
        locales.map((alternateLocale) => [
          alternateLocale,
          `/${alternateLocale}/declutter-checklist`,
        ]),
      ),
    },
  };
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ClientPage />
    </Suspense>
  );
}

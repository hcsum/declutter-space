import { Suspense } from "react";
import ClientPage from "./ClientPage";
import type { Metadata } from "next";
import getDictionary from "@/i18n/getDictionary";
import { defaultLocale, isValidLocale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(isValidLocale(lang) ? lang : defaultLocale);
  return {
    title: `${dict.checklist.navProgress} | DeclutterYourHome`,
    robots: { index: false, follow: true },
    alternates: { canonical: null },
  };
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ClientPage />
    </Suspense>
  );
}

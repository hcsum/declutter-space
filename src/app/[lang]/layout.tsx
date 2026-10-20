import { GoogleAnalytics } from "@next/third-parties/google";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isValidLocale, locales } from "@/i18n/config";
import {
  materialSymbolsStylesheet,
  siteBodyClassName,
  siteMetadata,
  SiteShell,
} from "../shared-layout";

export const metadata = siteMetadata;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const locale = lang;

  return (
    <html lang={locale}>
      <head>
        <link href={materialSymbolsStylesheet} rel="stylesheet" />
      </head>
      <body className={siteBodyClassName}>
        <SiteShell>{children}</SiteShell>
      </body>
      <GoogleAnalytics gaId="G-LT4QGDFCR2" />
    </html>
  );
}

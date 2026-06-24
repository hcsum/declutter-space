import { GoogleAnalytics } from "@next/third-parties/google";
import type { ReactNode } from "react";
import { defaultLocale, isValidLocale, locales } from "@/i18n/config";
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
  const locale = isValidLocale(lang) ? lang : defaultLocale;

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

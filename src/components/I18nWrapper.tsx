"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { I18nProvider } from "@/i18n/i18n-provider";
import { Locale, defaultLocale, isValidLocale } from "@/i18n/config";

export default function I18nWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const maybeLocale = segments[1];
  const locale: Locale = isValidLocale(maybeLocale)
    ? maybeLocale
    : defaultLocale;

  return <I18nProvider locale={locale}>{children}</I18nProvider>;
}

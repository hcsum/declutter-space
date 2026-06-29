"use client";

import React, { createContext, useContext, useMemo } from "react";
import type { Locale } from "./config";
import { defaultLocale } from "./config";
import type { Dictionary } from "./getDictionary";
import en from "./en.json";
import ja from "./ja.json";
import zh from "./zh.json";

const dicts: Record<Locale, unknown> = { en, zh, ja };

interface I18nContextValue {
  locale: Locale;
  dict: Dictionary;
  t: (key: string) => string;
  localePath: (path: string) => string;
}

const I18nContext = createContext<I18nContextValue>({
  locale: defaultLocale,
  dict: en,
  t: (k) => k,
  localePath: (p) => p,
});

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (
      current &&
      typeof current === "object" &&
      key in (current as Record<string, unknown>)
    ) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof current === "string" ? current : path;
}

function mergeDictionary(base: unknown, override: unknown): unknown {
  if (Array.isArray(base)) return Array.isArray(override) ? override : base;
  if (
    base &&
    typeof base === "object" &&
    override &&
    typeof override === "object" &&
    !Array.isArray(override)
  ) {
    const result: Record<string, unknown> = {
      ...(base as Record<string, unknown>),
    };

    for (const [key, value] of Object.entries(override as Record<string, unknown>)) {
      result[key] = mergeDictionary(result[key], value);
    }

    return result;
  }

  return override ?? base;
}

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const dict = mergeDictionary(en, dicts[locale] ?? en) as Dictionary;

  const value = useMemo<I18nContextValue>(() => {
    function t(key: string): string {
      return getNestedValue(dict as unknown as Record<string, unknown>, key);
    }
    function localePath(path: string): string {
      if (path.startsWith("/")) {
        return `/${locale}${path === "/" ? "" : path}`;
      }
      return path;
    }
    return { locale, dict, t, localePath };
  }, [locale, dict]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  return useContext(I18nContext);
}

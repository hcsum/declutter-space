import type { Locale } from "./config";
import en from "./en.json";
import zh from "./zh.json";

const dictionaries: Record<Locale, typeof en> = { en, zh };

export type Dictionary = typeof en;

export default function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}

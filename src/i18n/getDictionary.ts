import type { Locale } from "./config";
import en from "./en.json";
import es from "./es.json";
import ja from "./ja.json";
import zh from "./zh.json";

const dictionaries: Record<Locale, unknown> = { en, zh, ja, es };

export type Dictionary = typeof en;

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

export default function getDictionary(locale: Locale): Dictionary {
  return mergeDictionary(en, dictionaries[locale] ?? en) as Dictionary;
}

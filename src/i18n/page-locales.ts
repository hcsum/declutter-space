import { defaultLocale, locales, type Locale } from "./config";

export const ES_ONLY_PATHS = [
  "/rutina-de-limpieza-del-hogar",
  "/plan-de-limpieza-semanal",
  "/como-ordenar-armarios",
  "/como-ordenar-la-cocina",
  "/como-ordenar-la-habitacion",
] as const;

export const JA_ONLY_PATHS = [
  "/katazukerarenai",
  "/danshari-yarikata",
] as const;

export const NON_SPANISH_PATHS = [
  "/decluttering-decision-guide",
  "/should-i-buy-it",
  "/cost-per-wear-calculator",
  "/things-to-declutter",
  "/things-to-stop-buying",
  "/how-to-declutter-sentimental-items",
  "/how-to-declutter-unwanted-gifts",
  "/decluttering-after-a-death",
  "/swedish-death-cleaning",
  "/decluttering-before-a-move",
  "/adhd-cleaning-checklist",
  "/how-to-declutter-your-bedroom",
  "/how-to-declutter-your-living-room",
  "/how-to-declutter-your-kitchen",
  "/how-to-declutter-your-bathroom",
  "/how-to-declutter-your-home-office",
  "/how-to-declutter-your-closet",
] as const;

export function isEsOnlyPath(path: string) {
  return (ES_ONLY_PATHS as readonly string[]).includes(path);
}

export function isJaOnlyPath(path: string) {
  return (JA_ONLY_PATHS as readonly string[]).includes(path);
}

/** Shared by route metadata, language navigation and sitemap generation. */
export function localesForPath(path: string): readonly Locale[] {
  if (path === "/how-to-declutter-old-cards-and-letters") return ["en"];
  if (isEsOnlyPath(path)) return ["es"];
  if (isJaOnlyPath(path)) return ["ja"];
  if ((NON_SPANISH_PATHS as readonly string[]).includes(path)) {
    return locales.filter((locale) => locale !== "es");
  }
  return locales;
}

export function isPageAvailable(locale: Locale, path: string) {
  return localesForPath(path === "/" ? "" : path).includes(locale);
}

export function defaultLocaleForPath(path: string) {
  const available = localesForPath(path);
  return available.includes(defaultLocale) ? defaultLocale : available[0];
}

import { isValidLocale, type Locale } from "./config";

export function getLocalizedPathname(pathname: string, locale: Locale): string {
  const [pathOnly, hash = ""] = pathname.split("#");
  const segments = pathOnly.split("/");
  const pagePath = isValidLocale(segments[1])
    ? `/${segments.slice(2).join("/")}`
    : pathOnly;
  if (
    locale === "es" &&
    [
      "/how-to-declutter-sentimental-items",
      "/how-to-declutter-your-kitchen",
      "/how-to-declutter-your-bathroom",
    ].includes(pagePath)
  ) {
    return "/es";
  }
  const singleLocalePages: Record<string, Locale> = {
    "/how-to-declutter-old-cards-and-letters": "en",
    "/plan-de-limpieza-semanal": "es",
  };
  if (singleLocalePages[pagePath] && singleLocalePages[pagePath] !== locale) {
    return `/${locale}`;
  }

  let localizedPath: string;

  if (isValidLocale(segments[1])) {
    segments[1] = locale;
    localizedPath = segments.join("/");
  } else {
    localizedPath = `/${locale}${pathOnly === "/" ? "" : pathOnly}`;
  }

  return hash ? `${localizedPath}#${hash}` : localizedPath;
}

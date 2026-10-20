import { isValidLocale, type Locale } from "./config";
import { isPageAvailable } from "./page-locales";

export function getLocalizedPathname(pathname: string, locale: Locale): string {
  const [pathOnly, hash = ""] = pathname.split("#");
  const segments = pathOnly.split("/");
  const pagePath = isValidLocale(segments[1])
    ? `/${segments.slice(2).join("/")}`
    : pathOnly;
  if (!isPageAvailable(locale, pagePath)) {
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

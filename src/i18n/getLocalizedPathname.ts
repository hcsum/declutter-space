import { isValidLocale, type Locale } from "./config";

export function getLocalizedPathname(pathname: string, locale: Locale): string {
  const [pathOnly, hash = ""] = pathname.split("#");
  const segments = pathOnly.split("/");

  let localizedPath: string;

  if (isValidLocale(segments[1])) {
    segments[1] = locale;
    localizedPath = segments.join("/");
  } else {
    localizedPath = `/${locale}${pathOnly === "/" ? "" : pathOnly}`;
  }

  return hash ? `${localizedPath}#${hash}` : localizedPath;
}

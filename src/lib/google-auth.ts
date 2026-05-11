import { isValidLocale } from "@/i18n/config";

function getPathWithoutLocale(pathname: string): string {
  const maybeLocale = pathname.split("/")[1];
  if (isValidLocale(maybeLocale)) {
    return pathname.slice(`/${maybeLocale}`.length) || "/";
  }

  return pathname;
}

function getLocaleRoot(pathname: string, fallbackPath: string): string {
  const maybeLocale = pathname.split("/")[1];
  return isValidLocale(maybeLocale) ? `/${maybeLocale}` : fallbackPath;
}

export function sanitizePostLoginNextPath(
  nextPath: string | null | undefined,
  fallbackPath: string = "/",
) {
  if (typeof nextPath !== "string") return fallbackPath;
  if (!nextPath.startsWith("/") || nextPath.startsWith("//")) {
    return fallbackPath;
  }

  const pathname = nextPath.split(/[?#]/, 1)[0] || nextPath;
  const barePath = getPathWithoutLocale(pathname);

  if (
    barePath === "/login" ||
    barePath === "/signup" ||
    barePath === "/verify-email" ||
    barePath.startsWith("/dashboard")
  ) {
    return getLocaleRoot(pathname, fallbackPath);
  }

  return nextPath;
}

export function buildPostLoginCallbackPath(nextPath: string = "/") {
  return `/api/auth/post-login?next=${encodeURIComponent(
    sanitizePostLoginNextPath(nextPath),
  )}`;
}

export function buildGoogleSignInHref(nextPath: string = "/") {
  return `/api/auth/signin/google?callbackUrl=${encodeURIComponent(
    buildPostLoginCallbackPath(nextPath),
  )}`;
}

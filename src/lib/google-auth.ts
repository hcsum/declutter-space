export function sanitizePostLoginNextPath(
  nextPath: string | null | undefined,
  fallbackPath: string = "/dashboard",
) {
  if (typeof nextPath !== "string") return fallbackPath;
  if (!nextPath.startsWith("/") || nextPath.startsWith("//")) {
    return fallbackPath;
  }

  return nextPath;
}

export function buildPostLoginCallbackPath(nextPath: string = "/dashboard") {
  return `/api/auth/post-login?next=${encodeURIComponent(
    sanitizePostLoginNextPath(nextPath),
  )}`;
}

export function buildGoogleSignInHref(nextPath: string = "/dashboard") {
  return `/api/auth/signin/google?callbackUrl=${encodeURIComponent(
    buildPostLoginCallbackPath(nextPath),
  )}`;
}

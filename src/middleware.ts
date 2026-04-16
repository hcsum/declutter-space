import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./lib/session";
import { defaultLocale, isValidLocale } from "./i18n/config";

const protectedRoutes = ["/dashboard"];
const publicRoutes = [
  "/login",
  "/signup",
  "/api/auth/signin",
  "/api/auth/callback",
  "/api/auth/post-login",
];

const i18nExcludedPrefixes = [
  "/posts",
  "/api",
  "/_next",
  "/robots.txt",
  "/sitemap.xml",
  "/sitemap-",
];

function isI18nExcluded(pathname: string): boolean {
  return i18nExcludedPrefixes.some((p) => pathname.startsWith(p));
}

function getPathWithoutLocale(pathname: string): string {
  const maybeLocale = pathname.split("/")[1];
  if (isValidLocale(maybeLocale)) {
    return pathname.slice(`/${maybeLocale}`.length) || "/";
  }
  return pathname;
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/logout") {
    (await cookies()).delete("session");
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isI18nExcluded(pathname)) {
    return NextResponse.next();
  }

  const segments = pathname.split("/");
  const maybeLocale = segments[1];
  const hasLocale = isValidLocale(maybeLocale);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!hasLocale) {
    const barePath = pathname;
    const isProtected = protectedRoutes.some((r) => barePath.startsWith(r));
    const isPublic = publicRoutes.some((r) => barePath.startsWith(r));

    if (isProtected && !session?.userId) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    if (isPublic && session?.userId && !barePath.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    const url = req.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  const barePath = getPathWithoutLocale(pathname);
  const isProtected = protectedRoutes.some((r) => barePath.startsWith(r));
  const isPublic = publicRoutes.some((r) => barePath.startsWith(r));

  if (isProtected && !session?.userId) {
    return NextResponse.redirect(new URL(`/${maybeLocale}/login`, req.nextUrl));
  }

  if (isPublic && session?.userId && !barePath.startsWith("/dashboard")) {
    return NextResponse.redirect(
      new URL(`/${maybeLocale}/dashboard`, req.nextUrl),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};

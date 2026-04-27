"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLightDarkMode } from "./LightDarkModeContext";
import { useI18n } from "@/i18n/i18n-provider";
import { Locale, locales, isValidLocale } from "@/i18n/config";
import {
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useLoginDialog } from "./LoginDialogProvider";

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { mode, toggleMode } = useLightDarkMode();
  const { t, locale, localePath } = useI18n();
  const { setOpen: setLoginOpen } = useLoginDialog();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/status", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setLoggedIn(Boolean(d?.loggedIn));
      })
      .catch(() => {
        if (!cancelled) setLoggedIn(false);
      });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  function switchLocale(newLocale: Locale) {
    const segments = pathname.split("/");
    const maybeLocale = segments[1];
    if (isValidLocale(maybeLocale)) {
      segments[1] = newLocale;
      router.push(segments.join("/"));
    } else {
      router.push(`/${newLocale}${pathname === "/" ? "" : pathname}`);
    }
  }

  const isHome =
    pathname === "/" ||
    pathname === `/${locale}` ||
    pathname === `/${locale}/`;
  const isChecklist = pathname.includes("/declutter-checklist");
  const isSecondLook = pathname.includes("/keep-or-toss");

  return (
    <header className="fixed top-0 w-full z-50 border-b border-stone-200 dark:border-gray-700 bg-stone-50/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        <Link href={localePath("/")} className="min-w-0">
          <p className="flex items-center gap-2 font-display text-lg font-bold tracking-tighter text-orange-800 dark:text-orange-400 md:text-2xl">
            <span className="material-symbols-outlined text-xl md:text-2xl">home</span>
            <span className="truncate">Declutter Your Home</span>
          </p>
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-body-md text-sm tracking-wide">
          <Link
            href={localePath("/")}
            className={
              isHome
                ? "text-orange-700 dark:text-orange-400 border-b-2 border-orange-700 dark:border-orange-400 pb-1"
                : "text-stone-600 dark:text-stone-400 hover:text-orange-700 dark:hover:text-orange-400 transition-colors"
            }
          >
            Home
          </Link>
          <Link
            href={localePath("/declutter-checklist")}
            className={
              isChecklist
                ? "text-orange-700 dark:text-orange-400 border-b-2 border-orange-700 dark:border-orange-400 pb-1"
                : "text-stone-600 dark:text-stone-400 hover:text-orange-700 dark:hover:text-orange-400 transition-colors"
            }
          >
            {t("header.declutterChecklist")}
          </Link>
          <Link
            href={localePath("/keep-or-toss")}
            className={
              isSecondLook
                ? "text-orange-700 dark:text-orange-400 border-b-2 border-orange-700 dark:border-orange-400 pb-1"
                : "text-stone-600 dark:text-stone-400 hover:text-orange-700 dark:hover:text-orange-400 transition-colors"
            }
          >
            {t("header.secondLook")}
          </Link>
        </nav>
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={toggleMode}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 hover:bg-stone-200 dark:bg-gray-800/80 dark:hover:bg-gray-700 transition-colors"
            aria-label={t("header.toggleTheme")}
          >
            {mode === "dark" ? (
              <SunIcon className="h-5 w-5 text-stone-600 dark:text-stone-300" />
            ) : (
              <MoonIcon className="h-5 w-5 text-stone-600 dark:text-stone-300" />
            )}
          </button>
          <div className="relative hidden md:block group">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-stone-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Language"
            >
              <LanguageIcon className="h-5 w-5 text-stone-600 dark:text-stone-300" />
            </button>
            <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-700 border border-stone-200 dark:border-gray-600 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-[80px]">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={`block w-full text-left px-3 py-1.5 text-sm hover:bg-stone-100 dark:hover:bg-gray-600 transition-colors ${
                    locale === loc
                      ? "text-orange-700 dark:text-orange-400 font-semibold"
                      : "text-stone-600 dark:text-stone-300"
                  }`}
                >
                  {loc === "en" ? "EN" : "中文"}
                </button>
              ))}
            </div>
          </div>
          {loggedIn && (
            <Link
              href={localePath("/dashboard/user")}
              className="hidden md:flex h-10 w-10 items-center justify-center rounded-full hover:bg-stone-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={t("header.account")}
            >
              <UserCircleIcon className="h-5 w-5 text-stone-600 dark:text-stone-300" />
            </Link>
          )}
          {!loggedIn && (
            <button
              onClick={() => setLoginOpen(true)}
              className="hidden md:inline-flex px-6 py-2 bg-stone-100 dark:bg-gray-700 text-stone-800 dark:text-stone-200 font-body-md text-sm rounded-lg hover:bg-stone-200 dark:hover:bg-gray-600 transition-all duration-300 ease-in-out active:scale-95"
              aria-label={t("header.login")}
            >
              {t("header.login")}
            </button>
          )}
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 hover:bg-stone-200 dark:bg-gray-800/80 dark:hover:bg-gray-700 transition-colors md:hidden"
            aria-label={t("header.openMenu")}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-5 w-5 text-stone-600 dark:text-stone-300" />
            ) : (
              <Bars3Icon className="h-5 w-5 text-stone-600 dark:text-stone-300" />
            )}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden absolute inset-x-0 top-full z-40 border-b border-stone-200 bg-stone-50/95 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/95">
          <div className="m-4 rounded-[1.75rem] border border-stone-200/80 bg-white/95 p-4 shadow-lg shadow-stone-900/5 dark:border-gray-700 dark:bg-gray-800/95">
            <nav className="space-y-2">
              <Link
                href={localePath("/")}
                className={`block rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                  isHome
                    ? "bg-orange-50 text-orange-700 dark:bg-orange-400/10 dark:text-orange-300"
                    : "text-stone-800 hover:bg-stone-100 dark:text-stone-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href={localePath("/declutter-checklist")}
                className={`block rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                  isChecklist
                    ? "bg-orange-50 text-orange-700 dark:bg-orange-400/10 dark:text-orange-300"
                    : "text-stone-800 hover:bg-stone-100 dark:text-stone-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.declutterChecklist")}
              </Link>
              <Link
            href={localePath("/keep-or-toss")}
                className={`block rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                  isSecondLook
                    ? "bg-orange-50 text-orange-700 dark:bg-orange-400/10 dark:text-orange-300"
                    : "text-stone-800 hover:bg-stone-100 dark:text-stone-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.secondLook")}
              </Link>
            </nav>

            <div className="mt-4 rounded-2xl bg-stone-100/80 p-3 dark:bg-gray-700/70">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-gray-400">
                <LanguageIcon className="h-4 w-4" />
                Language
              </div>
              <div className="grid grid-cols-2 gap-2">
                {locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      switchLocale(loc);
                    }}
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                      locale === loc
                        ? "bg-white text-orange-700 shadow-sm dark:bg-gray-800 dark:text-orange-300"
                        : "bg-transparent text-stone-700 hover:bg-white/80 dark:text-gray-200 dark:hover:bg-gray-800/80"
                    }`}
                  >
                    {loc === "en" ? "English" : "中文"}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              {loggedIn ? (
                <Link
                  href={localePath("/dashboard/user")}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#1f3a2d] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#173023]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserCircleIcon className="h-5 w-5" />
                  {t("header.account")}
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setLoginOpen(true);
                  }}
                  className="flex items-center justify-center rounded-2xl bg-[#1f3a2d] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#173023] w-full"
                >
                  {t("header.login")}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

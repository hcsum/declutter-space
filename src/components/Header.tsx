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

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { mode, toggleMode } = useLightDarkMode();
  const { t, locale, localePath } = useI18n();
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

  if (
    pathname.startsWith("/declutter-checklist") ||
    pathname.startsWith("/en/declutter-checklist") ||
    pathname.startsWith("/zh/declutter-checklist")
  ) {
    return null;
  }

  return (
    <header className="bg-white shadow py-4 px-6 dark:bg-gray-800 relative">
      <div className="mx-auto lg:max-w-[90%] flex justify-between items-center">
        <Link href={localePath("/")}>
          <p className="text-2xl font-bold text-black dark:text-white font-signika">
            {t("common.appName")}
          </p>
        </Link>
        <div className="flex items-center space-x-4 sm:space-x-6">
          <Link
            href={localePath("/declutter-checklist")}
            className="hidden sm:inline text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            {t("header.declutterChecklist")}
          </Link>
          <Link
            href={localePath("/dashboard")}
            className="hidden sm:inline text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            {t("header.secondLook")}
          </Link>
          <button
            onClick={toggleMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label={t("header.toggleTheme")}
          >
            {mode === "dark" ? (
              <SunIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          <div className="relative group">
            <button
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Language"
            >
              <LanguageIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
            <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-[80px]">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={`block w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${
                    locale === loc
                      ? "text-blue-500 font-semibold"
                      : "text-gray-700 dark:text-gray-300"
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
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label={t("header.account")}
            >
              <UserCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </Link>
          )}
          {!loggedIn && (
            <Link
              href={localePath("/login")}
              className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              aria-label={t("header.login")}
            >
              {t("header.login")}
            </Link>
          )}
          <button
            className="inline sm:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label={t("header.openMenu")}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="sm:hidden absolute left-0 right-0 top-full z-40 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-md">
          <nav className="px-6 py-4 space-y-3">
            <Link
              href={localePath("/declutter-checklist")}
              className="block text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("header.declutterChecklist")}
            </Link>
            <Link
              href={localePath("/dashboard")}
              className="block text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("header.secondLook")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

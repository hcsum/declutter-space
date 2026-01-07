"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLightDarkMode } from "./LightDarkModeContext";
import {
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const Header: React.FC = () => {
  const pathname = usePathname();
  const { mode, toggleMode } = useLightDarkMode();
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
  const logoLink = "/";

  return (
    <header className="bg-white shadow py-4 px-6 dark:bg-gray-800 relative">
      <div className="mx-auto lg:max-w-[90%] flex justify-between items-center">
        <Link href={logoLink}>
          <p className="text-2xl font-bold text-black dark:text-white font-signika">
            DeclutterSpace
          </p>
        </Link>
        <div className="flex items-center space-x-4 sm:space-x-6">
          <Link
            href="/declutter-checklist"
            className="hidden sm:inline text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            Declutter Checklist
          </Link>
          <Link
            href="/dashboard"
            className="hidden sm:inline text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            Second Look
          </Link>
          <button
            onClick={toggleMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle theme"
          >
            {mode === "dark" ? (
              <SunIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          {loggedIn && (
            <Link
              href="/dashboard/user"
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Account"
            >
              <UserCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </Link>
          )}
          {!loggedIn && (
            <Link
              href="/login"
              className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              aria-label="Login"
            >
              Login
            </Link>
          )}
          {/* Mobile menu toggle */}
          <button
            className="inline sm:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Open menu"
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
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden absolute left-0 right-0 top-full z-40 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-md">
          <nav className="px-6 py-4 space-y-3">
            <Link
              href="/declutter-checklist"
              className="block text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Declutter Checklist
            </Link>
            <Link
              href="/dashboard"
              className="block text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Second Look
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

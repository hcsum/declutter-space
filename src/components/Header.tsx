"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useLightDarkMode } from "./LightDarkModeContext";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const Header: React.FC = () => {
  const pathname = usePathname();
  const { mode, toggleMode } = useLightDarkMode();
  const logoLink = pathname.startsWith("/dashboard") ? "/dashboard" : "/";

  return (
    <header className="bg-white shadow py-4 px-6 dark:bg-gray-800 relative">
      <div className="mx-auto lg:max-w-[90%] flex justify-between items-center">
        <Link href={logoLink}>
          <p className="text-2xl font-bold text-black dark:text-white font-signika">
            DeclutterSpace
          </p>
        </Link>
        <div className="flex items-center space-x-6">
          <Link
            href="/declutter-checklist"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            Declutter Checklist
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
        </div>
      </div>
    </header>
  );
};

export default Header;

"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  UserCircleIcon,
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Signika } from "next/font/google";

const signika = Signika({
  weight: "400",
  subsets: ["latin"],
});

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  let navContent = null;

  if (pathname === "/") {
    navContent = (
      <ul
        className={`md:flex md:space-x-6 text-gray-700 dark:text-gray-300 ${
          isMobileMenuOpen
            ? "absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 p-4 space-y-4 shadow-lg md:space-y-0 md:shadow-none"
            : "hidden md:flex"
        }`}
      >
        <li>
          <button
            onClick={() => {
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" });
              setIsMobileMenuOpen(false);
            }}
            className="hover:text-blue-500 dark:hover:text-blue-400 transition w-full text-left"
          >
            Features
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
              setIsMobileMenuOpen(false);
            }}
            className="hover:text-blue-500 dark:hover:text-blue-400 transition w-full text-left"
          >
            Contact
          </button>
        </li>
      </ul>
    );
  } else if (pathname.startsWith("/dashboard")) {
    navContent = (
      <Link href="/dashboard/user">
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <UserCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
      </Link>
    );
  }

  return (
    <header className="bg-white shadow py-4 px-6 dark:bg-gray-800 relative">
      <div className="mx-auto flex justify-between items-center">
        <Link href="/">
          <h1
            className={`text-2xl font-bold text-black dark:text-white ${signika.style}`}
          >
            DeclutterSpace
          </h1>
        </Link>
        <div className="flex items-center space-x-6">
          {pathname === "/" && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          )}
          {navContent}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isDarkMode ? (
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

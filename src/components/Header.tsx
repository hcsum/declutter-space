"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { UserCircleIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

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
      <ul className="flex space-x-6 text-gray-700 dark:text-gray-300">
        <li>
          <button
            onClick={() =>
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            Features
          </button>
        </li>
        <li>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            Contact
          </button>
        </li>
      </ul>
    );
  } else if (pathname === "/main") {
    navContent = (
      <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
        <UserCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
      </button>
    );
  }

  return (
    <header className="bg-white shadow py-4 px-6 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-500">
          Declutter.zen
        </Link>
        <div className="flex items-center space-x-6">
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

"use client";

import React, { useState, useEffect } from "react";
import { UserCircleIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync with localStorage and Tailwind's dark mode class
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
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

  return (
    <>
      <header className="bg-white shadow py-4 px-6 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-500">Declutter.zen</h1>
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
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
            {/* User icon */}
            <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              <UserCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </header>
      <div className="">{children}</div>
    </>
  );
}

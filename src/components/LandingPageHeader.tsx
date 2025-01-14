"use client";

import React from "react";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const LandingPageHeader: React.FC = () => {
  return (
    <header className="bg-white shadow py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-500">Declutter.zen</h1>
        <nav>
          <ul className="flex space-x-6 text-gray-700">
            <li>
              <button
                onClick={() => scrollToSection("features")}
                className="hover:text-blue-500 transition"
              >
                Features
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("contact")}
                className="hover:text-blue-500 transition"
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default LandingPageHeader;

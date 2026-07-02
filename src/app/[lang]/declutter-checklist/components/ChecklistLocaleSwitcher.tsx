"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LanguageIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { useI18n } from "@/i18n/i18n-provider";
import { locales } from "@/i18n/config";
import { getLocalizedPathname } from "@/i18n/getLocalizedPathname";

export default function ChecklistLocaleSwitcher() {
  const pathname = usePathname();
  const { t, locale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  function getLocaleLabel(targetLocale: (typeof locales)[number]) {
    if (targetLocale === "en") return "EN";
    if (targetLocale === "zh") return "中文";
    return "日本語";
  }

  return (
    <div ref={containerRef} className="relative mt-6 flex justify-start">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={t("checklist.language")}
        aria-expanded={isOpen}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#2b694d] shadow-sm transition-colors hover:bg-[#edefe7]"
      >
        <LanguageIcon className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute bottom-0 left-14 z-30 min-w-[96px] rounded-2xl border border-[#d7dbd4] bg-white p-2 shadow-lg">
          {locales.map((targetLocale) => {
            const isActive = locale === targetLocale;

            return (
              <Link
                key={targetLocale}
                href={getLocalizedPathname(pathname, targetLocale)}
                onClick={() => setIsOpen(false)}
                className={[
                  "block w-full rounded-xl px-3 py-2 text-left text-sm font-bold transition-colors",
                  isActive
                    ? "bg-[#002d1c] text-white"
                    : "text-[#2b694d] hover:bg-[#edefe7]",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                {getLocaleLabel(targetLocale)}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

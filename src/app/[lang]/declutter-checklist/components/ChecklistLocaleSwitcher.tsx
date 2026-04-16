"use client";

import { useEffect, useRef, useState } from "react";
import { LanguageIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import { useI18n } from "@/i18n/i18n-provider";
import { isValidLocale, locales, type Locale } from "@/i18n/config";

export default function ChecklistLocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
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

  function switchLocale(newLocale: Locale) {
    const segments = pathname.split("/");
    const maybeLocale = segments[1];

    if (isValidLocale(maybeLocale)) {
      segments[1] = newLocale;
      setIsOpen(false);
      router.push(segments.join("/"));
      return;
    }

    setIsOpen(false);
    router.push(`/${newLocale}${pathname === "/" ? "" : pathname}`);
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
              <button
                key={targetLocale}
                type="button"
                onClick={() => switchLocale(targetLocale)}
                className={[
                  "block w-full rounded-xl px-3 py-2 text-left text-sm font-bold transition-colors",
                  isActive
                    ? "bg-[#002d1c] text-white"
                    : "text-[#2b694d] hover:bg-[#edefe7]",
                ].join(" ")}
              >
                {targetLocale === "en" ? "EN" : "中文"}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

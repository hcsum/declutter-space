"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/i18n/i18n-provider";
import { isPageAvailable } from "@/i18n/page-locales";
import {
  getChecklistPrintable,
  printableAreas,
} from "@/lib/checklist/printables";
import {
  getResourceGuideLinks,
  resourceNavigationCopy,
} from "@/lib/checklist/resource-navigation";

export default function AppFooter() {
  const pathname = usePathname();
  const { t, locale, localePath } = useI18n();
  const path = pathname
    .replace(/^\/(?:en|zh|ja|es|de)(?=\/|$)/, "")
    .replace(/\/$/, "");
  const isChecklist = /^\/declutter-checklist(?:\/|$)/.test(path);
  if (/^\/declutter-checklist\/(?:progress|upload)(?:\/|$)/.test(path)) {
    return null;
  }

  const copyright = t("footer.copyright").replace(
    "{year}",
    String(new Date().getFullYear()),
  );

  if (isChecklist) {
    const copy = resourceNavigationCopy[locale];
    const isHub = path === "/declutter-checklist";
    return (
      <footer
        className={`print-hidden flex-none border-t border-[#dfe4d7] bg-[#f3f4ec] px-5 py-8 text-[#414844] ${isHub ? "md:ml-64 md:px-8" : ""}`}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2">
            <nav aria-label={copy.resources}>
              <h2 className="text-base font-bold text-[#002d1c]">
                {copy.resources}
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {printableAreas
                  .filter(({ slug }) =>
                    isPageAvailable(locale, `/declutter-checklist/${slug}`),
                  )
                  .map(({ slug }) => {
                    const resource = getChecklistPrintable(slug, locale);
                    return (
                      resource && (
                        <li key={slug}>
                          <Link
                            className="inline-block py-1 hover:text-[#2b694d] hover:underline"
                            href={localePath(`/declutter-checklist/${slug}`)}
                          >
                            {resource.title}
                          </Link>
                        </li>
                      )
                    );
                  })}
              </ul>
            </nav>
            <nav aria-label={copy.guides}>
              <h2 className="text-base font-bold text-[#002d1c]">
                {copy.guides}
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {getResourceGuideLinks(locale).map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      className="inline-block py-1 hover:text-[#2b694d] hover:underline"
                      href={localePath(href)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#dfe4d7] pt-5 text-xs">
            <p>{copyright}</p>
            <Link
              className="hover:underline"
              href={
                locale === "de"
                  ? "/en/customer-service-policy"
                  : localePath("/customer-service-policy")
              }
            >
              {t("footer.customerServicePolicy")}
            </Link>
            <Link
              className="hover:underline"
              href={
                locale === "de"
                  ? "/en/privacy-policy"
                  : localePath("/privacy-policy")
              }
            >
              {t("footer.privacyPolicy")}
            </Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gray-800 py-6 text-white text-center flex-none">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm">{copyright}</p>
        <p className="text-sm mt-2">{t("footer.builtWithLove")}</p>
        <div className="mt-4 flex flex-col sm:flex-row justify-center sm:space-x-4">
          <Link
            href={
              locale === "de"
                ? "/en/customer-service-policy"
                : localePath("/customer-service-policy")
            }
            className="text-gray-400 hover:text-blue-300 text-sm mx-2 sm:mx-0"
          >
            {t("footer.customerServicePolicy")}
          </Link>
          <Link
            href={
              locale === "de"
                ? "/en/privacy-policy"
                : localePath("/privacy-policy")
            }
            className="text-gray-400 hover:text-blue-300 text-sm mx-2 sm:mx-0"
          >
            {t("footer.privacyPolicy")}
          </Link>
          <Link
            href="/posts"
            className="text-gray-400 hover:text-blue-300 text-sm mx-2 sm:mx-0"
          >
            {t("footer.blog")}
          </Link>
        </div>
      </div>
    </footer>
  );
}

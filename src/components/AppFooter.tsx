"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/i18n/i18n-provider";

export default function AppFooter() {
  const pathname = usePathname();
  const { t, localePath } = useI18n();
  if (
    pathname.startsWith("/declutter-checklist") ||
    pathname.startsWith("/en/declutter-checklist") ||
    pathname.startsWith("/zh/declutter-checklist")
  ) {
    return null;
  }

  const copyright = t("footer.copyright").replace(
    "{year}",
    String(new Date().getFullYear()),
  );

  return (
    <footer className="bg-gray-800 py-6 text-white text-center flex-none">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm">{copyright}</p>
        <p className="text-sm mt-2">{t("footer.builtWithLove")}</p>
        <div className="mt-4 flex flex-col sm:flex-row justify-center sm:space-x-4">
          <Link
            href={localePath("/customer-service-policy")}
            className="text-gray-400 hover:text-blue-300 text-sm mx-2 sm:mx-0"
          >
            {t("footer.customerServicePolicy")}
          </Link>
          <Link
            href={localePath("/privacy-policy")}
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
        <div className="mt-4 flex flex-col sm:flex-row justify-center items-center sm:space-x-4 space-y-2 sm:space-y-0">
          <a
            href="https://startupfa.st"
            target="_blank"
            rel="noopener noreferrer"
            title="Powered by Startup Fast"
          >
            <img
              src="https://startupfa.st/images/badges/powered-by-dark.svg"
              alt="Powered by Startup Fast"
              width="150"
              height="44"
              className="inline-block"
            />
          </a>
          <a
            href="https://www.showmysites.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-300 text-sm"
          >
            ShowMySites
          </a>
        </div>
      </div>
    </footer>
  );
}

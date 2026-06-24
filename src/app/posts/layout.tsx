import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import { defaultLocale } from "@/i18n/config";
import {
  materialSymbolsStylesheet,
  siteBodyClassName,
  siteMetadata,
  SiteShell,
} from "../shared-layout";

export const metadata = siteMetadata;

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={defaultLocale}>
      <head>
        <link href={materialSymbolsStylesheet} rel="stylesheet" />
      </head>
      <body className={siteBodyClassName}>
        <SiteShell>
          <article className="max-w-3xl mx-auto py-8 px-4 ">
            {children}

            <div className="-mx-4 mt-12 bg-blue-500 py-16 px-4">
              <div className="text-center">
                <Link href="/" className="inline-block">
                  <button className="bg-white text-blue-500 px-8 py-4 rounded-lg text-lg hover:bg-gray-100 transition font-semibold">
                    Start Your Decluttering Journey - Join Beta
                  </button>
                </Link>
              </div>
            </div>
          </article>
        </SiteShell>
      </body>
      <GoogleAnalytics gaId="G-LT4QGDFCR2" />
    </html>
  );
}

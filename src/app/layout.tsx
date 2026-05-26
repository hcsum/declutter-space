import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Signika, Manrope } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Providers from "@/components/Providers";
import I18nWrapper from "@/components/I18nWrapper";
import LandingPageHeader from "@/components/Header";
import AppFooter from "@/components/AppFooter";
import { siteUrl } from "@/lib/site";
import { defaultLocale, isValidLocale } from "@/i18n/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const signika = Signika({
  variable: "--font-signika",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const siteName = "DeclutterYourHome";
const defaultTitle =
  "DeclutterYourHome | Practical Guides, Checklists, and Decluttering Tools";
const defaultDescription =
  "Declutter your home with practical guides, room-by-room checklists, and simple tools that help you stay organized and build decluttering habits that last.";

export const metadata: Metadata = {
  title: defaultTitle,
  description: defaultDescription,
  keywords: [
    "declutter your home",
    "how to declutter your home",
    "declutter checklist",
    "decluttering tips",
    "home organization",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    locale: "en_US",
    images: [
      {
        url: "/hero.webp",
        width: 1254,
        height: 1254,
        alt: "Declutter Your Home — practical guides and checklists",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerLocale = (await headers()).get("x-locale");
  const lang = isValidLocale(headerLocale ?? "") ? headerLocale : defaultLocale;
  return (
    <html lang={lang ?? defaultLocale}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${signika.variable} ${manrope.variable} antialiased min-h-screen flex flex-col`}
      >
        <div
          id="app-view"
          className="flex-1 bg-background dark:bg-gray-900 relative flex flex-col"
        >
          <I18nWrapper>
            <Providers>
              <LandingPageHeader />
              <div id="app-content" className="flex-1 overflow-auto min-h-0">
                {children}
              </div>
              <AppFooter />
            </Providers>
          </I18nWrapper>
        </div>
      </body>
      <GoogleAnalytics gaId="G-LT4QGDFCR2" />
    </html>
  );
}

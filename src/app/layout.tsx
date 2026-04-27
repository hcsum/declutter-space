import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Signika, Manrope } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import I18nWrapper from "@/components/I18nWrapper";
import LandingPageHeader from "@/components/Header";
import AppFooter from "@/components/AppFooter";
import { siteUrl } from "@/lib/site";

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

export const metadata: Metadata = {
  title: "DeclutterYourHome | Practical Guides, Checklists, and Decluttering Tools",
  description:
    "Declutter your home with practical guides, room-by-room checklists, and simple tools that help you stay organized and build decluttering habits that last.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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

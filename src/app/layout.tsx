import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Signika } from "next/font/google";
import "./globals.css";
import LandingPageHeader from "@/components/Header";
import UIProvider from "@/components/UIProvider";
import { LightDarkModeProvider } from "@/components/LightDarkModeContext";

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

export const metadata: Metadata = {
  title: "Declutter Space - The Declutter App for your home",
  description:
    "An app for decluttering. Easily upload your items by image recognition, and track your items with ease. Set deadlines for every item and take control of your home one step at a time. Receive email reminders when your items are due.",
  keywords: [
    "decluttering tips",
    "app for decluttering",
    "declutter your home",
    "how to declutter your home",
    "declutter space",
  ],
  metadataBase: new URL("https://declutterspace.net"),
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${signika.variable} antialiased`}
      >
        <div className="min-h-[80vh] bg-gray-50 dark:bg-gray-900">
          <LightDarkModeProvider>
            <UIProvider>
              <LandingPageHeader />
              {children}
            </UIProvider>
          </LightDarkModeProvider>
        </div>
        <footer className="bg-gray-800 py-6 text-white text-center">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} declutterspace.net. All rights
              reserved.
            </p>
            <p className="text-sm mt-2">
              Built with love to help you simplify your life.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row justify-center sm:space-x-4 [&>a]:text-gray-400 [&>a]:text-sm [&>a]:mx-2 [&>a]:sm:mx-0">
              <a href="/customer-service-policy">Customer Service Policy</a>
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/posts">Blog</a>
              <a
                href="https://freelancer-tools.shop/"
                title="Freelancer Tools Directory"
              >
                Freelancer Tools Directory
              </a>
            </div>
          </div>
        </footer>
      </body>
      <GoogleAnalytics gaId="G-LT4QGDFCR2" />
    </html>
  );
}

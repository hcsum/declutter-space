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
  title: "Declutter Space - Organize Your Home with AI-Powered Item Management",
  description:
    "A tool to help you declutter. Easily upload your items by image recognition, and track your items with ease. Set deadlines for every item and take control of your home one step at a time. Receive email reminders when your items are due.",
  keywords: [
    "declutter",
    "declutter app",
    "decluttering tool",
    "declutter helper",
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
            <div className="mt-4 flex flex-col sm:flex-row justify-center sm:space-x-4">
              <a
                href="/customer-service-policy"
                className="text-gray-400 hover:text-blue-300 text-sm mx-2 sm:mx-0"
              >
                Customer Service Policy
              </a>
              <a
                href="/privacy-policy"
                className="text-gray-400 hover:text-blue-300 text-sm mx-2 sm:mx-0"
              >
                Privacy Policy
              </a>
              <a
                href="/posts"
                className="text-gray-400 hover:text-blue-300 text-sm mx-2 sm:mx-0"
              >
                Blog
              </a>
            </div>
          </div>
        </footer>
      </body>
      <GoogleAnalytics gaId="G-LT4QGDFCR2" />
    </html>
  );
}

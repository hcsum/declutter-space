import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "declutterspace.net",
  description: "Sort out your stuff, sort out your mind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-[80vh]">
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
                href="/refund-policy"
                className="text-gray-400 hover:text-blue-300 text-sm mx-2 sm:mx-0"
              >
                Refund Policy
              </a>
              <a
                href="/privacy-policy"
                className="text-gray-400 hover:text-blue-300 text-sm mx-2 sm:mx-0"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

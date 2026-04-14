"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppFooter() {
  const pathname = usePathname();
  // Hide footer on declutter checklist page
  if (pathname.startsWith("/declutter-checklist")) return null;

  return (
    <footer className="bg-gray-800 py-6 text-white text-center flex-none">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} declutterspace.net. All rights
          reserved.
        </p>
        <p className="text-sm mt-2">
          Built with love to help you simplify your life.
        </p>
        <div className="mt-4 flex flex-col sm:flex-row justify-center sm:space-x-4">
          <Link
            href="/customer-service-policy"
            className="text-gray-400 hover:text-blue-300 text-sm mx-2 sm:mx-0"
          >
            Customer Service Policy
          </Link>
          <Link
            href="/privacy-policy"
            className="text-gray-400 hover:text-blue-300 text-sm mx-2 sm:mx-0"
          >
            Privacy Policy
          </Link>
          <Link
            href="/posts"
            className="text-gray-400 hover:text-blue-300 text-sm mx-2 sm:mx-0"
          >
            Blog
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

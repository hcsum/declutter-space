"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AppFooter() {
  const pathname = usePathname()
  // Hide footer on declutter checklist page
  if (pathname.startsWith("/declutter-checklist")) return null

  return (
    <footer className="bg-gray-800 py-6 text-white text-center flex-none">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} declutterspace.net. All rights
          reserved.
        </p>
        <p className="text-sm mt-2">Built with love to help you simplify your life.</p>
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
          <Link href="/posts" className="text-gray-400 hover:text-blue-300 text-sm mx-2 sm:mx-0">
            Blog
          </Link>
        </div>
      </div>
    </footer>
  )
}


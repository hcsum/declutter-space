import Link from "next/link";
import { buildGoogleSignInHref } from "@/lib/google-auth";

type GoogleSignInButtonProps = {
  nextPath?: string;
  className?: string;
  label?: string;
};

export default function GoogleSignInButton({
  nextPath = "/dashboard",
  className,
  label = "Continue with Google",
}: GoogleSignInButtonProps) {
  return (
    <Link
      href={buildGoogleSignInHref(nextPath)}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#FFC107"
          d="M43.611 20.083H42V20H24v8h11.303C33.602 31.659 29.223 35 24 35 17.373 35 12 29.627 12 23S17.373 11 24 11c3.059 0 5.842 1.159 7.961 3.039l5.657-5.657C34.676 5.072 29.566 3 24 3 12.955 3 4 11.955 4 23s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"
        />
        <path
          fill="#FF3D00"
          d="M6.306 14.691l6.571 4.818C14.597 16.108 18.961 13 24 13c3.059 0 5.842 1.159 7.961 3.039l5.657-5.657C34.676 5.072 29.566 3 24 3 16.318 3 9.656 7.386 6.306 14.691z"
        />
        <path
          fill="#4CAF50"
          d="M24 43c5.17 0 9.86-1.977 13.409-5.191l-6.19-5.238C29.223 35 24.844 31.659 24 31.659c-5.207 0-9.574-3.321-11.176-7.91l-6.54 5.034C9.583 39.479 16.167 43 24 43z"
        />
        <path
          fill="#1976D2"
          d="M43.611 20.083H42V20H24v8h11.303c-1.31 3.659-5.689 7-11.303 7-5.207 0-9.574-3.321-11.176-7.91l-6.54 5.034C9.583 39.479 16.167 43 24 43c11.045 0 20-8.955 20-20 0-1.341-.138-2.651-.389-3.917z"
        />
      </svg>
      {label}
    </Link>
  );
}

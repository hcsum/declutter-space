"use client";

import { forgotPassword, resetPassword } from "@/actions/auth";
import Link from "next/link";
import { useActionState } from "react";

export function ForgotPasswordForm({ token }: { token?: string }) {
  const [state, formAction, pending] = useActionState(
    token ? resetPassword : forgotPassword,
    undefined,
  );

  if (token) {
    return (
      <div className="min-h-[80vh] flex md:items-center md:justify-center bg-gray-50 dark:bg-gray-900 pb-16">
        <div className="w-full md:max-w-md bg-white dark:bg-gray-800 md:rounded-lg md:shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6">
            Reset Your Password
          </h1>

          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
            Please enter your new password below.
          </p>

          {state?.errmsg && (
            <p className="text-sm text-red-500 text-center mb-4">
              {state.errmsg}
            </p>
          )}
          {state?.message && (
            <>
              <p className="text-sm text-green-500 text-center mb-4">
                {state.message}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                You can now{" "}
                <Link
                  href="/login"
                  className="text-blue-500 hover:underline dark:text-blue-400"
                >
                  login
                </Link>{" "}
                with your new password.
              </p>
            </>
          )}

          <form action={formAction} className="space-y-4">
            <input type="hidden" name="token" value={token} />
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
              {state?.errors?.password && (
                <p className="text-sm text-red-500 mt-1">
                  {state.errors.password}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
              {state?.errors?.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {state.errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              disabled={pending}
              type="submit"
              className={`w-full px-4 py-2 font-bold text-white rounded-lg transition ${
                pending
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {pending ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex md:items-center md:justify-center bg-gray-50 dark:bg-gray-900 pb-16">
      <div className="w-full md:max-w-md bg-white dark:bg-gray-800 md:rounded-lg md:shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6">
          Reset Your Password
        </h1>

        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>

        {state?.errmsg && (
          <p className="text-sm text-red-500 text-center mb-4">
            {state.errmsg}
          </p>
        )}
        {state?.message && (
          <p className="text-sm text-green-500 text-center mb-4">
            {state.message}
          </p>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
            {state?.errors?.email && (
              <p className="text-sm text-red-500 mt-1">{state.errors.email}</p>
            )}
          </div>

          <button
            disabled={pending}
            type="submit"
            className={`w-full px-4 py-2 font-bold text-white rounded-lg transition ${
              pending
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {pending ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
          Remember your password?{" "}
          <a
            href="/login"
            className="text-blue-500 hover:underline dark:text-blue-400"
          >
            Back to login
          </a>
        </p>
      </div>
    </div>
  );
}

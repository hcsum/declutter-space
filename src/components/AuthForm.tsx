"use client";

import { AuthFormState } from "@/lib/definitions";
import { useActionState } from "react";
import { signIn } from "next-auth/react";

interface AuthFormProps {
  formType: "login" | "signup";
  action?: (state: AuthFormState, formData: FormData) => Promise<AuthFormState>;
  disableEmail?: boolean;
}

export default function AuthForm({ formType, action, disableEmail = true }: AuthFormProps) {
  // Keep the classic dialog UI, but optionally disable email/password.
  const isSignup = formType === "signup";
  // Always call hook with a safe fallback when email is disabled.
  type ActionFn = (state: AuthFormState, formData: FormData) => Promise<AuthFormState>;
  const noopAction: ActionFn = async (s) => s;
  const typedAction: ActionFn = action ?? noopAction;
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(typedAction, undefined);

  const formData = state?.formData || {};

  return (
    <div className="min-h-[80vh] flex md:items-center md:justify-center bg-gray-50 dark:bg-gray-900 pb-16">
      <div className="w-full md:max-w-md bg-white dark:bg-gray-800 md:rounded-lg md:shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6">
          {isSignup ? "Create Your Account" : "Login to Your Account"}
        </h1>

        {/* OAuth */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/api/auth/post-login", redirect: true })}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            {/* Simple G icon */}
            <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.602 31.659 29.223 35 24 35 17.373 35 12 29.627 12 23S17.373 11 24 11c3.059 0 5.842 1.159 7.961 3.039l5.657-5.657C34.676 5.072 29.566 3 24 3 12.955 3 4 11.955 4 23s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"/>
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.818C14.597 16.108 18.961 13 24 13c3.059 0 5.842 1.159 7.961 3.039l5.657-5.657C34.676 5.072 29.566 3 24 3 16.318 3 9.656 7.386 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 43c5.17 0 9.86-1.977 13.409-5.191l-6.19-5.238C29.223 35 24.844 31.659 24 31.659c-5.207 0-9.574-3.321-11.176-7.91l-6.54 5.034C9.583 39.479 16.167 43 24 43z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.31 3.659-5.689 7-11.303 7-5.207 0-9.574-3.321-11.176-7.91l-6.54 5.034C9.583 39.479 16.167 43 24 43c11.045 0 20-8.955 20-20 0-1.341-.138-2.651-.389-3.917z"/>
            </svg>
            Continue with Google
          </button>
          {!disableEmail && (
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              <span className="text-xs text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            </div>
          )}
        </div>

        {/* Classic email/password form is hidden when disabled */}
        {!disableEmail && (
        <form action={formAction} className="space-y-4">
          <fieldset disabled={disableEmail} aria-disabled={disableEmail} className={disableEmail ? 'opacity-60 cursor-not-allowed' : ''}>
            {isSignup && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="Name"
                  defaultValue={formData.name}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
                {state?.errors?.name && (
                  <p className="text-sm text-red-500 mt-1">{state.errors.name}</p>
                )}
              </div>
            )}

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
                placeholder="Email"
                defaultValue={formData.email}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
              {state?.errors?.email && (
                <p className="text-sm text-red-500 mt-1">{state.errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
              {state?.errors?.password && (
                <div className="mt-2">
                  <p className="text-sm text-red-500">Password must:</p>
                  <ul className="list-disc list-inside text-sm text-red-500">
                    {state.errors.password.map((error) => (
                      <li key={error}>- {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {!isSignup && (
              <div className="text-right">
                <a
                  href="/forgot-password"
                  className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                >
                  Forgot Password?
                </a>
              </div>
            )}

            <button
              disabled={pending || disableEmail}
              type="submit"
              className={`w-full px-4 py-2 font-bold text-white rounded-lg transition ${
                pending || disableEmail
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {pending
                ? isSignup
                  ? "Signing Up..."
                  : "Logging In..."
                : isSignup
                  ? "Sign Up"
                  : "Log In"}
            </button>
          </fieldset>
        </form>
        )}

        {!disableEmail && (
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
            {isSignup
              ? "Already have an account? "
              : "Don't have an account yet? "}
            <a
              href={isSignup ? "/login" : "/signup"}
              className="text-blue-500 hover:underline dark:text-blue-400"
            >
              {isSignup ? "Log in" : "Sign up"}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

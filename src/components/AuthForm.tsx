"use client";

import { AuthFormState } from "@/lib/definitions";
import { useActionState } from "react";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { useI18n } from "@/i18n/i18n-provider";

interface AuthFormProps {
  formType: "login" | "signup";
  action?: (state: AuthFormState, formData: FormData) => Promise<AuthFormState>;
  disableEmail?: boolean;
}

export default function AuthForm({
  formType,
  action,
  disableEmail = true,
}: AuthFormProps) {
  const isSignup = formType === "signup";
  const { t, localePath } = useI18n();
  type ActionFn = (
    state: AuthFormState,
    formData: FormData,
  ) => Promise<AuthFormState>;
  const noopAction: ActionFn = async (s) => s;
  const typedAction: ActionFn = action ?? noopAction;
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(
    typedAction,
    undefined,
  );

  const formData = state?.formData || {};

  return (
    <div className="min-h-[80vh] flex md:items-center md:justify-center bg-gray-50 dark:bg-gray-900 pb-16">
      <div className="w-full md:max-w-md bg-white dark:bg-gray-800 md:rounded-lg md:shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6">
          {isSignup ? t("auth.createAccount") : t("auth.loginAccount")}
        </h1>

        <div className="space-y-3">
          <GoogleSignInButton nextPath="/dashboard" className="w-full" />
          {!disableEmail && (
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              <span className="text-xs text-gray-400">{t("auth.or")}</span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            </div>
          )}
        </div>

        {!disableEmail && (
          <form action={formAction} className="space-y-4">
            <fieldset
              disabled={disableEmail}
              aria-disabled={disableEmail}
              className={disableEmail ? "opacity-60 cursor-not-allowed" : ""}
            >
              {isSignup && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {t("auth.name")}
                  </label>
                  <input
                    id="name"
                    name="name"
                    placeholder={t("auth.namePlaceholder")}
                    defaultValue={formData.name}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                  />
                  {state?.errors?.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {state.errors.name}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {t("auth.email")}
                </label>
                <input
                  id="email"
                  name="email"
                  placeholder={t("auth.emailPlaceholder")}
                  defaultValue={formData.email}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
                {state?.errors?.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {state.errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {t("auth.password")}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={t("auth.passwordPlaceholder")}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
                {state?.errors?.password && (
                  <div className="mt-2">
                    <p className="text-sm text-red-500">
                      {t("auth.passwordMust")}
                    </p>
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
                    href={localePath("/forgot-password")}
                    className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                  >
                    {t("auth.forgotPassword")}
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
                    ? t("auth.signingUp")
                    : t("auth.loggingIn")
                  : isSignup
                    ? t("auth.signUp")
                    : t("auth.logIn")}
              </button>
            </fieldset>
          </form>
        )}

        {!disableEmail && (
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
            {isSignup ? t("auth.alreadyHaveAccount") : t("auth.noAccountYet")}
            <a
              href={isSignup ? localePath("/login") : localePath("/signup")}
              className="text-blue-500 hover:underline dark:text-blue-400"
            >
              {isSignup ? t("auth.loginLink") : t("auth.signupLink")}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

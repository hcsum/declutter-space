"use client";

import { sendVerificationEmail } from "@/actions/auth";
import { useActionState } from "react";

const NotVerified = () => {
  const [state, formAction, pending] = useActionState(sendVerificationEmail, {
    sent: false,
  });

  return (
    <div className="flex justify-center px-6 w-full min-h-[80vh] bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="w-full lg:max-w-[90%] mt-4 md:mt-8">
        <div className="text-center">
          <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Hi, thanks for your registeration. Verify your email address to
            start your decluttering journey.
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Please check your email and click the verification link to verify.
          </p>
          {state.sent ? (
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Verification email sent
            </p>
          ) : (
            <div className="mt-2 text-gray-600 dark:text-gray-400">
              <p className="inline">
                If you didn&apos;t receive the email, please check your spam
                folder or
              </p>{" "}
              <form action={formAction} className="inline">
                <button
                  type="submit"
                  className="text-blue-500 hover:text-blue-600 underline"
                  disabled={pending}
                >
                  {pending ? "Sending..." : "Resend the verification email"}
                </button>
              </form>
              <span>.</span>
            </div>
          )}
          {state.errmsg && (
            <p className="mt-2 text-red-500 dark:text-red-400">
              {state.errmsg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotVerified;

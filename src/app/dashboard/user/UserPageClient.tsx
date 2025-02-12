"use client";

import { logout } from "@/actions/auth";
import Stripe from "stripe";

const statusColors = {
  active: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100",
  canceled:
    "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100",
  incomplete: "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100",
  incomplete_expired:
    "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100",
  past_due: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100",
  paused: "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100",
  trialing: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100",
  unpaid: "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100",
};

const statusText = {
  active: "ACTIVE",
  canceled: "CANCELED",
  incomplete: "INCOMPLETE",
  incomplete_expired: "INCOMPLETE EXPIRED",
  past_due: "PAST DUE",
  paused: "PAUSED",
  trialing: "TRIALING",
  unpaid: "UNPAID",
};

const UserPageClient = ({
  membership,
  name,
  stripeUrl,
  stripePortalUrl,
}: {
  membership: Stripe.Subscription | null;
  name: string;
  stripeUrl: string | null;
  stripePortalUrl: string | null;
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 md:p-8">
      <div className="max-w-2xl md:mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Hi, {name}
        </h2>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Membership Status
          </h2>
          {membership ? (
            <>
              <div
                className={`inline-block font-semibold text-black px-4 py-2 rounded-full text-sm font-medium shadow-md mb-4 ${statusColors[membership.status] || statusColors.incomplete}`}
              >
                {statusText[membership.status] || statusText.incomplete}
              </div>
              {membership?.current_period_end && (
                <div className="text-gray-600 dark:text-gray-400">
                  Current period end at:{" "}
                  {new Date(
                    membership?.current_period_end,
                  ).toLocaleDateString()}
                </div>
              )}
              {membership?.cancel_at && (
                <div className="text-gray-600 dark:text-gray-400">
                  Cancel at:{" "}
                  {new Date(membership?.cancel_at).toLocaleDateString()}
                </div>
              )}
              {membership?.canceled_at && (
                <div className="text-gray-600 dark:text-gray-400">
                  Canceled at:{" "}
                  {new Date(membership?.canceled_at).toLocaleDateString()}
                </div>
              )}
              {membership?.status !== "active" && stripeUrl && (
                <a
                  href={stripeUrl}
                  className="block font-bold mt-4 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Reactivate Membership
                </a>
              )}
              {stripePortalUrl && (
                <a
                  href={stripePortalUrl}
                  className="block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Manage Subscription
                </a>
              )}
            </>
          ) : (
            <>
              <div
                className={`inline-block text-white bg-blue-500 px-4 py-2 rounded-full text-sm font-medium shadow-md mb-4`}
              >
                FREE TRIAL
              </div>
              {stripeUrl && (
                <a
                  href={stripeUrl}
                  className="block font-bold mt-4 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Join Membership
                </a>
              )}
            </>
          )}
        </div>

        <div className="mt-auto flex flex-col sm:flex-row sm:justify-end">
          <button
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg text-lg transition-colors duration-200 w-full sm:w-auto"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPageClient;

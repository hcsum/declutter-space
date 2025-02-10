"use client";

import { useState } from "react";
import { cancelMembership, MembershipStatus } from "@/actions/membership";
import { logout } from "@/actions/auth";

const statusColors = {
  active: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100",
  canceled:
    "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100",
  expired: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100",
  free_trial: "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100",
};

const statusText = {
  active: "ACTIVE",
  canceled: "CANCELED",
  expired: "EXPIRED",
  free_trial: "FREE TRIAL",
};

const UserPageClient = ({
  membership,
  name,
}: {
  membership: {
    status: MembershipStatus;
    currentPeriodEnd: Date | null;
  };
  name: string;
}) => {
  const { status, currentPeriodEnd } = membership;
  const currentPeriodEndDate = currentPeriodEnd?.toLocaleDateString();

  const [isCanceling, setIsCanceling] = useState(false);

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
          <div
            className={`inline-block ${statusColors[status]} px-4 py-2 rounded-full text-sm font-medium shadow-md mb-4`}
          >
            {statusText[status]}
          </div>
          {status === "active" && (
            <p className="text-gray-600 dark:text-gray-400">
              Next billing date: {currentPeriodEndDate}
            </p>
          )}
          {status === "expired" && (
            <p className="text-gray-600 dark:text-gray-400">
              Subscription ended on {currentPeriodEndDate}
            </p>
          )}
          {status === "canceled" && (
            <p className="text-gray-600 dark:text-gray-400">
              Subscription will end on {currentPeriodEndDate}
            </p>
          )}
          {status !== "active" && (
            <a
              href="/payment"
              className="block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
            >
              Upgrade to Pro
            </a>
          )}
        </div>

        {status === "active" && (
          <button
            onClick={async () => {
              setIsCanceling(true);
              const result = await cancelMembership();
              setIsCanceling(false);
              if (result.success) {
                alert(
                  "Your membership will be canceled at the end of the current period.",
                );
              } else {
                alert(`Failed to cancel membership: ${result.error}`);
              }
            }}
            disabled={isCanceling}
            className="text-blue-600 dark:text-blue-400 hover:underline mb-4"
          >
            {isCanceling ? "Canceling..." : "Cancel Membership"}
          </button>
        )}

        <div className="mt-auto flex flex-col sm:flex-row sm:justify-end">
          <button
            onClick={logout}
            className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 font-medium py-3 px-4 rounded-md shadow-md focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPageClient;

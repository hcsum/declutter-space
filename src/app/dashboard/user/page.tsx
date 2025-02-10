import { logout } from "@/actions/auth";
import { getUserInfo } from "@/actions/user";

const UserPage = async () => {
  const { membership, name } = await getUserInfo();
  const { status, currentPeriodEnd } = membership;

  const statusColors = {
    active: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100",
    canceled:
      "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100",
    expired: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100",
    free_trial: "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100",
  };

  const statusText = {
    active: "Active",
    canceled: "Canceled",
    expired: "Expired",
    free_trial: "Free Trial",
  };

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
            className={`inline-block ${statusColors[status]} px-4 py-2 rounded-full text-sm font-medium shadow-md`}
          >
            {statusText[status]}
          </div>
          {status === "active" && (
            <p className="text-gray-600 dark:text-gray-400">
              Next billing date: {currentPeriodEnd?.toLocaleDateString()}
            </p>
          )}
          {status === "expired" && (
            <p className="text-gray-600 dark:text-gray-400">
              Subscription ended on {currentPeriodEnd?.toLocaleDateString()}
            </p>
          )}
          {status === "canceled" && (
            <p className="text-gray-600 dark:text-gray-400">
              Subscription will end on {currentPeriodEnd?.toLocaleDateString()}
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

        <form action={logout}>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white font-medium py-3 px-4 rounded-md shadow-md focus:outline-none focus:ring-4 focus:ring-red-300 transition-colors"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserPage;

import { logout } from "@/actions/auth";

const UserPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 md:p-8">
      <div className="max-w-2xl md:mx-auto bg-white dark:bg-gray-800 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          User Profile
        </h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Account Information
          </h2>
          {/* Add user information from your session/auth system */}
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Subscription Status
          </h2>
          <div className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm font-medium">
            {/* Add subscription status from your database */}
            Free Trial
          </div>
        </div>

        <form action={logout}>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserPage;

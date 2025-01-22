import { logout } from "@/actions/auth";

const UserPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 md:p-8">
      <div className="max-w-2xl md:mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          User Profile
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Account Information
          </h2>
          {/* Add user information from your session/auth system */}
          <p className="text-gray-600 dark:text-gray-400">Username: John Doe</p>
          <p className="text-gray-600 dark:text-gray-400">
            Email: johndoe@example.com
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Subscription Status
          </h2>
          <div className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-4 py-2 rounded-full text-sm font-medium shadow-md">
            {/* Add subscription status from your database */}
            Free Trial
          </div>
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

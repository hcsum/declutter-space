"use client";

const UserPageLoading = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 md:p-8">
      <div className="max-w-2xl md:mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 animate-pulse">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>

        <div className="mb-8">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-full w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
        </div>

        <div className="mt-auto flex flex-col sm:flex-row sm:justify-end">
          <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4"></div>
          <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg w-full sm:w-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default UserPageLoading;

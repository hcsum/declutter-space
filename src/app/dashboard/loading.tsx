const Loading = () => {
  return (
    <div className="flex justify-center p-6 w-full min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="w-full md:w-full lg:max-w-[70%] mt-4 md:mt-8">
        {/* AddItemForm skeleton */}
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded-lg mb-6"></div>

        {/* ImageUploadBox skeleton */}
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded-lg"></div>

        {/* Title section */}
        <div className="flex justify-between items-center mb-6 mt-12">
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-32 rounded"></div>
        </div>

        {/* Table skeleton */}
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-16 bg-gray-200 dark:bg-gray-700 rounded"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;

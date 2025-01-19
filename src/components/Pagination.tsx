const Pagination = ({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  return (
    <div className="mt-4 flex justify-center items-center">
      <a
        href={currentPage > 1 ? `?page=${currentPage - 1}` : "#"}
        className={`flex items-center px-4 py-2 mx-1 text-gray-500 bg-white rounded-md ${
          currentPage <= 1
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-blue-600 hover:text-white"
        } dark:bg-gray-800 dark:text-gray-600`}
      >
        Previous
      </a>

      {[...Array(totalPages)].map((_, i) => (
        <a
          key={i + 1}
          href={`?page=${i + 1}`}
          className={`items-center hidden px-4 py-2 mx-1 transition-colors duration-300 transform bg-white rounded-md sm:flex dark:bg-gray-800 dark:text-gray-200 ${
            currentPage === i + 1
              ? "bg-blue-600 text-white"
              : "hover:bg-blue-600 hover:text-white"
          }`}
        >
          {i + 1}
        </a>
      ))}

      <a
        href={currentPage < totalPages ? `?page=${currentPage + 1}` : "#"}
        className={`items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:flex dark:bg-gray-800 dark:text-gray-200 ${
          currentPage >= totalPages
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-blue-600 hover:text-white"
        }`}
      >
        Next
      </a>
    </div>
  );
};

export default Pagination;

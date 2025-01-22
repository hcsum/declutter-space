import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Pagination = ({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  const searchParams = useSearchParams();

  const getPageUrl = (pageNum: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNum.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="mt-10 flex justify-center items-center">
      <Link
        href={currentPage > 1 ? getPageUrl(currentPage - 1) : "#"}
        className={`flex items-center px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md ${
          currentPage <= 1
            ? "cursor-not-allowed opacity-50 text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-600"
            : "text-gray-700 bg-white hover:bg-blue-600 hover:text-white dark:bg-gray-800 dark:text-gray-200"
        }`}
      >
        Previous
      </Link>

      {totalPages > 7 ? (
        <>
          {[...Array(Math.min(3, totalPages))].map((_, i) => (
            <Link
              key={i + 1}
              href={getPageUrl(i + 1)}
              className={`items-center hidden px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:flex ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white dark:bg-blue-600 dark:text-white"
                  : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white dark:bg-gray-800 dark:text-gray-200"
              }`}
            >
              {i + 1}
            </Link>
          ))}
          <span className="px-4 py-2 mx-1 text-gray-700 dark:text-gray-200">
            ...
          </span>
          {[...Array(3)].map((_, i) => (
            <Link
              key={totalPages - 2 + i}
              href={getPageUrl(totalPages - 2 + i)}
              className={`items-center hidden px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:flex ${
                currentPage === totalPages - 2 + i
                  ? "bg-blue-600 text-white dark:bg-blue-600 dark:text-white"
                  : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white dark:bg-gray-800 dark:text-gray-200"
              }`}
            >
              {totalPages - 2 + i}
            </Link>
          ))}
        </>
      ) : (
        [...Array(totalPages)].map((_, i) => (
          <Link
            key={i + 1}
            href={getPageUrl(i + 1)}
            className={`items-center hidden px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:flex ${
              currentPage === i + 1
                ? "bg-blue-600 text-white dark:bg-blue-600 dark:text-white"
                : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white dark:bg-gray-800 dark:text-gray-200"
            }`}
          >
            {i + 1}
          </Link>
        ))
      )}

      <Link
        href={currentPage < totalPages ? getPageUrl(currentPage + 1) : "#"}
        className={`items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:flex dark:bg-gray-800 dark:text-gray-200 ${
          currentPage >= totalPages
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-blue-600 hover:text-white"
        }`}
      >
        Next
      </Link>
    </div>
  );
};

export default Pagination;

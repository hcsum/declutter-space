import { getItems } from "@/actions/items";
import AddItemForm from "@/components/AddItemForm";
import ImageUploadBox from "@/components/ImageUploadBox";
import Pagination from "@/components/Pagination";

const getRelativeTimeString = (deadline: Date) => {
  const now = new Date();
  const diffTime = deadline.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Past due";
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? "day" : "days"}`;
  const weeks = Math.floor(diffDays / 7);
  if (diffDays < 30) return `${weeks} ${weeks === 1 ? "week" : "weeks"}`;
  const months = Math.floor(diffDays / 30);
  if (diffDays < 365) return `${months} ${months === 1 ? "month" : "months"}`;
  const years = Math.floor(diffDays / 365);
  return `${years} ${years === 1 ? "year" : "years"}`;
};

const Dashboard = async ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  const currentPage = Number(searchParams.page) || 1;
  const { items, totalPages, currentPage: page } = await getItems(currentPage);

  // const filteredItems =
  //   items?.filter((item) =>
  //     item.name.toLowerCase().includes(search.toLowerCase()),
  //   ) ?? [];

  return (
    <div className="flex justify-center p-6 w-full min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="w-full md:w-full lg:max-w-[70%] mt-4 md:mt-8">
        <AddItemForm />
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <ImageUploadBox />

        <div className="flex justify-between items-center mb-6 mt-12">
          <h2 className="text-2xl font-bold">Your Items</h2>
        </div>

        {/* <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
          <input
            type="text"
            placeholder="Search items"
            className="border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-md flex-1 md:max-w-lg mb-4 md:mb-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div> */}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 text-left text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-200 dark:border-gray-700 px-2 py-2 md:px-4">
                  Name
                </th>
                <th className="border border-gray-200 dark:border-gray-700 px-2 py-2 md:px-4 whitespace-nowrap">
                  Pieces
                </th>
                <th className="border border-gray-200 dark:border-gray-700 px-2 py-2 md:px-4 whitespace-nowrap">
                  Deadline
                </th>
                {/* <th className="border border-gray-200 dark:border-gray-700 px-2 py-2 md:px-4 whitespace-nowrap">
                  Future Plan
                </th> */}
                <th className="border border-gray-200 dark:border-gray-700 px-2 py-2 md:px-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="border border-gray-200 dark:border-gray-700 px-2 py-2 md:px-4">
                    {item.name}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-2 py-2 md:px-4">
                    {item.pieces}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-2 py-2 md:px-4">
                    {`in ${getRelativeTimeString(item.deadline)}`}
                  </td>
                  {/* <td className="border border-gray-200 dark:border-gray-700 px-2 py-2 md:px-4">
                    {item.plan}
                  </td> */}
                  <td className="border border-gray-200 dark:border-gray-700 px-2 py-2 md:px-4">
                    <button className="text-blue-500 dark:text-blue-400 hover:underline">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination currentPage={page} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Dashboard;

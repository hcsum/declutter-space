import { getItems } from "@/actions/items";
import AddItemForm from "@/components/AddItemForm";
import ImageUploadBox from "@/components/ImageUploadBox";

const Dashboard = async () => {
  const items = await getItems();

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
                <th className="border border-gray-200 dark:border-gray-700 px-2 py-2 md:px-4 whitespace-nowrap">
                  Future Plan
                </th>
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
                    {item.deadline.toLocaleDateString()}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-2 py-2 md:px-4">
                    {item.plan}
                  </td>
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

        {/* Pagination */}
        <div className="mt-4 flex justify-center items-center">
          <a
            href="#"
            className="flex items-center px-4 py-2 mx-1 text-gray-500 bg-white rounded-md cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
          >
            Previous
          </a>
          <a
            href="#"
            className="items-center hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:flex dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
          >
            1
          </a>
          <a
            href="#"
            className="items-center hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:flex dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
          >
            Next
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

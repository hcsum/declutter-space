import { getItems } from "@/actions/items";
import AddItemForm from "@/components/AddItemForm";
import ImageUploadBox from "@/components/ImageUploadBox";
import ItemTable from "@/components/ItemTable";

const Dashboard = async ({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) => {
  const { page = "1", search = "" } = await searchParams;
  const currentPage = Number(page);
  const { items, totalPages } = await getItems(currentPage, 10, search);

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

        <ItemTable
          items={items}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Dashboard;

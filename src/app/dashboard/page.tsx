import { getItems } from "@/actions/items";
import { getCategories } from "@/actions/category";
import ItemTable from "@/components/ItemTable";
import CategoryPanel from "@/components/CategoryPanel";
import AddItemPanel from "@/components/AddItemPanel";
import { getUserInfo } from "@/actions/user";
import NotVerified from "./user/notVerified";

const Dashboard = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) => {
  const { page = "1", search = "" } = await searchParams;
  const currentPage = Number(page);
  const { items, totalPages, total } = await getItems(currentPage, 10, search);
  const categories = await getCategories();
  const userInfo = await getUserInfo({ isVerified: true });

  if (!userInfo.isVerified) {
    return <NotVerified />;
  }

  return (
    <div className="flex justify-center px-6 w-full min-h-[80vh] bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="w-full lg:max-w-[90%] mt-4 md:mt-8">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Left column - Table */}
          <div className="lg:w-2/3 order-2 lg:order-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Items ({total} items)</h2>
            </div>
            <ItemTable
              items={items}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          </div>

          {/* Right column - Forms */}
          <div className="lg:w-1/3 order-1 lg:order-2 mb-8 lg:mb-0">
            <AddItemPanel itemCount={items.length} />
            <CategoryPanel categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

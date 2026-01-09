import { getItems } from "@/actions/items";
import ItemTable from "@/components/ItemTable";
import QuickAddItem from "@/components/QuickAddItem";
import { getUserInfo } from "@/actions/user";
import NotVerified from "./user/notVerified";
import "./styles.css";

const Dashboard = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) => {
  const { page = "1", search = "" } = await searchParams;
  const currentPage = Number(page);
  const { items, totalPages } = await getItems(currentPage, 10, search);
  const userInfo = await getUserInfo();

  if (!userInfo.isVerified) {
    return <NotVerified />;
  }

  return (
    <div className="flex justify-center px-6 w-full pb-12 min-h-[120vh] bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="w-full lg:w-2/3 mt-4 md:mt-8">
        <QuickAddItem />
        <h2 className="text-2xl">
          You can take a second look later, we will remind you via email.
        </h2>
        <p className="mb-10 text-lg">
          If by the time you receive the email reminder, and you still
          haven&apos;t use it or it hasn&apos;t brought value into your life,
          maybe it is time to let go
        </p>
        <ItemTable
          items={items}
          totalPages={totalPages}
          currentPage={currentPage}
          search={search}
        />
      </div>
    </div>
  );
};

export default Dashboard;

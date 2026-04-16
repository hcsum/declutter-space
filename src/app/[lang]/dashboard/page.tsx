import { getItems } from "@/actions/items";
import ItemTable from "@/components/ItemTable";
import QuickAddItem from "@/components/QuickAddItem";
import { getUserInfo } from "@/actions/user";
import NotVerified from "./user/notVerified";
import getDictionary from "@/i18n/getDictionary";
import { isValidLocale, defaultLocale } from "@/i18n/config";
import "./styles.css";

const Dashboard = async ({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ page?: string; search?: string }>;
}) => {
  const { lang } = await params;
  const { page = "1", search = "" } = await searchParams;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(locale);
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
        <h2 className="text-2xl">{dict.dashboard.secondLookTitle}</h2>
        <p className="mb-10 text-lg">{dict.dashboard.secondLookSubtitle}</p>
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

import { getUserInfo } from "@/actions/user";
import UserPageClient from "./UserPageClient";

const UserPage = async () => {
  const { membership, name } = await getUserInfo();

  return <UserPageClient membership={membership} name={name} />;
};

export default UserPage;

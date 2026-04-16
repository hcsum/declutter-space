import { getUserInfo } from "@/actions/user";
import UserPageClient from "./UserPageClient";
import {
  createStripePortalSession,
  createStripeSession,
} from "@/actions/membership";

const UserPage = async () => {
  const { membership, name } = await getUserInfo();
  const stripeSession = await createStripeSession();
  const portalSession = await createStripePortalSession();

  return (
    <UserPageClient
      membership={membership}
      name={name}
      stripeUrl={stripeSession.url}
      stripePortalUrl={portalSession.url}
    />
  );
};

export default UserPage;

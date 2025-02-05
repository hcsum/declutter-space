import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// not in use
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};
export default NextAuth(authOptions);

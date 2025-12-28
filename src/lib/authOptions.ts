import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Centralized NextAuth options so both the NextAuth route and any
// server routes (e.g. post-login) can import the same config.
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "google" && profile) {
        const email = (profile as any).email as string | undefined;
        if (email) token.email = email;
        const name = (profile as any).name as string | undefined;
        if (name) token.name = name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.email) session.user = { ...session.user, email: token.email } as any;
      if (token?.name) session.user = { ...session.user, name: token.name } as any;
      return session;
    },
  },
};


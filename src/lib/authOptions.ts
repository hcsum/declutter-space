import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { GoogleProfile } from "next-auth/providers/google";

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
      // When signing in with Google, enrich the JWT with the user's email and name
      if (account?.provider === "google" && profile) {
        const google = profile as GoogleProfile;
        if (typeof google.email === "string") token.email = google.email;
        if (typeof google.name === "string") token.name = google.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Propagate selected fields from the JWT to the session in a type-safe way
      if (session.user) {
        if (typeof token.email === "string") session.user.email = token.email;
        if (typeof token.name === "string") session.user.name = token.name;
      }
      return session;
    },
  },
};

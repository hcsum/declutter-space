import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

// NextAuth is used only for the Google OAuth flow. After successful Google sign-in,
// we redirect to /api/auth/post-login where we create our own app session cookie.
export default NextAuth(authOptions);

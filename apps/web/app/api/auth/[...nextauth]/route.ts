import NextAuth from "next-auth";
// import Github from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
import { authOptions } from "@/config/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

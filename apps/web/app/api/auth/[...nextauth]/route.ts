import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
      },
      async authorize(credentials) {
        if (credentials?.email === "user@test.com")
          return { id: "1", email: credentials.email };
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/signin" },
});

export { handler as GET, handler as POST };

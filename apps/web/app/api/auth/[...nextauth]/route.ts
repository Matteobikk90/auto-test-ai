import { prisma } from "@repo/db";
import NextAuth from "next-auth";
// import Github from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          const hashed = await bcrypt.hash(password!, 10);
          return await prisma.user.create({
            data: { email, password: hashed },
          });
        }

        if (!user.password) return null;
        const ok = await bcrypt.compare(password!, user.password);

        if (!ok) return null;

        return user;
      },
    }),
    // Github({
    //   clientId: process.env.AUTH_GITHUB_ID!,
    //   clientSecret: process.env.AUTH_GITHUB_SECRET!,
    // }),
    // Google({
    //   clientId: process.env.AUTH_GOOGLE_ID!,
    //   clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    // }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  pages: { signIn: "/signin" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

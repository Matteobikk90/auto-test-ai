import LogoutButton from "@/components/sign-out";
import { authOptions } from "@/config/auth";
import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  return (
    <main className="p-6 text-xl font-semibold">
      <h1>Welcome to your dashboard</h1>
      <div>{user?.email}</div>
      <LogoutButton />
    </main>
  );
}

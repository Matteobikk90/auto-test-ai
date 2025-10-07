import { prisma } from "@repo/db";

export default async function Dashboard() {
  const user = await prisma.user.findFirst();

  return (
    <main className="p-6 text-xl font-semibold">
      Welcome to your dashboard
      <div>{user?.name ?? "No user added yet"}</div>
    </main>
  );
}

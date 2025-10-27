import LogoutButton from "@/components/sign-out";
import ThemeToggleButton from "@/components/theme-switch";
import { authOptions } from "@/config/auth";
import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function UserPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/signin");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect("/signin");
  }

  return (
    <main className="!grid grid-cols-2">
      <article className="space-y-2">
        <h2 className="text-3xl font-semibold">
          👋 Welcome, {user.name ?? "User"}
        </h2>
        <h3>
          <strong>Email:</strong> {user.email}
        </h3>
        {user.bio && (
          <p>
            <strong>Bio:</strong> {user.bio}
          </p>
        )}
        {user.image && (
          <Image
            src={user.image}
            alt={user.name ?? "Profile"}
            width={120}
            height={120}
            className="rounded-full border"
          />
        )}
      </article>
      <article className="space-y-2 ml-auto flex flex-col">
        <ThemeToggleButton />
        <LogoutButton />
      </article>
    </main>
  );
}

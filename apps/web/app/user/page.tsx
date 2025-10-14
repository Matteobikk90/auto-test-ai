import LogoutButton from "@/components/sign-out";
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
    <main className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold">
        👋 Welcome, {user.name ?? "User"}
      </h1>
      <div className="space-y-2">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        {user.bio && (
          <p>
            <strong>Bio:</strong> {user.bio}
          </p>
        )}
      </div>
      {user.image && (
        <Image
          src={user.image}
          alt={user.name ?? "Profile"}
          width={120}
          height={120}
          className="rounded-full border"
        />
      )}
      <LogoutButton />
    </main>
  );
}

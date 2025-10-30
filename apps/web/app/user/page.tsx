import LogoutButton from "@/components/sign-out";
import ThemeToggleButton from "@/components/theme-switch";
import { authOptions } from "@/config/auth";
import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function UserPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/signin");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) redirect("/signin");

  return (
    <>
      <article className="bg-background rounded-md shadow-lg overflow-hidden w-full max-w-2xl border border-primary">
        {/* Header background */}
        <header className="bg-primary h-20 md:h-28 relative">
          <div className="absolute inset-x-0 w-30 h-30 -bottom-15 md:-bottom-20 flex justify-center md:w-40 md:h-40 bg-background rounded-full border-4 border-background shadow-md left-1/2 -translate-x-1/2 transition-all">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name ?? "Profile"}
                width={96}
                height={96}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center text-foreground text-md">
                {user.name?.[0]?.toUpperCase() ?? "?"}
              </div>
            )}
          </div>
        </header>

        <h2 className="text-center text-xl font-semibold mt-16 md:mt-20 p-4">
          Profile Information
        </h2>

        <div className="space-y-3 text-sm p-4">
          <h3 className="flex justify-between border-b border-border pb-2">
            <span className="text-foreground">Name</span>
            <span className="font-medium">{user.name ?? "—"}</span>
          </h3>

          <h4 className="flex justify-between border-b border-border pb-2">
            <span className="text-foreground">Email</span>
            <span className="font-medium">{user.email}</span>
          </h4>

          {user.bio && (
            <h5 className="flex flex-col justify-between border-b border-border pb-2">
              <span className="text-foreground">Bio</span>
              <p className="font-medium max-w-[60%] text-right">{user.bio}</p>
            </h5>
          )}
        </div>

        <div className="flex justify-between items-center p-4">
          <ThemeToggleButton />
          <LogoutButton />
        </div>
      </article>
    </>
  );
}

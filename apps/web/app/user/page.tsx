import LogoutButton from "@/components/sign-out";
import ThemeToggleButton from "@/components/theme-switch";
import InfoRow from "@/components/user/ProfileInfo";
import { authOptions } from "@/config/auth";
import { prisma } from "@repo/db";
import { ScrollContainer } from "@repo/ui/components/shadcn/scroll-area";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function UserPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/signin");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      Test: { include: { submissions: true } },
    },
  });
  if (!user) redirect("/signin");

  const tests = user.Test || [];
  const submissions = tests.flatMap(({ submissions }) => submissions || []);

  const totalTests = tests.length;
  const passedTests = tests.filter(({ submissions }) =>
    submissions?.some(({ passed }) => passed)
  ).length;
  const totalSubmissions = submissions.length;
  const warnings = user.warnings ?? 0;

  return (
    <section className="flex-1 min-h-0 flex flex-col">
      <article className="bg-background rounded-md shadow-lg w-full max-w-2xl border border-primary mx-auto flex flex-col min-h-0">
        <header className="bg-secondary min-h-20 md:min-h-28 relative max-h-max">
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

        <ScrollContainer className="flex-1 min-h-0">
          <div className="space-y-3 text-sm p-4">
            <InfoRow label="Name" value={user.name ?? "—"} />
            <InfoRow label="Email" value={user.email ?? "-"} />

            {user.bio && <InfoRow label="Bio" value={user.bio} multiline />}

            <InfoRow label="Tests Created" value={String(totalTests)} />
            <InfoRow
              label="Passed Tests"
              value={`${passedTests}/${totalTests}`}
            />
            <InfoRow label="Submissions" value={String(totalSubmissions)} />
            <InfoRow label="Warnings" value={String(warnings)} />
            <InfoRow
              label="Joined"
              value={new Date(user.createdAt).toLocaleDateString()}
            />
          </div>
          <div className="flex justify-between items-center p-4 border-t border-primary">
            <ThemeToggleButton />
            <LogoutButton />
          </div>
        </ScrollContainer>
      </article>
    </section>
  );
}

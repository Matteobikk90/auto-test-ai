import GenerateTest from "@/components/generate-test";
import { authOptions } from "@/config/auth";
import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return (
      <main className="p-6 text-xl font-semibold">
        Unauthorized. <Link href="/signin">Sign in</Link>
      </main>
    );

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { Test: true },
  });

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Welcome to your dashboard</h1>
      <p className="text-foreground">Your generated tests:</p>

      {user?.Test?.length ? (
        <ul className="flex gap-4">
          {user.Test.map(({ id, title, question, language }) => (
            <li key={id} className="border p-4 rounded-md shadow-sm max-w-2xl">
              <div className="flex justify-between gap-2">
                <h3 className="text-xl font-semibold">{title}</h3>
                <h4 className="text-xl font-semibold">{language}</h4>
              </div>
              <p className="text-sm text-foreground">{question}</p>
              <Link
                href={`/test/${id}`}
                className="text-primary text-sm underline mt-2">
                View details
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tests yet.</p>
      )}

      <GenerateTest />
    </main>
  );
}

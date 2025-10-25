"use client";

import GenerateTest from "@/components/generate-test";
import { getTests } from "@/queries/tests";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["tests"],
    queryFn: getTests,
  });

  if (isLoading) return <>Loading...</>;

  return (
    <>
      <h2 className="text-2xl font-semibold">Welcome to your dashboard</h2>
      <p className="text-foreground">Your generated tests:</p>

      {data?.length ? (
        <ul className="flex gap-4">
          {data?.map(({ id, title, question, language }) => (
            <li
              key={id}
              className="border p-4 rounded-md shadow-sm max-w-2xl flex flex-col gap-2">
              <div className="flex justify-between gap-2 items-center">
                <h3 className="text-xl font-semibold">{title}</h3>
                <h4 className="text-xs uppercase">{`{ ${language} }`}</h4>
              </div>
              <p className="text-sm text-foreground">{question}</p>
              <Link
                href={`/test/${id}`}
                className="text-primary text-sm underline block mt-auto">
                View details
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tests yet.</p>
      )}

      <GenerateTest />
    </>
  );
}

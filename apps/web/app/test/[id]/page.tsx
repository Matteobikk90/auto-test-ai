"use client";

import CodeEditor from "@/components/code-editor";
import { queryClient } from "@/config/queryClient";
import { getTests } from "@/queries/tests";
import { useQuery } from "@tanstack/react-query";

import { useParams } from "next/navigation";

export default function TestDetail() {
  const { id } = useParams();

  const { data: tests, isLoading } = useQuery({
    queryKey: ["tests"],
    queryFn: getTests,
    enabled: !queryClient.getQueryData(["tests"]),
  });
  const test = tests?.find((t) => t.id === Number(id));

  if (isLoading) return <>Loading...</>;

  return !test ? (
    <h2 className="p-4">Test not found (try refreshing).</h2>
  ) : (
    <article className="p-4 max-w-2xl space-y-3 mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{test.title}</h2>
        <h3 className="text-xs uppercase">{`{ ${test.language} }`}</h3>
      </div>
      <p className="whitespace-pre-line">{test.question}</p>
      <CodeEditor />
    </article>
  );
}

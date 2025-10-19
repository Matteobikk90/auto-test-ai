"use client";

import CodeEditor from "@/components/code-editor";
import { queryClient } from "@/config/queryClient";
import { getTests, submitTest } from "@/queries/tests";
import { Button } from "@repo/ui/components/shadcn/button";
import { toast } from "@repo/ui/components/shadcn/sonner";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function TestDetail() {
  const { id } = useParams();

  const { data: tests, isLoading } = useQuery({
    queryKey: ["tests"],
    queryFn: getTests,
    enabled: !queryClient.getQueryData(["tests"]),
  });

  const test = tests?.find((t) => t.id === Number(id));

  const { mutateAsync } = useMutation({
    mutationFn: submitTest,
    onSuccess: (data) => {
      toast.success(data?.passed ? "✅ Test passed!" : "❌ Test failed", {
        description: data?.feedback,
      });
    },
    onError: (err) => {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error("Validation failed", { description: msg });
    },
  });

  const form = useForm({
    defaultValues: { code: "// Write your solution here" },
    onSubmit: async ({ value }) => {
      if (!test) return;
      await mutateAsync({ testId: test.id, code: value.code });
    },
  });

  if (isLoading) return <>Loading...</>;
  if (!test) return <h2 className="p-4">Test not found.</h2>;

  return (
    <article className="p-4 max-w-3xl space-y-6 mx-auto">
      <header className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{test.title}</h2>
        <h3 className="text-xs uppercase">{`{ ${test.language} }`}</h3>
      </header>

      <p className="whitespace-pre-line text-sm text-foreground/90">
        {test.question}
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4">
        <form.Field name="code">
          {(field) => (
            <CodeEditor
              value={field.state.value}
              onChange={field.handleChange}
            />
          )}
        </form.Field>

        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              className="w-full"
              disabled={!canSubmit || isSubmitting}>
              {isSubmitting ? "Evaluating..." : "Submit Solution"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </article>
  );
}

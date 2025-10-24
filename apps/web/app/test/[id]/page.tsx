"use client";

import CodeEditor from "@/components/code-editor";
import { queryClient } from "@/config/queryClient";
import { getTests, submitTest } from "@/queries/tests";
import { useStore } from "@/store";
import { Button } from "@repo/ui/components/shadcn/button";
import { toast } from "@repo/ui/components/shadcn/sonner";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

export default function TestDetail() {
  const { id } = useParams();
  const router = useRouter();
  const setModal = useStore(({ setModal }) => setModal);

  const { data: tests, isLoading } = useQuery({
    queryKey: ["tests"],
    queryFn: getTests,
    enabled: !queryClient.getQueryData(["tests"]),
  });

  const test = tests?.find((t) => t.id === Number(id));
  const latestSubmission = test?.submissions?.[0];

  const { mutateAsync, isPending } = useMutation({
    mutationFn: submitTest,
    onSuccess: async (data) => {
      if (data?.blocked) {
        toast.error("🚫 Account locked", { description: data?.feedback });
        const res = await signOut({ redirect: false, callbackUrl: "/" });
        return router.push(res.url);
      }

      if (data?.warning) {
        return toast.warning("⚠️ Warning issued", {
          description: data?.feedback,
        });
      }

      toast.success(data?.passed ? "✅ Test passed!" : "❌ Test failed", {
        description: data?.feedback,
      });
    },
  });

  const form = useForm({
    defaultValues: {
      code: latestSubmission?.code || "// Write your solution here",
    },
    onSubmit: async ({ value }) => {
      if (!test) return;

      setModal("Confirm", () =>
        mutateAsync({ testId: test.id, code: value.code })
      );
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
          if (!latestSubmission?.passed) form.handleSubmit();
        }}
        className="space-y-4">
        <form.Field name="code">
          {(field) => (
            <CodeEditor
              value={field.state.value}
              onChange={field.handleChange}
              readOnly={latestSubmission?.passed}
            />
          )}
        </form.Field>

        {!latestSubmission?.passed && (
          <form.Subscribe selector={(s) => [s.canSubmit, s.isDirty]}>
            {([canSubmit, isDirty]) => (
              <Button
                type="submit"
                className="w-full"
                disabled={!canSubmit || isPending || !isDirty}>
                {isPending ? "Evaluating..." : "Submit Solution"}
              </Button>
            )}
          </form.Subscribe>
        )}

        {latestSubmission?.passed && (
          <p className="text-green-600 text-center text-sm font-medium">
            ✅ This test is passed and locked.
          </p>
        )}
      </form>
    </article>
  );
}

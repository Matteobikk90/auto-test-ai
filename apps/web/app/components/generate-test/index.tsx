"use client";

import { generateTest } from "@/queries/generate-test";
import type { TestType } from "@/types/test";
import { FieldInfo } from "@/utils/form";
import { generateSchema } from "@/validations/generate-test";
import { StarIcon } from "@phosphor-icons/react";
import { Button } from "@repo/ui/components/shadcn/button";
import { Label } from "@repo/ui/components/shadcn/label";
import { toast } from "@repo/ui/components/shadcn/sonner";
import { Textarea } from "@repo/ui/components/shadcn/textarea";
import { cn } from "@repo/ui/lib/utils";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function GenerateTest() {
  const [test, setTest] = useState<TestType | null>(null);
  const [difficulty, setDifficulty] = useState<number>(2);

  const { mutate } = useMutation({
    mutationFn: generateTest,
    onSuccess: (data) => {
      toast.success("Test created successfully");
      form.reset();
      setTest(data);
    },
    onError: (err) => {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error("Generation failed", { description: msg });
    },
  });

  const form = useForm({
    defaultValues: { prompt: "" },
    validators: { onChange: generateSchema },
    onSubmit: ({ value }) => mutate({ ...value, difficulty }),
  });

  return (
    <main className="flex flex-col items-center justify-start p-6 flex-1">
      {test && (
        <article className="mt-8 w-full max-w-2xl space-y-3 border rounded-md p-6 shadow-md">
          <div className="flex justify-between gap-2">
            <h2 className="text-xl font-semibold">{test.title}</h2>
            <h3 className="text-xl font-semibold">{test.language}</h3>
          </div>
          <p className="text-sm whitespace-pre-line">{test.question}</p>
        </article>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="w-full max-w-md !space-y-4 bg-background p-8 rounded-xl shadow-lg border border-border">
        <h1 className="text-2xl font-semibold text-center">Generate a Test</h1>

        <form.Field name="prompt">
          {(field) => (
            <div className="flex flex-col gap-1">
              <Label htmlFor={field.name}>
                Prompt<sup>*</sup>
              </Label>
              <Textarea
                id={field.name}
                name={field.name}
                rows={5}
                placeholder="Describe what kind of coding test to generate..."
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <div className="flex flex-col gap-1">
          <Label>Difficulty</Label>
          <div className="flex justify-center gap-1">
            {[1, 2, 3].map((level) => (
              <StarIcon
                key={level}
                onClick={() => setDifficulty(level)}
                weight={level <= difficulty ? "fill" : "regular"}
                className={cn(
                  level <= difficulty
                    ? "fill-primary text-primary"
                    : "text-foreground",
                  "size-6 cursor-pointer transition"
                )}
              />
            ))}
          </div>
        </div>

        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "Generating..." : "Generate Test"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </main>
  );
}

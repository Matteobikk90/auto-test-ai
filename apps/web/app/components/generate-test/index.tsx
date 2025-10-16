"use client";

import { testDifficulties } from "@/constants/tests";
import { generateTest } from "@/queries/generate-test";
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
  const [difficulty, setDifficulty] = useState(2);

  const { mutateAsync } = useMutation({
    mutationFn: generateTest,
    onSuccess: () => {
      toast.success("Test created successfully");
      form.reset();
    },
    onError: (err) => {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error("Generation failed", { description: msg });
    },
  });

  const form = useForm({
    defaultValues: { prompt: "" },
    validators: { onChange: generateSchema },
    onSubmit: ({ value }) => mutateAsync({ ...value, difficulty }),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}>
      <h2 className="text-2xl font-semibold">Generate a Test</h2>

      <form.Field name="prompt">
        {(field) => (
          <div className="relative flex flex-col gap-1">
            <Label htmlFor={field.name}>
              Prompt<sup>*</sup>
            </Label>

            <div className="relative">
              <Textarea
                id={field.name}
                name={field.name}
                rows={5}
                placeholder="Describe the coding test to generate..."
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="p-4 pr-24 pb-14 w-full resize-none"
              />

              <ul className="absolute top-2 right-3 flex gap-1">
                {testDifficulties.map((level) => (
                  <li key={level}>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setDifficulty(level)}
                      className="p-0 bg-transparent border-0">
                      <StarIcon
                        weight={level <= difficulty ? "fill" : "regular"}
                        className={cn(
                          level <= difficulty
                            ? "fill-primary text-primary"
                            : "text-foreground",
                          "size-5 cursor-pointer transition hover:fill-primary hover:text-primary"
                        )}
                      />
                    </Button>
                  </li>
                ))}
              </ul>

              <form.Subscribe
                selector={({ isSubmitting, isValid, isDirty }) => [
                  isSubmitting,
                  isDirty,
                  isValid,
                ]}>
                {([isSubmitting, isValid, isDirty]) =>
                  isDirty &&
                  isValid && (
                    <Button
                      type="submit"
                      size="sm"
                      disabled={isSubmitting}
                      className="absolute bottom-3 right-3 shadow-md">
                      {isSubmitting ? "..." : "Generate"}
                    </Button>
                  )
                }
              </form.Subscribe>
            </div>

            <FieldInfo field={field} />
          </div>
        )}
      </form.Field>
    </form>
  );
}

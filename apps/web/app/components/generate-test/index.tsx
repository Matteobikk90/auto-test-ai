"use client";

import { PopUpInfo } from "@/components/pop-up-info";
import { queryClient } from "@/config/queryClient";
import { testDifficulties } from "@/constants/tests";
import { generateTest } from "@/queries/generate-test";
import { useStore } from "@/store";
import { FieldInfo } from "@/utils/form";
import { StarIcon } from "@phosphor-icons/react";
import { InfoIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@repo/ui/components/shadcn/button";
import { Label } from "@repo/ui/components/shadcn/label";
import { toast } from "@repo/ui/components/shadcn/sonner";
import { Textarea } from "@repo/ui/components/shadcn/textarea";
import { cn } from "@repo/ui/lib/utils";
import { generateSchema } from "@repo/validations/src/generate-test";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GenerateTest() {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState(2);
  const setModal = useStore(({ setModal }) => setModal);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: generateTest,
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

      toast.success("Test created successfully");
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["tests"] });
    },
    onError: (err) => {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error("Generation failed", { description: msg });
    },
  });

  const form = useForm({
    defaultValues: { prompt: "" },
    validators: { onChange: generateSchema },
    onSubmit: ({ value }) =>
      setModal("Warning", () => {
        mutateAsync({ ...value, difficulty });
      }),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}>
      <div className="flex justify-between gap-4">
        <h2 className="text-2xl font-semibold">Generate a Test</h2>
        <PopUpInfo hoverText="Warning">
          <Button
            type="button"
            variant="outline"
            className="!p-2 border-yellow-700"
            onClick={() => setModal("Info")}>
            <InfoIcon weight="duotone" className="size-5 text-yellow-700" />
          </Button>
        </PopUpInfo>
      </div>

      <form.Field name="prompt">
        {(field) => (
          <header className="relative flex flex-col gap-1 space-y-2">
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
                selector={({ isValid, isDirty }) => [isDirty, isValid]}>
                {([isValid, isDirty]) =>
                  isDirty &&
                  isValid && (
                    <Button
                      type="submit"
                      size="sm"
                      disabled={isPending}
                      className="absolute bottom-3 right-3 shadow-md">
                      {isPending ? "Generating..." : "Generate"}
                    </Button>
                  )
                }
              </form.Subscribe>
            </div>

            <FieldInfo field={field} />
          </header>
        )}
      </form.Field>
    </form>
  );
}

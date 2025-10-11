"use client";

import ImageUpload from "@/components/image-upload";
import { register } from "@/queries/register";
import { FieldInfo } from "@/utils/form";
import { registerSchema } from "@/validations/register";
import { Button } from "@repo/ui/components/shadcn/button";
import { Input } from "@repo/ui/components/shadcn/input";
import { Label } from "@repo/ui/components/shadcn/label";
import { Textarea } from "@repo/ui/components/shadcn/textarea";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: register,
    onSuccess: () => router.push("/signin"),
  });

  const form = useForm({
    validators: {
      onChange: registerSchema,
    },
    defaultValues: {
      name: "",
      email: "",
      password: "",
      bio: "",
      image: "",
    },
    onSubmit: ({ value }) => mutate(value),
  });

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="w-full max-w-md space-y-6 bg-background p-8 rounded-xl shadow-lg border border-border">
        <h1 className="text-2xl font-semibold text-center">Create Account</h1>

        <form.Field name="name">
          {(field) => (
            <div className="flex flex-col gap-1">
              <Label htmlFor={field.name}>Name</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <div className="flex flex-col gap-1">
              <Label htmlFor={field.name}>Email</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <div className="flex flex-col gap-1">
              <Label htmlFor={field.name}>Password</Label>
              <Input
                id={field.name}
                name={field.name}
                type="password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name="bio">
          {(field) => (
            <div className="flex flex-col gap-1">
              <Label htmlFor={field.name}>Bio</Label>
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name="image">
          {(field) => (
            <div className="flex flex-col gap-1">
              <Label>Profile image</Label>
              <ImageUpload onUpload={(url) => field.handleChange(url)} />
              {field.state.value && (
                <Image
                  src={field.state.value}
                  alt="Uploaded"
                  width={100}
                  height={100}
                  className="rounded-md mt-2"
                />
              )}
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" className="w-full" disabled={!canSubmit}>
              {isSubmitting ? "Creating..." : "Register"}
            </Button>
          )}
        </form.Subscribe>

        <p className="text-sm text-center mt-2">
          Already have an account?{" "}
          <Link href="/signin" className="text-primary underline">
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}

"use client";
import { FieldInfo } from "@/utils/form";
import { signInSchema } from "@/validations/signin";
import { Button } from "@repo/ui/components/shadcn/button";
import { Input } from "@repo/ui/components/shadcn/input";
import { Label } from "@repo/ui/components/shadcn/label";
import { useForm } from "@tanstack/react-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  const form = useForm({
    validators: {
      onChange: signInSchema,
    },
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const result = await signIn("credentials", {
        redirect: false,
        email: value.email,
        password: value.password,
      });

      if (result?.ok) router.push("/dashboard");
      else alert("Invalid credentials");
    },
  });

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="w-full max-w-md space-y-6 bg-background p-8 rounded-xl shadow-lg border border-border">
        <h1 className="text-2xl font-semibold text-center">Sign in</h1>

        <form.Field name="email">
          {(field) => (
            <>
              <Label htmlFor={field.name}>Email</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="you@example.com"
              />
              <FieldInfo field={field} />
            </>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <>
              <Label htmlFor={field.name}>Password</Label>
              <Input
                id={field.name}
                name={field.name}
                type="password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="••••••••"
              />
              <FieldInfo field={field} />
            </>
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" className="w-full" disabled={!canSubmit}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          )}
        </form.Subscribe>

        <p className="text-sm text-center mt-2">
          Don’t have an account?{" "}
          <Link href="/register" className="text-primary underline">
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}

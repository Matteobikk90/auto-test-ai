"use client";
import { FieldInfo } from "@/utils/form";
import { Button } from "@repo/ui/components/shadcn/button";
import { Input } from "@repo/ui/components/shadcn/input";
import { Label } from "@repo/ui/components/shadcn/label";
import { toast } from "@repo/ui/components/shadcn/sonner";
import { signInSchema } from "@repo/validations/signin";
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

      if (result?.ok) {
        toast.success("Signed in", { duration: 2000 });
        router.push("/dashboard");
      } else {
        toast.error("Sign-in failed", {
          description: result?.error || "Invalid credentials",
          duration: 2500,
        });
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}>
      <h2 className="text-2xl font-semibold text-center">Sign in</h2>

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
              placeholder="you@example.com"
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
              placeholder="••••••••"
            />
            <FieldInfo field={field} />
          </div>
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
  );
}

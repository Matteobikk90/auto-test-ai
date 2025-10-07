"use client";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <main className="flex flex-col items-center p-6">
      <h1 className="text-xl font-bold mb-4">Sign in</h1>
      <button
        className="border p-2"
        onClick={() =>
          signIn("credentials", {
            email: "user@test.com",
            callbackUrl: "/dashboard",
          })
        }>
        Sign in as demo user
      </button>
    </main>
  );
}

"use client";
import { useStore } from "@/store";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useShallow } from "zustand/shallow";

export default function SignIn() {
  const { email, password, setField } = useStore(
    useShallow(({ email, password, setField }) => ({
      email,
      password,
      setField,
    }))
  );

  return (
    <main className="flex flex-col items-center p-6">
      <h1>Sign in</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await signIn("credentials", {
            email,
            password,
            callbackUrl: "/dashboard",
          });
        }}>
        <input
          required
          value={email}
          onChange={({ target }) => setField("email", target.value)}
          placeholder="Email"
        />
        <input
          required
          type="password"
          value={password}
          onChange={({ target }) => setField("password", target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign in</button>
      </form>

      <hr />

      {/* <button onClick={() => signIn("github")}>Sign in with GitHub</button>
      <button onClick={() => signIn("google")}>Sign in with Google</button> */}
      <p className="text-sm mt-3">
        Don’t have an account?{" "}
        <Link href="/register" className="underline text-blue-600">
          Sign up
        </Link>
      </p>
    </main>
  );
}

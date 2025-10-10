"use client";
import ImageUpload from "@/components/image-upload";
import { register } from "@/queries/register";
import { useStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/shallow";

export default function Register() {
  const router = useRouter();
  const { email, password, name, bio, image, setField, resetAuthForm } =
    useStore(
      useShallow(
        ({ email, password, name, bio, image, setField, resetAuthForm }) => ({
          email,
          password,
          name,
          bio,
          image,
          setField,
          resetAuthForm,
        })
      )
    );

  const { mutate } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      resetAuthForm();
      router.push("/signin");
    },
    onError: (error: Error) => {},
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutate({
      email,
      password,
      name,
      bio,
      image,
    });
  }

  return (
    <main className="flex flex-col items-center p-6">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          required
          value={name}
          onChange={({ target }) => setField("name", target.value)}
          placeholder="Name"
        />
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
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={({ target }) => setField("bio", target.value)}
        />

        <ImageUpload onUpload={(url) => setField("image", url)} />

        {image && (
          <Image src={image} alt="Uploaded image" width="120" height="120" />
        )}

        <button type="submit">Register</button>
      </form>

      <p className="text-sm mt-3">
        Already have an account?{" "}
        <Link href="/signin" className="underline text-blue-600">
          Sign in
        </Link>
      </p>
    </main>
  );
}

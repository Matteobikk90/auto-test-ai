"use client";
import ImageUpload from "@/components/imageUpload";
import Image from "next/image";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    image: "",
  });
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) setMessage("✅ Account created. You can sign in now.");
    else setMessage(data.error || "Registration failed");
  }

  return (
    <main className="flex flex-col items-center p-6">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
        />
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
        />
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
        />
        <textarea
          placeholder="Bio"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />

        <ImageUpload
          onUpload={(url) => setForm((prev) => ({ ...prev, image: url }))}
        />

        {form.image && (
          <Image
            src={form.image}
            alt="Uploaded image"
            width="120"
            height="120"
          />
        )}

        <button type="submit">Register</button>
      </form>

      <p>{message}</p>
    </main>
  );
}

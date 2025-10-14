"use client";
import { SignInIcon, UserIcon } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function UserLink() {
  const { data: session } = useSession();
  const href = session ? "/user" : "/signin";

  return (
    <Link
      href={href}
      className="flex items-center gap-2 border rounded-md p-1.5">
      {session ? (
        <UserIcon weight="duotone" className="size-5" />
      ) : (
        <SignInIcon weight="duotone" className="size-5" />
      )}
    </Link>
  );
}

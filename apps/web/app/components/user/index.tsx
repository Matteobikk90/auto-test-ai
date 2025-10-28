"use client";
import { BookOpenTextIcon, SignInIcon, UserIcon } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function UserLink() {
  const { data: session } = useSession();
  const href = session ? "/user" : "/signin";

  return (
    <div className="flex gap-2">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 border rounded-md p-2 size-9">
        <BookOpenTextIcon weight="duotone" className="size-5" />
      </Link>
      <Link
        href={href}
        className="flex items-center gap-2 border rounded-md p-2 size-9">
        {session ? (
          <UserIcon weight="duotone" className="size-5" />
        ) : (
          <SignInIcon weight="duotone" className="size-5" />
        )}
      </Link>
    </div>
  );
}

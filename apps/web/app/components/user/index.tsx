"use client";
import { PopUpInfo } from "@/components/pop-up-info";
import { BookOpenTextIcon, SignInIcon, UserIcon } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function UserLink() {
  const { data: session } = useSession();
  const href = session ? "/user" : "/signin";

  return (
    <div className="flex gap-2">
      <PopUpInfo hoverText="Dashboard" position="bottom">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 border rounded-md p-2 size-9">
          <BookOpenTextIcon weight="duotone" className="size-5" />
        </Link>
      </PopUpInfo>

      <Link
        href={href}
        className="flex items-center gap-2 border rounded-md p-2 size-9">
        {session ? (
          <PopUpInfo hoverText="User" position="bottom">
            <UserIcon weight="duotone" className="size-5" />
          </PopUpInfo>
        ) : (
          <PopUpInfo hoverText="Login" position="bottom">
            <SignInIcon weight="duotone" className="size-5" />
          </PopUpInfo>
        )}
      </Link>
    </div>
  );
}

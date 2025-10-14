"use client";
import { Button } from "@repo/ui/components/shadcn/button";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <Button onClick={() => signOut({ callbackUrl: "/signin" })}>
      Sign Out
    </Button>
  );
}

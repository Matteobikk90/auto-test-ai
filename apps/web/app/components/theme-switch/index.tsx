"use client";

import { useStore } from "@/store";
import {
  JoystickIcon,
  MoonIcon,
  SunIcon,
  TextAaIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { Button } from "@repo/ui/components/shadcn/button";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export default function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { font, toggleFont } = useStore(
    useShallow(({ font, toggleFont }) => ({ font, toggleFont }))
  );

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";
  const isRetro = font === "retro";

  return (
    <div className="flex items-center gap-2">
      <Button
        size="icon"
        variant="outline"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label="toggle-theme">
        {isDark ? (
          <SunIcon className="size-5" weight="duotone" />
        ) : (
          <MoonIcon className="size-5" weight="duotone" />
        )}
      </Button>

      <Button
        size="icon"
        variant="outline"
        onClick={toggleFont}
        aria-label="toggle-font">
        {isRetro ? (
          <TextAaIcon className="size-5" weight={"duotone"} />
        ) : (
          <JoystickIcon className="size-5" weight="duotone" />
        )}
      </Button>
      <Link
        href="/user"
        className="flex items-center gap-4 p-1.5 rounded-md border">
        <UserIcon weight="duotone" className="size-5" />
      </Link>
    </div>
  );
}

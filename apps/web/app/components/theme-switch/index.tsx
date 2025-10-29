"use client";

import { useStore } from "@/store";
import { MoonIcon, SunIcon, TextAaIcon } from "@phosphor-icons/react";
import { Button } from "@repo/ui/components/shadcn/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { PopUpInfo } from "../pop-up-info";

export default function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { toggleFont } = useStore(
    useShallow(({ font, toggleFont }) => ({ font, toggleFont }))
  );

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex items-center gap-2">
      <PopUpInfo hoverText="Toggle theme">
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
      </PopUpInfo>
      <PopUpInfo hoverText="Toggle font" align="left">
        <Button
          size="icon"
          variant="outline"
          onClick={toggleFont}
          aria-label="toggle-font">
          <TextAaIcon className="size-5" weight={"duotone"} />
        </Button>
      </PopUpInfo>
    </div>
  );
}

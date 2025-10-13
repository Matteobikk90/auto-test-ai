import ThemeToggleButton from "@/components/theme-switch";
import { RobotIcon } from "@phosphor-icons/react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-border/20 backdrop-blur-md flex md:grid grid-cols-2 md:place-items-center justify-between p-4">
      <Link href="/" className="flex items-center gap-4">
        <RobotIcon weight="duotone" className="size-6 text-primary" />
        <div>
          <h1 className="text-lg">Auto Test AI</h1>

          <h2>Evaluate your code smartly</h2>
        </div>
      </Link>

      <ThemeToggleButton />
    </header>
  );
}

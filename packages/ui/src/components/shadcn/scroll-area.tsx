import * as ScrollArea from "@radix-ui/react-scroll-area";
import type { ScrollContainerTypes } from "@repo/types/scroll-container";
import { cn } from "@repo/ui/lib/utils";

export const ScrollContainer = ({
  children,
  className,
  type = "auto",
  backgroundColor = "bg-secondary",
  isFromFilters = false,
}: ScrollContainerTypes) => (
  <ScrollArea.Root
    type={type}
    className={cn("relative w-full flex", className)}>
    <ScrollArea.Viewport className="w-full">{children}</ScrollArea.Viewport>

    <ScrollArea.Scrollbar
      orientation="vertical"
      className={cn(
        isFromFilters ? "!right-0" : "!-right-2",
        "w-2 !relative bg-secondary/10 rounded-full"
      )}>
      <ScrollArea.Thumb className={cn(backgroundColor, "rounded-full")} />
    </ScrollArea.Scrollbar>
  </ScrollArea.Root>
);

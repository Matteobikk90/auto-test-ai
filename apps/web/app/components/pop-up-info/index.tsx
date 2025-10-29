import { type PopUpInfoType } from "@repo/types/src/pop-up";
import { cn } from "@repo/ui/lib/utils";

const commonClasses =
  "absolute z-12 rounded-md text-xs p-2 bg-foreground text-background shadow-elevation text-center";

const alignClasses = {
  center: "left-1/2 transform -translate-x-1/2",
  left: "right-0",
  right: "left-0",
};

export const PopUpInfo = ({
  children,
  hoverText,
  position = "top",
  align = "center",
  className,
  wrapText = false,
}: PopUpInfoType) => {
  const positionClasses =
    position === "top" ? "bottom-full mb-2" : "top-full mt-2";

  return (
    <div className={cn("relative flex items-center group/actions", className)}>
      {children}

      {hoverText && (
        <div
          className={cn(
            "hidden group-hover/actions:block",
            commonClasses,
            positionClasses,
            alignClasses[align],
            wrapText
              ? "max-w-[16.4rem] w-max whitespace-pre-line"
              : "whitespace-nowrap"
          )}>
          {hoverText}
        </div>
      )}
    </div>
  );
};

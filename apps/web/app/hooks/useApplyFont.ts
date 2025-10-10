"use client";

import { useStore } from "@/store";
import { useEffect } from "react";

export function useApplyFont() {
  const font = useStore(({ font }) => font);

  useEffect(() => {
    document.documentElement.dataset.font = font;
  }, [font]);
}

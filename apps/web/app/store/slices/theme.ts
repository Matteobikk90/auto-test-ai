import type { ThemeSliceType } from "@repo/types/store/theme";
import type { StateCreator } from "zustand";

const createThemeSlice: StateCreator<ThemeSliceType> = (set) => ({
  theme: "light",
  font: "retro",
  toggleTheme: () =>
    set(({ theme }) => ({
      theme: theme === "light" ? "dark" : "light",
    })),
  toggleFont: () =>
    set(({ font }) => ({
      font: font === "retro" ? "modern" : "retro",
    })),
});

export default createThemeSlice;

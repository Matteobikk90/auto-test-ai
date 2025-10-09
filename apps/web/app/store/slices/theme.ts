import type { ThemeSliceType } from "@/types/store/theme";
import type { StateCreator } from "zustand";

const createThemeSlice: StateCreator<ThemeSliceType> = (set) => ({
  theme: "light",
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
});

export default createThemeSlice;

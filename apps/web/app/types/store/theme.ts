export interface ThemeSliceType {
  theme: "light" | "dark";
  font: "retro" | "modern";
  toggleTheme: () => void;
  toggleFont: () => void;
}

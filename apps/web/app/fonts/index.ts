import { Bitcount, JetBrains_Mono } from "next/font/google";

export const retro = Bitcount({
  subsets: ["latin"],
  variable: "--font-retro",
});

export const modern = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-modern",
  weight: ["400"],
});

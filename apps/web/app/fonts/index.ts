import { Bitcount, Lacquer } from "next/font/google";

export const retro = Bitcount({
  subsets: ["latin"],
  variable: "--font-retro",
});

export const modern = Lacquer({
  subsets: ["latin"],
  variable: "--font-modern",
  weight: ["400"],
});

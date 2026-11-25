import { cn } from "cn";
import { Inter, Noto_Sans_Arabic } from "next/font/google";

const fontLatin = Inter({
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap",
});

const fontArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

/** Classes for `<html>`: Inter for Latin, Noto Sans Arabic for Persian and Arabic. */
export const fontVariables = cn(fontLatin.variable, fontArabic.variable);

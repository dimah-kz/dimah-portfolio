import { cn } from "cn";
import { Inter, Vazirmatn } from "next/font/google";

/** Latin script: English, and Latin words inside Persian text. */
const fontLatin = Inter({
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap",
});

/**
 * Arabic script: Persian (and Arabic). Vazirmatn is drawn for Persian, with
 * Persian digits and letter forms. The stack in `global.css` puts Inter first,
 * so each script gets its own font by `unicode-range`.
 */
const fontArabic = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

/** Classes for `<html>`. Both fonts are variable: any weight from 100 to 900. */
export const fontVariables = cn(fontLatin.variable, fontArabic.variable);

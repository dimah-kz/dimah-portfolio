import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./locales";

/**
 * The `[locale]` param of a page or layout, checked. A segment that is not a
 * language (such as `/missing.png`, which also matches `[locale]`) is a 404.
 */
export async function localeParam(
  params: Promise<{ locale: string }>,
): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}

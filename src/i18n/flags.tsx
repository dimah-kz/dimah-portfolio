import { type FlagComponent, IR, US } from "country-flag-icons/react/3x2";
import type { Locale } from "./locales";

/**
 * The flag the language switcher shows for each language. Any country from
 * `country-flag-icons/react/3x2` works. Kept apart from `locales.ts`, so the
 * proxy does not bundle SVGs.
 */
export const flags: Record<Locale, FlagComponent> = {
  en: US,
  fa: IR,
};

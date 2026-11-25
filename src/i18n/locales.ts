/**
 * The languages of the site. This file is the list; everything else reads it.
 *
 * The default language has no URL prefix (`/projects`); every other language
 * has its code in front (`/fa/projects`). Each language is its own set of
 * pages, with its own `hreflang`, sitemap entries, feed, share images, and
 * `llms.txt`.
 *
 * To add a language:
 *   1. Add it below.
 *   2. Add `messages/<code>.json` and a line for it in `src/i18n/messages.ts`.
 *   3. Add its copy to `copy` in `src/lib/site.ts`.
 *   4. Add its flag in `src/i18n/flags.tsx`.
 *   5. Optionally, translate content: `<name>.<code>.mdx` next to a file in `content/`.
 * TypeScript points at any step that is missing. To remove a language, undo
 * the same steps.
 */
export const localeConfig = {
  en: {
    /** The language's own name, as the switcher shows it. */
    label: "English",
    /** Short form for the switcher button. */
    short: "EN",
    dir: "ltr",
    /** Open Graph locale. */
    ogLocale: "en_US",
  },
  fa: {
    label: "فارسی",
    short: "FA",
    dir: "rtl",
    ogLocale: "fa_IR",
  },
} as const satisfies Record<
  string,
  { label: string; short: string; dir: "ltr" | "rtl"; ogLocale: string }
>;

export type Locale = keyof typeof localeConfig;

export const locales = Object.keys(localeConfig) as Locale[];

/** The language of unprefixed URLs, and of `x-default`. */
export const defaultLocale: Locale = "en";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && Object.hasOwn(localeConfig, value);
}

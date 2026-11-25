import { defineI18n } from "fumadocs-core/i18n";
import { i18nProvider, uiTranslations } from "fumadocs-ui/i18n";
import { defaultLocale, type Locale, localeConfig, locales } from "./locales";

/**
 * The languages for Fumadocs: content files and its UI.
 *
 * A translated post sits next to the original as `<slug>.<locale>.mdx`. A
 * language lists only the posts written in it (`fallbackLanguage: null`), so
 * no page shows another language's text under its URL.
 */
export const contentI18n = defineI18n({
  defaultLanguage: defaultLocale,
  languages: locales,
  hideLocale: "default-locale",
  parser: "dot",
  fallbackLanguage: null,
});

/** Labels of the Fumadocs UI this site renders. A language left out reads English. */
const translations = contentI18n
  .translations()
  .extend(uiTranslations())
  .add({
    en: { displayName: localeConfig.en.label },
    fa: {
      displayName: localeConfig.fa.label,
      "On this page(table of contents)": "در این صفحه",
      "No Headings(table of contents)": "بدون سرفصل",
      "Table of Contents(inline table of contents)": "فهرست مطالب",
      "Toggle Menu(home layout header)(aria-label)": "باز و بسته کردن منو",
      "Toggle Theme(theme switcher)(aria-label)": "تغییر پوسته",
      "Light(theme switcher)(aria-label)": "روشن",
      "Dark(theme switcher)(aria-label)": "تیره",
      "System(theme switcher)(aria-label)": "سیستم",
      "Theme(site menu)": "پوسته",
      "Skip to Content(skip link)": "رفتن به محتوا",
      "Copy Text(code block)(aria-label)": "کپی متن",
      "Copied Text(code block)(aria-label)": "کپی شد",
      "Copy Anchor Link(heading anchor)(aria-label)": "کپی پیوند",
      "Copied Anchor Link(heading anchor)(aria-label)": "پیوند کپی شد",
      "Page Not Found(404 not found page)": "صفحه پیدا نشد",
      "Back to Home(404 not found page)": "بازگشت به خانه",
    },
  });

/** The `i18n` prop of the Fumadocs `RootProvider`. */
export function fumadocsI18n(locale: Locale) {
  return i18nProvider(translations, locale);
}

import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "./locales";

/** How URLs carry the language. Read by the proxy and by `Link`. */
export const routing = defineRouting({
  locales,
  defaultLocale,
  // `/projects` is the default language, `/fa/projects` the others.
  localePrefix: "as-needed",
  // A URL always shows the same language: no redirect by browser language or
  // cookie. Visitors switch with the language menu; crawlers see stable URLs.
  localeDetection: false,
  localeCookie: false,
  // `hreflang` comes from each page's metadata, which knows which translations
  // exist. The proxy's `Link` header would list every language for every URL.
  alternateLinks: false,
});

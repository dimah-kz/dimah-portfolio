import { defaultLocale, isLocale, type Locale } from "./locales";

/**
 * A path in a language, by the rule in `routing.ts`: the default language has
 * no prefix. `localizePath("/blog", "fa")` → `/fa/blog`. Plain functions, so
 * the proxy, metadata, feeds, and share images use the same URLs as `Link`.
 */
export function localizePath(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** The language of a URL path and the path without it. */
export function splitLocalePath(pathname: string): {
  locale: Locale;
  path: string;
} {
  const [, first, ...rest] = pathname.split("/");
  if (first && first !== defaultLocale && isLocale(first)) {
    return { locale: first, path: `/${rest.join("/")}` };
  }
  return { locale: defaultLocale, path: pathname || "/" };
}

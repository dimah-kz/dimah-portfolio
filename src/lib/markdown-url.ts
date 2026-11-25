import type { Locale } from "@/i18n/locales";
import { localizePath } from "@/i18n/paths";

/**
 * Where the Markdown of a page lives. Kept free of content imports, so the
 * proxy (`src/proxy.ts`) can use it without bundling the site.
 *
 * - Public URL: the page's URL plus `.md`; `/index.md` and `/fa/index.md` for
 *   the home pages.
 * - Route: `src/app/[locale]/llms.mdx/[...path]`, reached through the proxy,
 *   for a `.md` URL or a page requested with `Accept: text/markdown`.
 */

function trim(path: string): string {
  return path.replace(/\/+$/, "") || "/";
}

/** `("/", "fa")` → `/fa/index.md`, `("/blog/post", "en")` → `/blog/post.md`. */
export function markdownUrl(path: string, locale: Locale): string {
  const page = trim(path);
  return page === "/"
    ? `${localizePath("/", locale).replace(/\/$/, "")}/index.md`
    : `${localizePath(page, locale)}.md`;
}

/** `("/", "en")` → `/en/llms.mdx/index`, `("/blog/post", "fa")` → `/fa/llms.mdx/blog/post`. */
export function markdownRoute(path: string, locale: Locale): string {
  const page = trim(path);
  return `/${locale}/llms.mdx${page === "/" ? "/index" : page}`;
}

/** The page path of a Markdown route's segments: `["index"]` → `/`. */
export function pagePath(segments: string[]): string {
  return segments.length === 1 && segments[0] === "index"
    ? "/"
    : `/${segments.join("/")}`;
}

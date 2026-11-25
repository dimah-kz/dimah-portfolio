import type { Locale } from "@/i18n/locales";
import { canonicalUrl } from "./seo";

/**
 * Headers for Markdown and `llms.txt` responses. Search engines skip them
 * (`noindex`). With `page`, the `Link` header names the HTML page as canonical.
 */
export function markdownHeaders(
  locale: Locale,
  {
    type = "markdown",
    page,
  }: { type?: "markdown" | "text"; page?: string } = {},
): HeadersInit {
  return {
    "Content-Type": `${type === "text" ? "text/plain" : "text/markdown"}; charset=utf-8`,
    "Content-Language": locale,
    "X-Robots-Tag": "noindex",
    ...(page
      ? { Link: `<${canonicalUrl(page, locale)}>; rel="canonical"` }
      : {}),
  };
}

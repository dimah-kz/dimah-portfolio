import { canonicalUrl } from "./seo";

/**
 * Headers for Markdown and `llms.txt` responses. Search engines skip them
 * (`noindex`); with `canonical`, the `Link` header points them at the HTML page.
 */
export function markdownHeaders(
  path: string,
  { canonical = false }: { canonical?: boolean } = {},
): HeadersInit {
  return {
    "Content-Type": `${path.endsWith(".txt") ? "text/plain" : "text/markdown"}; charset=utf-8`,
    "X-Robots-Tag": "noindex",
    ...(canonical ? { Link: `<${canonicalUrl(path)}>; rel="canonical"` } : {}),
  };
}

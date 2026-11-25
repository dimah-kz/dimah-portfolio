/**
 * Where the Markdown of a page lives. Kept free of content imports, so the
 * proxy (`src/proxy.ts`) can use it without bundling the site.
 *
 * - Public URL: the page path plus `.md`, and `/index.md` for the home page.
 * - Route: `src/app/llms.mdx/[...path]`, reached by the `.md` rewrite in
 *   `next.config.ts` or by the proxy for `Accept: text/markdown`.
 */

function trim(pathname: string): string {
  return pathname.replace(/\/+$/, "");
}

/** `/` → `/index.md`, `/blog/post` → `/blog/post.md`. */
export function markdownUrl(pathname: string): string {
  const path = trim(pathname);
  return path === "" ? "/index.md" : `${path}.md`;
}

/** `/` → `/llms.mdx/index`, `/blog/post` → `/llms.mdx/blog/post`. */
export function markdownRoute(pathname: string): string {
  const path = trim(pathname);
  return `/llms.mdx${path === "" ? "/index" : path}`;
}

/** The page path of a Markdown route's segments: `["index"]` → `/`. */
export function pagePath(segments: string[]): string {
  return segments.length === 1 && segments[0] === "index"
    ? "/"
    : `/${segments.join("/")}`;
}

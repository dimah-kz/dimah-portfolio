import { findMarkdownPage, markdownPages } from "@/lib/agents";
import { markdownHeaders } from "@/lib/markdown-response";
import { pagePath } from "@/lib/markdown-url";

export const revalidate = false;
// Other paths are 404s, never rendered on demand.
export const dynamicParams = false;

/**
 * The Markdown of one page. Reached as `<page>.md` (a rewrite in
 * `next.config.ts`) or with `Accept: text/markdown` (`src/proxy.ts`).
 */
export async function GET(_req: Request, { params }: RouteContext<"/llms.mdx/[...path]">) {
  const { path } = await params;
  const page = findMarkdownPage(pagePath(path));
  if (!page) return new Response(null, { status: 404 });

  return new Response(await page.render(), {
    headers: markdownHeaders(page.path, { canonical: true }),
  });
}

export function generateStaticParams() {
  return markdownPages().map((page) => ({
    path: page.path === "/" ? ["index"] : page.path.slice(1).split("/"),
  }));
}

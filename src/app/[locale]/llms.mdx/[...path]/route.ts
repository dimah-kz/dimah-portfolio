import { isLocale, locales } from "@/i18n/locales";
import { findMarkdownPage, markdownPages } from "@/lib/agents";
import { markdownHeaders } from "@/lib/markdown-response";
import { pagePath } from "@/lib/markdown-url";

// Other paths are 404s, never rendered on demand.
export const dynamicParams = false;

/**
 * The Markdown of one page. Reached through `src/proxy.ts`, as `<page>.md` or
 * with `Accept: text/markdown`.
 */
export async function GET(
  _req: Request,
  { params }: RouteContext<"/[locale]/llms.mdx/[...path]">,
) {
  const { locale, path } = await params;
  const page = isLocale(locale) ? await findMarkdownPage(locale, pagePath(path)) : undefined;
  if (!isLocale(locale) || !page) return new Response(null, { status: 404 });

  return new Response(await page.render(), {
    headers: markdownHeaders(locale, { page: page.path }),
  });
}

export async function generateStaticParams() {
  const params = await Promise.all(
    locales.map(async (locale) =>
      (await markdownPages(locale)).map((page) => ({
        locale,
        path: page.path === "/" ? ["index"] : page.path.slice(1).split("/"),
      })),
    ),
  );
  return params.flat();
}

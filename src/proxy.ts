import { splitLocalePath } from "@/i18n/paths";
import { routing } from "@/i18n/routing";
import { markdownRoute } from "@/lib/markdown-url";
import { isMarkdownPreferred } from "fumadocs-core/negotiation";
import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";

const intl = createMiddleware(routing);

/**
 * 1. `<page>.md`: the page's Markdown (see `src/lib/agents.ts`).
 * 2. A page requested with `Accept: text/markdown`: the same Markdown at the
 *    page's own URL. Browsers still get HTML.
 * 3. Everything else: next-intl serves `/…` in the default language and
 *    `/fa/…` in Persian (see `src/i18n/routing.ts`).
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { locale, path } = splitLocalePath(pathname);

  if (path.endsWith(".md")) {
    const page = path.slice(0, -".md".length);
    return NextResponse.rewrite(
      new URL(
        markdownRoute(page === "/index" ? "/" : page, locale),
        request.url,
      ),
    );
  }

  const isPage = !/\.[^/]+$/.test(path) && !path.startsWith("/og/");
  if (isPage && isMarkdownPreferred(request)) {
    const response = NextResponse.rewrite(
      new URL(markdownRoute(path, locale), request.url),
    );
    response.headers.set("Vary", "Accept");
    return response;
  }

  return intl(request);
}

export const config = {
  matcher: [
    // Pages: every path without a file extension.
    "/((?!_next|_vercel|.*\\..*).*)",
    // Files that belong to a language.
    "/:path*.md",
    "/(llms\\.txt|llms-full\\.txt|feed\\.xml)",
    "/:locale/(llms\\.txt|llms-full\\.txt|feed\\.xml)",
    "/og/:path*",
    "/:locale/og/:path*",
  ],
};

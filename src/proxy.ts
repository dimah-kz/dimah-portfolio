import { isMarkdownPreferred } from "fumadocs-core/negotiation";
import { type NextRequest, NextResponse } from "next/server";
import { markdownRoute } from "@/lib/markdown-url";

/**
 * Content negotiation for agents: a page requested with `Accept: text/markdown`
 * gets its Markdown (see `src/lib/agents.ts`) at the same URL. Browsers get HTML.
 * The proxy runs before the cache, so both answers are served from one URL.
 */
export default function proxy(request: NextRequest) {
  if (!isMarkdownPreferred(request)) return NextResponse.next();

  const response = NextResponse.rewrite(
    new URL(markdownRoute(request.nextUrl.pathname), request.nextUrl),
  );
  response.headers.set("Vary", "Accept");
  return response;
}

/** The pages that have a Markdown version. */
export const config = {
  matcher: ["/", "/projects", "/blog", "/blog/:path*"],
};

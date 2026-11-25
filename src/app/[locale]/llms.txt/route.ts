import { isLocale, locales } from "@/i18n/locales";
import { llmsTxt } from "@/lib/agents";
import { markdownHeaders } from "@/lib/markdown-response";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** `/llms.txt` and `/fa/llms.txt`: the index of each language for agents. */
export async function GET(
  _req: Request,
  { params }: RouteContext<"/[locale]/llms.txt">,
) {
  const { locale } = await params;
  if (!isLocale(locale)) return new Response(null, { status: 404 });

  return new Response(await llmsTxt(locale), {
    headers: markdownHeaders(locale, { type: "text" }),
  });
}

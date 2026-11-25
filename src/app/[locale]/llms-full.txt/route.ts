import { isLocale, locales } from "@/i18n/locales";
import { llmsFullTxt } from "@/lib/agents";
import { markdownHeaders } from "@/lib/markdown-response";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** `/llms-full.txt` and `/fa/llms-full.txt`: every page of a language in one file. */
export async function GET(
  _req: Request,
  { params }: RouteContext<"/[locale]/llms-full.txt">,
) {
  const { locale } = await params;
  if (!isLocale(locale)) return new Response(null, { status: 404 });

  return new Response(await llmsFullTxt(locale), {
    headers: markdownHeaders(locale, { type: "text" }),
  });
}

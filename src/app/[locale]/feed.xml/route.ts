import { isLocale, locales } from "@/i18n/locales";
import { feedPath, findProfile } from "@/lib/links";
import { canonicalUrl } from "@/lib/seo";
import { authorName, site, siteCopy } from "@/lib/site";
import { postsIn } from "@/lib/source";
import { getTranslations } from "next-intl/server";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function xml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

/** `/feed.xml` and `/fa/feed.xml`: the posts of each language as RSS. */
export async function GET(
  _req: Request,
  { params }: RouteContext<"/[locale]/feed.xml">,
) {
  const { locale } = await params;
  if (!isLocale(locale)) return new Response(null, { status: 404 });

  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = postsIn(locale);
  const newest = posts.find((post) => post.date)?.date;
  const self = canonicalUrl(feedPath, locale);
  // RSS wants an email address here; without one, the element is left out.
  const email = findProfile("email")?.href.replace(/^mailto:/, "");
  const author = email ? `${email} (${authorName(locale)})` : undefined;

  const items = posts.map((post) => {
    const link = canonicalUrl(post.path, locale);
    return [
      "    <item>",
      `      <title>${xml(post.title)}</title>`,
      `      <link>${xml(link)}</link>`,
      `      <guid isPermaLink="true">${xml(link)}</guid>`,
      `      <description>${xml(post.description ?? post.title)}</description>`,
      author && `      <author>${xml(author)}</author>`,
      ...post.tags.map((tag) => `      <category>${xml(tag.name)}</category>`),
      post.date && `      <pubDate>${post.date.toUTCString()}</pubDate>`,
      "    </item>",
    ]
      .filter(Boolean)
      .join("\n");
  });

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${xml(`${site.name} · ${t("title")}`)}</title>`,
    `    <link>${xml(canonicalUrl("/blog", locale))}</link>`,
    `    <description>${xml(siteCopy(locale).description)}</description>`,
    `    <language>${xml(locale)}</language>`,
    `    <atom:link href="${xml(self)}" rel="self" type="application/rss+xml"/>`,
    newest && `    <lastBuildDate>${newest.toUTCString()}</lastBuildDate>`,
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ]
    .filter((line) => typeof line === "string")
    .join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

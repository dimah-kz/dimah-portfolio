import { canonicalUrl } from "@/lib/seo";
import { posts } from "@/lib/source";
import { findProfile } from "@/lib/links";
import { site } from "@/lib/site";

export const revalidate = false;

function xml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const newest = posts.find((post) => post.date)?.date;
  const self = canonicalUrl("/feed.xml");
  // RSS wants an email address here; without one, the element is left out.
  const email = findProfile("email")?.href.replace(/^mailto:/, "");
  const authorLine = email
    ? `      <author>${xml(`${email} (${site.author.name})`)}</author>
`
    : "";

  const items = posts
    .map((post) => {
      const link = canonicalUrl(post.url);
      const categories = post.tags
        .map((tag) => `      <category>${xml(tag.name)}</category>`)
        .join("\n");

      return `    <item>
      <title>${xml(post.title)}</title>
      <link>${xml(link)}</link>
      <guid isPermaLink="true">${xml(link)}</guid>
      <description>${xml(post.description ?? post.title)}</description>
${authorLine}${categories}
${post.date ? `      <pubDate>${post.date.toUTCString()}</pubDate>\n` : ""}    </item>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(site.name)}</title>
    <link>${xml(site.url)}</link>
    <description>${xml(site.description)}</description>
    <language>${xml(site.locale)}</language>
    <atom:link href="${xml(self)}" rel="self" type="application/rss+xml"/>
${newest ? `    <lastBuildDate>${newest.toUTCString()}</lastBuildDate>\n` : ""}    ${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

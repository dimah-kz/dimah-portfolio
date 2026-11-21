import type { Metadata } from "next";
import { site } from "./site";

const ogLocales = {
  en: "en_US",
  fa: "fa_IR",
} as const;

/** Open Graph locale. `site.locale` stays the document language. */
export const ogLocale = ogLocales[site.locale];

/** Browser title for the home page. Inner pages use `title.template`. */
export const defaultTitle = `${site.name} — ${site.description}`;

/**
 * Terms already used on the site. Kept off individual docs pages.
 */
export const siteKeywords = [
  site.name,
  "dimah-starter",
  "dimah-s3",
  "dimah-form",
  "dimah-survey",
  "Next.js",
  "React",
  "open source",
] as const;

/** Preview deploys stay out of the index. Production and local builds do not. */
export function isPreviewDeploy(): boolean {
  return process.env.VERCEL_ENV === "preview";
}

export function canonicalUrl(pathname = "/"): string {
  if (pathname === "" || pathname === "/") return site.url;
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${site.url}${path.replace(/\/+$/, "")}`;
}

export function absoluteUrl(path: string): string {
  if (path.startsWith("https://") || path.startsWith("http://")) return path;
  return canonicalUrl(path);
}

/** Canonical plus the site feed. Replaces the whole `alternates` object. */
export function pageAlternates(pathname: string): Metadata["alternates"] {
  const path = pathname === "" ? "/" : pathname;
  return {
    canonical: path,
    types: {
      "application/rss+xml": "/feed.xml",
    },
  };
}

function titleText(title: Metadata["title"] | undefined): string | undefined {
  if (typeof title === "string") return title;
  if (
    title &&
    typeof title === "object" &&
    "absolute" in title &&
    title.absolute
  ) {
    return title.absolute;
  }
  return undefined;
}

/**
 * Per-route metadata. `alternates` and `openGraph` are shallow-merged by Next,
 * so each page sends a complete object instead of inheriting the home URL.
 */
export function pageMeta(pathname: string, metadata: Metadata = {}): Metadata {
  const title =
    titleText(metadata.title) ?? (pathname === "/" ? defaultTitle : undefined);
  const description =
    metadata.description ?? (pathname === "/" ? site.description : undefined);

  return {
    ...metadata,
    alternates: pageAlternates(pathname),
    openGraph: {
      type: "website",
      locale: ogLocale,
      siteName: site.name,
      url: pathname,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      images: {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: defaultTitle,
      },
      ...metadata.openGraph,
    },
  };
}

export function siteJsonLd() {
  const personId = `${site.url}/#person`;
  const websiteId = `${site.url}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.author.name,
        url: site.url,
        image: absoluteUrl(site.author.avatarUrl),
        description: site.description,
        email: site.author.email,
        sameAs: [site.author.githubUrl, site.author.xUrl],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: site.name,
        url: site.url,
        description: site.description,
        inLanguage: site.locale,
        publisher: { "@id": personId },
      },
    ],
  };
}

export function articleJsonLd(input: {
  type: "BlogPosting" | "TechArticle";
  pathname: string;
  title: string;
  description?: string;
  datePublished?: Date;
  image?: string;
}) {
  const url = canonicalUrl(input.pathname);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": input.type,
    headline: input.title,
    url,
    mainEntityOfPage: url,
    inLanguage: site.locale,
    image: absoluteUrl(input.image ?? site.author.avatarUrl),
    author: { "@id": `${site.url}/#person` },
    publisher: { "@id": `${site.url}/#person` },
    isPartOf: { "@id": `${site.url}/#website` },
  };

  if (input.description) data.description = input.description;
  if (input.datePublished)
    data.datePublished = input.datePublished.toISOString();

  return data;
}

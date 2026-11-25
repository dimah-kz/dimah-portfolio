import type { Metadata } from "next";
import { projects } from "./projects";
import { headline, site } from "./site";

const ogLocales = {
  en: "en_US",
  fa: "fa_IR",
} as const;

/** Open Graph locale. `site.locale` stays the document language. */
export const ogLocale = ogLocales[site.locale];

/** Browser title for the home page. Inner pages use `title.template`. */
export const defaultTitle = `${site.name} — ${headline}`;

/** Terms already used on the site: the name, project names, and their stacks. */
export const siteKeywords = [
  ...new Set([
    site.name,
    site.author.github,
    ...projects.map((project) => project.name),
    ...projects.flatMap((project) => project.stack),
    "open source",
  ]),
];

/** Static pages with their own share image, see `src/app/og/pages`. */
export const ogPages = ["home", "projects", "blog", "tags"] as const;
export type OgPage = (typeof ogPages)[number];

/** Share image URLs. Each is a static route under `src/app/og`. */
export const ogImage = {
  page: (page: OgPage) => `/og/pages/${page}/image.png`,
  post: (slug: string) => `/og/blog/${slug}/image.png`,
  tag: (slug: string) => `/og/tags/${slug}/image.png`,
};

/** `openGraph.images` for one 1200×630 card. X reuses it. */
export function ogImages(url: string, alt: string) {
  return [{ url, width: 1200, height: 630, alt, type: "image/png" }];
}

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
 * `image` is the page's share card; it defaults to the home card.
 */
export function pageMeta(
  pathname: string,
  metadata: Metadata = {},
  image: string = ogImage.page("home"),
): Metadata {
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
      images: ogImages(image, title ?? defaultTitle),
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
        description: site.author.tagline,
        email: site.author.email,
        sameAs: [site.author.githubUrl, site.author.xUrl, site.author.telegramUrl],
        owns: projects.flatMap((project) =>
          project.links.repository
            ? [
                {
                  "@type": "SoftwareSourceCode",
                  name: project.name,
                  description: project.description,
                  codeRepository: project.links.repository,
                  ...(project.links.live ? { url: project.links.live } : {}),
                },
              ]
            : [],
        ),
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

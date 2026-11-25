import type { Metadata } from "next";
import type { BlogPost } from "./blog";
import { experience } from "./experience";
import { findProfile, profiles } from "./links";
import { markdownUrl } from "./markdown-url";
import { projects } from "./projects";
import { headline, site } from "./site";
import { defaultAuthor } from "./source";

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
  ...new Set(
    [
      site.name,
      findProfile("github")?.handle,
      ...projects.map((project) => project.name),
      ...projects.flatMap((project) => project.stack),
    ].filter((term): term is string => Boolean(term)),
  ),
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

/**
 * Canonical, the feed, and the page's Markdown for agents
 * (`<link rel="alternate" type="text/markdown">`).
 * Replaces the whole `alternates` object.
 */
export function pageAlternates(pathname: string): Metadata["alternates"] {
  const path = pathname === "" ? "/" : pathname;
  return {
    canonical: path,
    types: {
      "application/rss+xml": "/feed.xml",
      "text/markdown": markdownUrl(path),
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

/* -------------------------------------------------------------------------- */
/* Structured data (https://schema.org), read by search engines and agents    */
/* -------------------------------------------------------------------------- */

const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;

function projectData(project: (typeof projects)[number]) {
  return {
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.description,
    ...(project.links.repository
      ? { codeRepository: project.links.repository }
      : {}),
    ...(project.links.live ? { url: project.links.live } : {}),
    ...(project.stack.length > 0 ? { keywords: project.stack.join(", ") } : {}),
    author: { "@id": personId },
  };
}

/** The person and the website. On every page, from the root layout. */
export function siteJsonLd() {
  const email = findProfile("email");
  const current = experience.filter((role) => !role.end);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.author.name,
        url: site.url,
        image: absoluteUrl(site.author.avatar),
        description: site.author.tagline,
        ...(email ? { email: email.href } : {}),
        sameAs: profiles
          .filter((profile) => profile.id !== "email")
          .map((profile) => profile.href),
        ...(current.length > 0
          ? {
              worksFor: current.map((role) => ({
                "@type": "Organization",
                name: role.company,
                ...(role.url ? { url: role.url } : {}),
              })),
              jobTitle: current[0].role,
            }
          : {}),
        ...(siteKeywords.length > 0 ? { knowsAbout: siteKeywords } : {}),
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

/** The home page is about the person. */
export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: site.url,
    name: defaultTitle,
    inLanguage: site.locale,
    mainEntity: { "@id": personId },
    isPartOf: { "@id": websiteId },
  };
}

/** `/projects`: the projects as a list. */
export function projectsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: canonicalUrl("/projects"),
    inLanguage: site.locale,
    isPartOf: { "@id": websiteId },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: projectData(project),
      })),
    },
  };
}

/** `/blog`: the blog and its posts. */
export function blogJsonLd(posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    url: canonicalUrl("/blog"),
    inLanguage: site.locale,
    author: { "@id": personId },
    isPartOf: { "@id": websiteId },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: canonicalUrl(post.url),
      ...(post.description ? { description: post.description } : {}),
      ...(post.date ? { datePublished: post.date.toISOString() } : {}),
    })),
  };
}

/** One post. Guest authors are named; the site's author is the person. */
export function articleJsonLd(input: { post: BlogPost; image?: string }) {
  const { post } = input;
  const url = canonicalUrl(post.url);
  const authors = post.authors.map((author) =>
    author === defaultAuthor
      ? { "@id": personId }
      : {
          "@type": "Person",
          name: author.name,
          ...(author.url ? { url: author.url } : {}),
        },
  );

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    url,
    mainEntityOfPage: url,
    inLanguage: site.locale,
    image: absoluteUrl(input.image ?? site.author.avatar),
    author: authors.length === 1 ? authors[0] : authors,
    publisher: { "@id": personId },
    isPartOf: { "@id": websiteId },
    ...(post.description ? { description: post.description } : {}),
    ...(post.date ? { datePublished: post.date.toISOString() } : {}),
    ...(post.tags.length > 0
      ? { keywords: post.tags.map((tag) => tag.name).join(", ") }
      : {}),
    ...(post.readingTime ? { timeRequired: `PT${post.readingTime}M` } : {}),
  };
}

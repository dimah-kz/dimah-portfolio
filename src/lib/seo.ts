import {
  defaultLocale,
  type Locale,
  localeConfig,
  locales,
} from "@/i18n/locales";
import { localizePath } from "@/i18n/paths";
import type { Metadata } from "next";
import type { BlogPost } from "./blog";
import { getExperience } from "./experience";
import { feedPath, findProfile, profiles } from "./links";
import { markdownUrl } from "./markdown-url";
import { getProjects, type Project } from "./projects";
import { authorName, headline, site, siteCopy } from "./site";
import { isDefaultAuthor } from "./source";

/** Browser title for the home page. Inner pages use `title.template`. */
export function defaultTitle(locale: Locale): string {
  return `${site.name} — ${headline(locale)}`;
}

/** Terms already used on the site: the name, project names, and their stacks. */
export function siteKeywords(locale: Locale): string[] {
  const projects = getProjects(locale);
  return [
    ...new Set(
      [
        site.name,
        findProfile("github")?.handle,
        ...projects.map((project) => project.name),
        ...projects.flatMap((project) => project.stack),
      ].filter((term): term is string => Boolean(term)),
    ),
  ];
}

/** Static pages with their own share image, see `src/app/[locale]/og/pages`. */
export const ogPages = ["home", "projects", "blog", "tags"] as const;
export type OgPage = (typeof ogPages)[number];

/** Share image URLs, one set per language. Each is a static route under `src/app/[locale]/og`. */
export const ogImage = {
  page: (page: OgPage, locale: Locale) =>
    localizePath(`/og/pages/${page}/image.png`, locale),
  post: (slug: string, locale: Locale) =>
    localizePath(`/og/blog/${slug}/image.png`, locale),
  tag: (slug: string, locale: Locale) =>
    localizePath(`/og/tags/${slug}/image.png`, locale),
};

/** `openGraph.images` for one 1200×630 card. X reuses it. */
export function ogImages(url: string, alt: string) {
  return [{ url, width: 1200, height: 630, alt, type: "image/png" }];
}

/** Preview deploys stay out of the index. Production and local builds do not. */
export function isPreviewDeploy(): boolean {
  return process.env.VERCEL_ENV === "preview";
}

/** An absolute URL for a path that already carries its language, or a URL. */
export function absoluteUrl(path: string): string {
  if (path.startsWith("https://") || path.startsWith("http://")) return path;
  const clean = path.replace(/\/+$/, "");
  return clean === ""
    ? site.url
    : `${site.url}${clean.startsWith("/") ? clean : `/${clean}`}`;
}

/** The absolute URL of a page in a language: `("/blog", "fa")` → `https://…/fa/blog`. */
export function canonicalUrl(path: string, locale: Locale): string {
  return absoluteUrl(localizePath(path, locale));
}

/**
 * Canonical, `hreflang` for each language the page exists in (`x-default` is
 * the default language), the feed, and the page's Markdown for agents
 * (`<link rel="alternate" type="text/markdown">`).
 */
export function pageAlternates(
  path: string,
  locale: Locale,
  translations: readonly Locale[] = locales,
): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  if (translations.length > 1) {
    for (const item of translations) languages[item] = localizePath(path, item);
    if (translations.includes(defaultLocale)) {
      languages["x-default"] = localizePath(path, defaultLocale);
    }
  }

  return {
    canonical: localizePath(path, locale),
    ...(translations.length > 1 ? { languages } : {}),
    types: {
      "application/rss+xml": localizePath(feedPath, locale),
      "text/markdown": markdownUrl(path, locale),
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
 * Per-route metadata in a language. `alternates` and `openGraph` are
 * shallow-merged by Next, so each page sends complete objects.
 *
 * @param options.image - the page's share card; defaults to the home card
 * @param options.translations - languages the page exists in; defaults to all
 */
export function pageMeta(
  locale: Locale,
  path: string,
  metadata: Metadata = {},
  {
    image = ogImage.page("home", locale),
    translations = locales,
  }: { image?: string; translations?: readonly Locale[] } = {},
): Metadata {
  const title =
    titleText(metadata.title) ??
    (path === "/" ? defaultTitle(locale) : undefined);
  const description =
    metadata.description ??
    (path === "/" ? siteCopy(locale).description : undefined);

  return {
    ...metadata,
    alternates: pageAlternates(path, locale, translations),
    openGraph: {
      type: "website",
      locale: localeConfig[locale].ogLocale,
      alternateLocale: translations
        .filter((item) => item !== locale)
        .map((item) => localeConfig[item].ogLocale),
      siteName: site.name,
      url: localizePath(path, locale),
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      images: ogImages(image, title ?? defaultTitle(locale)),
      ...metadata.openGraph,
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Structured data (https://schema.org), read by search engines and agents    */
/* -------------------------------------------------------------------------- */

const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;

function projectData(project: Project) {
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

/** The person and the website, in a language. On every page, from the layout. */
export function siteJsonLd(locale: Locale) {
  const email = findProfile("email");
  const current = getExperience(locale).filter((role) => !role.end);
  const keywords = siteKeywords(locale);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: authorName(locale),
        url: site.url,
        image: absoluteUrl(site.author.avatar),
        description: siteCopy(locale).tagline,
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
        ...(keywords.length > 0 ? { knowsAbout: keywords } : {}),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: site.name,
        url: site.url,
        description: siteCopy(locale).description,
        inLanguage: locales,
        publisher: { "@id": personId },
      },
    ],
  };
}

/** The home page is about the person. */
export function profilePageJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: canonicalUrl("/", locale),
    name: defaultTitle(locale),
    inLanguage: locale,
    mainEntity: { "@id": personId },
    isPartOf: { "@id": websiteId },
  };
}

/** `/projects`: the projects as a list. */
export function projectsJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: canonicalUrl("/projects", locale),
    inLanguage: locale,
    isPartOf: { "@id": websiteId },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: getProjects(locale).map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: projectData(project),
      })),
    },
  };
}

/** `/blog`: the blog and its posts. */
export function blogJsonLd(locale: Locale, posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    url: canonicalUrl("/blog", locale),
    inLanguage: locale,
    author: { "@id": personId },
    isPartOf: { "@id": websiteId },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: canonicalUrl(post.path, locale),
      ...(post.description ? { description: post.description } : {}),
      ...(post.date ? { datePublished: post.date.toISOString() } : {}),
    })),
  };
}

/** One post. Guest authors are named; the site's author is the person. */
export function articleJsonLd(locale: Locale, post: BlogPost, image?: string) {
  const url = canonicalUrl(post.path, locale);
  const authors = post.authors.map((author) =>
    isDefaultAuthor(author)
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
    inLanguage: locale,
    image: absoluteUrl(image ?? site.author.avatar),
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

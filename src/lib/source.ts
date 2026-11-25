import { contentI18n } from "@/i18n/fumadocs";
import { type Locale, locales } from "@/i18n/locales";
import { localizePath } from "@/i18n/paths";
import { loader } from "fumadocs-core/source";
import { defineCollections } from "fumadocs-mdx/macro";
import {
  type BlogAuthor,
  type BlogPost,
  blogPageSchema,
  getPosts,
} from "./blog";
import { authorName, site, siteCopy } from "./site";

const blog = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: blogPageSchema,
  postprocess: {
    // The Markdown of each post, for `/blog/<slug>.md` and `llms-full.txt`.
    includeProcessedMarkdown: true,
  },
});

/**
 * Posts in every language. `my-post.mdx` is the default language and
 * `my-post.fa.mdx` its Persian translation (see `src/i18n/fumadocs.ts`).
 */
export const blogSource = loader({
  baseUrl: "/blog",
  source: blog.toFumadocsSource(),
  i18n: contentI18n,
});

/** The author of a post that lists none in `authors`: the site's author. */
function defaultAuthor(locale: Locale): BlogAuthor {
  return {
    name: authorName(locale),
    title: siteCopy(locale).tagline,
    url: localizePath("/", locale),
    image: site.author.avatar,
  };
}

/** `true` for the site's author, in any language. */
export function isDefaultAuthor(author: BlogAuthor): boolean {
  return (
    author.image === site.author.avatar &&
    locales.some((locale) => author.name === authorName(locale))
  );
}

/**
 * Guest authors, by the key a post lists in `authors`, such as
 * `{ ada: { name: "Ada", url: "https://ada.dev" } }`.
 * An unknown key is shown as a name.
 */
export const blogAuthors: Record<string, BlogAuthor> = {};

const cache = new Map<Locale, BlogPost[]>();

/** The posts written in a language, newest first. */
export function postsIn(locale: Locale): BlogPost[] {
  let posts = cache.get(locale);
  if (!posts) {
    posts = getPosts(
      blogSource.getPages(locale),
      blogAuthors,
      defaultAuthor(locale),
    );
    cache.set(locale, posts);
  }
  return posts;
}

/** The languages a post is written in, for `hreflang` and the sitemap. */
export function postLocales(slug: string): Locale[] {
  return locales.filter((locale) =>
    postsIn(locale).some((post) => post.slug === slug),
  );
}

/** The languages that have a post with a tag. */
export function tagLocales(tag: string): Locale[] {
  return locales.filter((locale) =>
    postsIn(locale).some((post) => post.tags.some((item) => item.slug === tag)),
  );
}

import { loader } from "fumadocs-core/source";
import { defineCollections } from "fumadocs-mdx/macro";
import { type BlogAuthor, blogPageSchema, getPosts } from "./blog";
import { site } from "./site";

const blog = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: blogPageSchema,
  postprocess: {
    // The Markdown of each post, for `/blog/<slug>.md` and `llms-full.txt`.
    includeProcessedMarkdown: true,
  },
});

export const blogSource = loader({
  baseUrl: "/blog",
  source: blog.toFumadocsSource(),
});

/** The author of a post that lists none in `authors`: the site's author. */
export const defaultAuthor: BlogAuthor = {
  name: site.author.name,
  title: site.author.tagline,
  url: site.url,
  image: site.author.avatar,
};

/**
 * Guest authors, by the key a post lists in `authors`, such as
 * `{ ada: { name: "Ada", url: "https://ada.dev" } }`.
 * An unknown key is shown as a name.
 */
export const blogAuthors: Record<string, BlogAuthor> = {};

/** Every post, newest first. */
export const posts = getPosts(
  blogSource.getPages(),
  blogAuthors,
  defaultAuthor,
);

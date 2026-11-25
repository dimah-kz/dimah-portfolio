import type { StructuredData } from "fumadocs-core/mdx-plugins/remark-structure";
import { pageSchema } from "fumadocs-core/source/schema";
import { z } from "zod";

export const blogPageSchema = pageSchema.extend({
  /** publish date, posts are sorted by it */
  date: z.iso.date().or(z.date()).optional(),
  tags: z.array(z.string()).optional(),
  /** keys of the authors passed to `getPosts()`; without it, the default author */
  authors: z.array(z.string()).optional(),
  /** cover image URL */
  image: z.string().optional(),
});

export interface BlogAuthor {
  name: string;
  /** role or job title */
  title?: string;
  /** link to profile or website */
  url?: string;
  /** avatar URL */
  image?: string;
}

export interface BlogTag {
  /** as written in the first post using it */
  name: string;
  /** URL segment, see `tagSlug()` */
  slug: string;
  /** path of the tag page, without the language: `/blog/tags/<slug>` */
  path: string;
}

export interface BlogPost {
  /** file name, the last segment of `path` */
  slug: string;
  /** path of the post, without the language: `/blog/<slug>` */
  path: string;
  title: string;
  description?: string;
  date?: Date;
  /** cover image URL */
  image?: string;
  tags: BlogTag[];
  authors: BlogAuthor[];
  /** estimated minutes to read, when the page has structured data */
  readingTime?: number;
}

interface BlogPage {
  slugs: string[];
  data: z.output<typeof blogPageSchema> & { structuredData?: StructuredData };
}

/** Words of the text and headings, at 220 words a minute, at least 1. */
export function readingTime(
  data: StructuredData,
  wordsPerMinute = 220,
): number {
  let words = 0;
  for (const item of [...data.headings, ...data.contents]) {
    words += item.content.split(/\s+/).filter(Boolean).length;
  }
  return Math.max(1, Math.round(words / wordsPerMinute));
}

/** lowercase, whitespace replaced by `-` */
export function tagSlug(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, "-");
}

/**
 * Posts of blog pages, newest first, undated posts on top.
 *
 * @param authors - authors by their keys in frontmatter, unknown keys are shown as names
 * @param fallback - the author of a post that lists none
 */
export function getPosts(
  pages: BlogPage[],
  authors: Record<string, BlogAuthor> = {},
  fallback?: BlogAuthor,
): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const { slugs, data } of pages) {
    const slug = slugs.join("/");
    const post: BlogPost = {
      slug,
      path: `/blog/${slug}`,
      title: data.title,
      description: data.description,
      date: data.date === undefined ? undefined : new Date(data.date),
      image: data.image,
      tags: [],
      authors: [],
      readingTime: data.structuredData
        ? readingTime(data.structuredData)
        : undefined,
    };

    for (const name of data.tags ?? []) {
      const tag = tagSlug(name);
      post.tags.push({ name, slug: tag, path: `/blog/tags/${tag}` });
    }
    for (const id of data.authors ?? [])
      post.authors.push(authors[id] ?? { name: id });
    if (post.authors.length === 0 && fallback) post.authors.push(fallback);
    posts.push(post);
  }

  const now = Date.now();
  return posts.sort(
    (a, b) => (b.date?.getTime() ?? now) - (a.date?.getTime() ?? now),
  );
}

/** the post of `slug`, and the posts published right after (`newer`) and before (`older`) it */
export function findPost(
  posts: BlogPost[],
  slug: string,
): { post: BlogPost; newer?: BlogPost; older?: BlogPost } | undefined {
  const index = posts.findIndex((post) => post.slug === slug);
  const post = posts[index];
  if (!post) return;

  return { post, newer: posts[index - 1], older: posts[index + 1] };
}

/** tags of posts with their number of posts, most used first */
export function getTags(posts: BlogPost[]): (BlogTag & { count: number })[] {
  const tags = new Map<string, BlogTag & { count: number }>();

  for (const post of posts) {
    for (const tag of post.tags) {
      const info = tags.get(tag.slug);
      if (info) info.count++;
      else tags.set(tag.slug, { ...tag, count: 1 });
    }
  }

  return Array.from(tags.values()).sort((a, b) => b.count - a.count);
}

/** a tag and its posts, `undefined` when no post has it */
export function getTagPosts(posts: BlogPost[], slug: string) {
  const key = decode(slug);
  let tag: BlogTag | undefined;
  const tagged: BlogPost[] = [];

  for (const post of posts) {
    const match = post.tags.find((item) => item.slug === key);
    if (!match) continue;

    tag ??= match;
    tagged.push(post);
  }

  if (tag) return { tag, posts: tagged };
}

/** routers may pass the slug URI encoded */
function decode(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

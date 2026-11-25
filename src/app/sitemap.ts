import { getTags } from "@/lib/blog";
import { canonicalUrl } from "@/lib/seo";
import { posts } from "@/lib/source";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const tags = getTags(posts);
  const newest = posts.find((post) => post.date)?.date;

  const entries: MetadataRoute.Sitemap = [
    {
      url: canonicalUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
      ...(newest ? { lastModified: newest } : {}),
    },
    {
      url: canonicalUrl("/projects"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: canonicalUrl("/blog"),
      changeFrequency: "weekly",
      priority: 0.7,
      ...(newest ? { lastModified: newest } : {}),
    },
    ...(tags.length > 0
      ? [
          {
            url: canonicalUrl("/blog/tags"),
            changeFrequency: "monthly" as const,
            priority: 0.3,
          },
        ]
      : []),
    ...posts.map((post) => ({
      url: canonicalUrl(post.url),
      ...(post.date ? { lastModified: post.date } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...tags.map((tag) => ({
      url: canonicalUrl(tag.url),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    })),
  ];

  return entries.sort(
    (a, b) =>
      (b.priority ?? 0) - (a.priority ?? 0) || a.url.localeCompare(b.url),
  );
}

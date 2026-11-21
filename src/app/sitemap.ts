import { getPosts, getTags } from '@/lib/blog';
import { canonicalUrl } from '@/lib/seo';
import { blogAuthors, blogSource, source } from '@/lib/source';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts(blogSource.getPages(), blogAuthors);
  const tags = getTags(posts);

  const entries: MetadataRoute.Sitemap = [
    { url: canonicalUrl('/'), changeFrequency: 'weekly', priority: 1 },
    { url: canonicalUrl('/blog'), changeFrequency: 'weekly', priority: 0.7 },
    { url: canonicalUrl('/blog/tags'), changeFrequency: 'monthly', priority: 0.3 },
    ...source.getPages().map((page) => ({
      url: canonicalUrl(page.url),
      changeFrequency: page.url === '/docs' ? ('weekly' as const) : ('monthly' as const),
      priority: docsPriority(page.url),
    })),
    ...posts.map((post) => ({
      url: canonicalUrl(post.url),
      ...(post.date ? { lastModified: post.date } : {}),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
    ...tags.map((tag) => ({
      url: canonicalUrl(tag.url),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    })),
  ];

  return entries.sort(
    (a, b) => (b.priority ?? 0) - (a.priority ?? 0) || a.url.localeCompare(b.url),
  );
}

function docsPriority(url: string): number {
  if (url === '/docs') return 0.8;
  const depth = url.split('/').filter(Boolean).length;
  if (depth <= 2) return 0.7;
  return 0.6;
}

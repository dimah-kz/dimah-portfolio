import { BlogCards, BlogDescription, BlogHeader, BlogTitle } from '@/components/blog';
import { getPosts } from '@/lib/blog';
import { pageMeta } from '@/lib/seo';
import { blogAuthors, blogSource } from '@/lib/source';
import type { Metadata } from 'next';

export const metadata: Metadata = pageMeta('/blog', {
  title: 'Blog',
  description: 'Notes on dimah-starter and dimah-s3.',
});

export default function Page() {
  return (
    <div className="mx-auto flex w-full max-w-(--fd-layout-width) flex-col gap-4 px-4 py-12">
      <BlogHeader>
        <BlogTitle>Blog</BlogTitle>
        <BlogDescription>Notes on dimah-starter and dimah-s3.</BlogDescription>
      </BlogHeader>
      <BlogCards posts={getPosts(blogSource.getPages(), blogAuthors)} />
    </div>
  );
}

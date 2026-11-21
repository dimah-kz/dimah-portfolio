import { BlogHeader, BlogTagCards, BlogTitle } from '@/components/blog';
import { getPosts, getTags } from '@/lib/blog';
import { blogSource } from '@/lib/source';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Topics across the notes on dimah-starter and dimah-s3.',
};

export default function Page() {
  const tags = getTags(getPosts(blogSource.getPages()));

  return (
    <div className="mx-auto flex w-full max-w-(--fd-layout-width) flex-col gap-4 px-4 py-12">
      <BlogHeader>
        <BlogTitle>All Tags</BlogTitle>
      </BlogHeader>
      <BlogTagCards tags={tags} />
    </div>
  );
}

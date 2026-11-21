import { BlogCards, BlogHeader, BlogTitle } from '@/components/blog';
import { getPosts, getTagPosts, getTags } from '@/lib/blog';
import { blogAuthors, blogSource } from '@/lib/source';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default async function Page(props: PageProps<'/blog/tags/[tag]'>) {
  const { tag } = await props.params;
  const result = getTagPosts(getPosts(blogSource.getPages(), blogAuthors), tag);
  if (!result) notFound();

  return (
    <div className="mx-auto flex w-full max-w-(--fd-layout-width) flex-col gap-4 px-4 py-12">
      <BlogHeader>
        <BlogTitle>{result.tag.name}</BlogTitle>
      </BlogHeader>
      <BlogCards posts={result.posts} />
    </div>
  );
}

export function generateStaticParams() {
  return getTags(getPosts(blogSource.getPages())).map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata(props: PageProps<'/blog/tags/[tag]'>): Promise<Metadata> {
  const { tag } = await props.params;
  const result = getTagPosts(getPosts(blogSource.getPages()), tag);
  if (!result) notFound();

  return {
    title: result.tag.name,
    description: `Notes tagged ${result.tag.name}.`,
  };
}

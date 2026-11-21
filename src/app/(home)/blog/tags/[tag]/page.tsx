import { ProjectLogo } from '@/components/brand';
import { BlogCards, BlogHeader, BlogTitle } from '@/components/blog';
import { getPosts, getTagPosts, getTags } from '@/lib/blog';
import { projectByTag } from '@/lib/projects';
import { pageMeta } from '@/lib/seo';
import { blogAuthors, blogSource } from '@/lib/source';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default async function Page(props: PageProps<'/blog/tags/[tag]'>) {
  const { tag } = await props.params;
  const result = getTagPosts(getPosts(blogSource.getPages(), blogAuthors), tag);
  if (!result) notFound();

  const project = projectByTag(result.tag.name);

  return (
    <div className="mx-auto flex w-full max-w-(--fd-layout-width) flex-col gap-4 px-4 py-12">
      <BlogHeader>
        <BlogTitle className="flex items-center gap-2.5">
          {project ? <ProjectLogo id={project.id} className="size-7" /> : null}
          {result.tag.name}
        </BlogTitle>
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

  return pageMeta(result.tag.url, {
    title: result.tag.name,
    description: `Notes tagged ${result.tag.name}.`,
  });
}

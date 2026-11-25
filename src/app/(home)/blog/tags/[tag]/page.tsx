import { BlogBackLink, BlogCards, BlogTagCloud } from "@/components/blog";
import { Container, PageHeader } from "@/components/layout/section";
import { ProjectLogo } from "@/components/project-logo";
import { getTagPosts, getTags } from "@/lib/blog";
import { t } from "@/lib/i18n";
import { projectByTag } from "@/lib/projects";
import { ogImage, pageMeta } from "@/lib/seo";
import { posts } from "@/lib/source";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export default async function BlogTagPage(
  props: PageProps<"/blog/tags/[tag]">,
) {
  const { tag } = await props.params;
  const result = getTagPosts(posts, tag);
  if (!result) notFound();

  const project = projectByTag(result.tag.name);

  return (
    <main id="main" className="flex flex-1 flex-col">
      <PageHeader
        eyebrow={<BlogBackLink />}
        title={
          <span className="inline-flex items-center gap-3">
            {project ? (
              <ProjectLogo project={project} className="size-9 sm:size-11" />
            ) : null}
            {result.tag.name}
          </span>
        }
        description={
          project
            ? project.description
            : t.blog.taggedDescription(result.tag.name)
        }
      >
        <div className="pt-2">
          <BlogTagCloud tags={getTags(posts)} active={result.tag.slug} />
        </div>
      </PageHeader>
      <Container className="py-12 sm:py-16">
        <BlogCards posts={result.posts} latestUrl={posts[0]?.url} />
      </Container>
    </main>
  );
}

export function generateStaticParams() {
  return getTags(posts).map((tag) => ({
    tag: tag.slug,
  }));
}

export async function generateMetadata(
  props: PageProps<"/blog/tags/[tag]">,
): Promise<Metadata> {
  const { tag } = await props.params;
  const result = getTagPosts(posts, tag);
  if (!result) notFound();

  return pageMeta(
    result.tag.url,
    {
      title: t.blog.taggedTitle(result.tag.name),
      description: t.blog.taggedDescription(result.tag.name),
    },
    ogImage.tag(result.tag.slug),
  );
}

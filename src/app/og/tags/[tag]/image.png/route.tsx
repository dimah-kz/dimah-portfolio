import { getPosts, getTagPosts, getTags } from "@/lib/blog";
import { t } from "@/lib/i18n";
import { OgCard, OgProjectArt } from "@/lib/og/card";
import { ogImageResponse } from "@/lib/og/render";
import { projectByTag } from "@/lib/projects";
import { blogSource } from "@/lib/source";
import { notFound } from "next/navigation";

export const revalidate = false;
export const dynamicParams = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<"/og/tags/[tag]/image.png">,
) {
  const { tag } = await params;
  const result = getTagPosts(getPosts(blogSource.getPages()), tag);
  if (!result) notFound();

  const project = projectByTag(result.tag.name);

  return ogImageResponse(
    <OgCard
      eyebrow={t.blog.tags}
      title={result.tag.name}
      description={project?.description ?? t.blog.taggedDescription(result.tag.name)}
      meta={[t.blog.posts(result.posts.length)]}
      art={project ? <OgProjectArt project={project} /> : undefined}
    />,
  );
}

export function generateStaticParams() {
  return getTags(getPosts(blogSource.getPages())).map((tag) => ({ tag: tag.slug }));
}

import { findPost, getPosts } from "@/lib/blog";
import { formatDate, t } from "@/lib/i18n";
import { OgCard, OgProjectArt } from "@/lib/og/card";
import { ogImageResponse } from "@/lib/og/render";
import { projectsForTags } from "@/lib/projects";
import { blogSource } from "@/lib/source";
import { notFound } from "next/navigation";

export const revalidate = false;
export const dynamicParams = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<"/og/blog/[slug]/image.png">,
) {
  const { slug } = await params;
  const page = blogSource.getPage([slug]);
  const found = page && findPost(getPosts(blogSource.getPages()), page.url);
  if (!found) notFound();

  const { post } = found;
  // A post about one project shows its logo; a post about several shows none.
  const [project, ...others] = projectsForTags(post.tags.map((tag) => tag.name));

  return ogImageResponse(
    <OgCard
      eyebrow={t.nav.blog}
      title={post.title}
      description={post.description}
      meta={[
        ...(post.date ? [formatDate(post.date)] : []),
        ...(post.readingTime ? [t.blog.readingTime(post.readingTime)] : []),
      ]}
      art={project && others.length === 0 ? <OgProjectArt project={project} /> : undefined}
    />,
  );
}

export function generateStaticParams() {
  return blogSource.getPages().flatMap((page) => {
    const slug = page.slugs[0];
    return slug ? [{ slug }] : [];
  });
}

import { t } from "@/lib/i18n";
import { OgCard, OgProjectArt, OgProjectsArt } from "@/lib/og/card";
import { ogImageResponse } from "@/lib/og/render";
import { projectForDocsSlug, projects } from "@/lib/projects";
import { source } from "@/lib/source";
import { notFound } from "next/navigation";

export const revalidate = false;
export const dynamicParams = false;

/** `/og/docs/<page slugs>/image.png`, see `getPageImageUrl()`. */
export async function GET(_req: Request, { params }: RouteContext<"/og/docs/[...slug]">) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  const project = projectForDocsSlug(page.slugs[0]);
  // A project's pages name the project above their own title.
  const eyebrow =
    project && page.data.title !== project.name
      ? `${t.nav.docs} · ${project.name}`
      : t.nav.docs;

  return ogImageResponse(
    <OgCard
      eyebrow={eyebrow}
      title={page.data.title}
      description={page.data.description}
      art={
        project ? <OgProjectArt project={project} /> : <OgProjectsArt projects={projects} />
      }
    />,
  );
}

export function generateStaticParams() {
  return source.generateParams().map((item) => ({
    ...item,
    slug: [...item.slug, "image.png"],
  }));
}

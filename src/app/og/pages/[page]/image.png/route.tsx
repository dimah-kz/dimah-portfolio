import { t } from "@/lib/i18n";
import { OgAvatarArt, OgCard, OgProjectsArt } from "@/lib/og/card";
import { ogImageResponse } from "@/lib/og/render";
import { projects } from "@/lib/projects";
import { type OgPage, ogPages } from "@/lib/seo";
import { findProfile } from "@/lib/links";
import { site } from "@/lib/site";
import { posts } from "@/lib/source";
import { notFound } from "next/navigation";

export const revalidate = false;
export const dynamicParams = false;

const cards: Record<OgPage, () => Parameters<typeof OgCard>[0]> = {
  home: () => ({
    eyebrow: findProfile("github")?.handle,
    title: site.home.headline,
    titleAccent: site.home.headlineAccent,
    description: site.author.tagline,
    meta: [
      t.stats.projects(projects.length),
      ...(posts.length > 0 ? [t.blog.posts(posts.length)] : []),
    ],
    art: <OgAvatarArt />,
  }),
  projects: () => ({
    eyebrow: t.nav.projects,
    title: t.projects.title,
    description: t.projects.description,
    meta: [t.stats.projects(projects.length)],
    art: <OgProjectsArt projects={projects} />,
  }),
  blog: () => ({
    eyebrow: t.nav.blog,
    title: t.blog.title,
    description: t.blog.description,
    meta: [t.blog.posts(posts.length)],
    art: <OgAvatarArt />,
  }),
  tags: () => ({
    eyebrow: t.nav.blog,
    title: t.blog.allTags,
    description: t.blog.tagsDescription,
  }),
};

export async function GET(
  _req: Request,
  { params }: RouteContext<"/og/pages/[page]/image.png">,
) {
  const { page } = await params;
  const card = cards[page as OgPage];
  if (!card) notFound();

  return ogImageResponse(<OgCard {...card()} />);
}

export function generateStaticParams() {
  return ogPages.map((page) => ({ page }));
}

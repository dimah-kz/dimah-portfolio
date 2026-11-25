import { getPosts } from "@/lib/blog";
import { t } from "@/lib/i18n";
import { OgAvatarArt, OgCard, OgProjectsArt } from "@/lib/og/card";
import { ogImageResponse } from "@/lib/og/render";
import { projects } from "@/lib/projects";
import { type OgPage, ogPages } from "@/lib/seo";
import { site } from "@/lib/site";
import { blogSource } from "@/lib/source";
import { notFound } from "next/navigation";

export const revalidate = false;
export const dynamicParams = false;

const cards: Record<OgPage, () => Parameters<typeof OgCard>[0]> = {
  home: () => ({
    eyebrow: site.author.github,
    title: site.home.headline,
    titleAccent: site.home.headlineAccent,
    description: site.author.tagline,
    meta: [t.stats.projects(projects.length), t.blog.posts(postCount())],
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
    meta: [t.blog.posts(postCount())],
    art: <OgAvatarArt />,
  }),
  tags: () => ({
    eyebrow: t.nav.blog,
    title: t.blog.allTags,
    description: t.blog.tagsDescription,
  }),
};

function postCount() {
  return getPosts(blogSource.getPages()).length;
}

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

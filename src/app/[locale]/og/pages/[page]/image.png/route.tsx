import { isLocale, type Locale, locales } from "@/i18n/locales";
import { findProfile } from "@/lib/links";
import { OgAvatarArt, OgCard, OgProjectsArt } from "@/lib/og/card";
import { ogImageResponse } from "@/lib/og/render";
import { getProjects } from "@/lib/projects";
import { type OgPage, ogPages } from "@/lib/seo";
import { siteCopy } from "@/lib/site";
import { postsIn } from "@/lib/source";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ComponentProps } from "react";

export const dynamicParams = false;

type Card = Omit<ComponentProps<typeof OgCard>, "locale">;

async function card(page: OgPage, locale: Locale): Promise<Card> {
  const t = await getTranslations({ locale });
  const projects = getProjects(locale);
  const posts = postsIn(locale);
  const copy = siteCopy(locale);

  switch (page) {
    case "home":
      return {
        eyebrow: findProfile("github")?.handle,
        title: copy.home.headline,
        titleAccent: copy.home.headlineAccent,
        description: copy.tagline,
        meta: [
          t("stats.projects", { count: projects.length }),
          ...(posts.length > 0
            ? [t("blog.posts", { count: posts.length })]
            : []),
        ],
        art: <OgAvatarArt />,
      };
    case "projects":
      return {
        eyebrow: t("nav.projects"),
        title: t("projects.title"),
        description: t("projects.description"),
        meta: [t("stats.projects", { count: projects.length })],
        art: <OgProjectsArt projects={projects} />,
      };
    case "blog":
      return {
        eyebrow: t("nav.blog"),
        title: t("blog.title"),
        description: t("blog.description"),
        meta: [t("blog.posts", { count: posts.length })],
        art: <OgAvatarArt />,
      };
    case "tags":
      return {
        eyebrow: t("nav.blog"),
        title: t("blog.allTags"),
        description: t("blog.tagsDescription"),
      };
  }
}

export async function GET(
  _req: Request,
  { params }: RouteContext<"/[locale]/og/pages/[page]/image.png">,
) {
  const { locale, page } = await params;
  if (!isLocale(locale) || !ogPages.includes(page as OgPage)) notFound();

  return ogImageResponse(
    <OgCard locale={locale} {...await card(page as OgPage, locale)} />,
  );
}

export function generateStaticParams() {
  return locales.flatMap((locale) => ogPages.map((page) => ({ locale, page })));
}

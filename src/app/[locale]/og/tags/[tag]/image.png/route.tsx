import { isLocale, locales } from "@/i18n/locales";
import { getTagPosts, getTags } from "@/lib/blog";
import { OgCard, OgProjectArt } from "@/lib/og/card";
import { ogImageResponse } from "@/lib/og/render";
import { projectByTag } from "@/lib/projects";
import { postsIn } from "@/lib/source";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<"/[locale]/og/tags/[tag]/image.png">,
) {
  const { locale, tag } = await params;
  const result = isLocale(locale)
    ? getTagPosts(postsIn(locale), tag)
    : undefined;
  if (!isLocale(locale) || !result) notFound();

  const t = await getTranslations({ locale, namespace: "blog" });
  const project = projectByTag(locale, result.tag.name);

  return ogImageResponse(
    <OgCard
      locale={locale}
      eyebrow={t("tags")}
      title={result.tag.name}
      description={
        project?.description ?? t("taggedDescription", { tag: result.tag.name })
      }
      meta={[t("posts", { count: result.posts.length })]}
      art={project ? <OgProjectArt project={project} /> : undefined}
    />,
  );
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getTags(postsIn(locale)).map((tag) => ({ locale, tag: tag.slug })),
  );
}

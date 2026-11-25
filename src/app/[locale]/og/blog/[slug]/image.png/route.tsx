import { isLocale, locales } from "@/i18n/locales";
import { findPost } from "@/lib/blog";
import { OgCard, OgProjectArt } from "@/lib/og/card";
import { ogImageResponse } from "@/lib/og/render";
import { projectsForTags } from "@/lib/projects";
import { postsIn } from "@/lib/source";
import { getFormatter, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<"/[locale]/og/blog/[slug]/image.png">,
) {
  const { locale, slug } = await params;
  const found = isLocale(locale) ? findPost(postsIn(locale), slug) : undefined;
  if (!isLocale(locale) || !found) notFound();

  const t = await getTranslations({ locale });
  const format = await getFormatter({ locale });
  const { post } = found;
  // A post about one project shows its logo; a post about several shows none.
  const [project, ...others] = projectsForTags(
    locale,
    post.tags.map((tag) => tag.name),
  );

  return ogImageResponse(
    <OgCard
      locale={locale}
      eyebrow={t("nav.blog")}
      title={post.title}
      description={post.description}
      meta={[
        ...(post.date ? [format.dateTime(post.date, "date")] : []),
        ...(post.readingTime
          ? [t("blog.readingTime", { minutes: post.readingTime })]
          : []),
      ]}
      art={
        project && others.length === 0 ? (
          <OgProjectArt project={project} />
        ) : undefined
      }
    />,
  );
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    postsIn(locale).map((post) => ({ locale, slug: post.slug })),
  );
}

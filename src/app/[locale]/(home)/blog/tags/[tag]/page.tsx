import { localeParam } from "@/i18n/params";
import { BlogBackLink, BlogList, BlogTagCloud } from "@/components/blog";
import { Container, PageHeader } from "@/components/layout/section";
import { ProjectLogo } from "@/components/project-logo";
import { locales } from "@/i18n/locales";
import { getTagPosts, getTags } from "@/lib/blog";
import { projectByTag } from "@/lib/projects";
import { ogImage, pageMeta } from "@/lib/seo";
import { postsIn, tagLocales } from "@/lib/source";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export default async function BlogTagPage(
  props: PageProps<"/[locale]/blog/tags/[tag]">,
) {
  const { tag } = await props.params;
  const locale = await localeParam(props.params);
  setRequestLocale(locale);

  const t = await getTranslations("blog");
  const posts = postsIn(locale);
  const result = getTagPosts(posts, tag);
  if (!result) notFound();

  const project = projectByTag(locale, result.tag.name);

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
            : t("taggedDescription", { tag: result.tag.name })
        }
      >
        <div className="pt-2">
          <BlogTagCloud tags={getTags(posts)} active={result.tag.slug} />
        </div>
      </PageHeader>
      <Container className="pt-8 pb-20 sm:pt-10">
        <BlogList posts={result.posts} />
      </Container>
    </main>
  );
}

/** Each language builds only the tags its posts use. */
export function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  const locale = locales.find((item) => item === params.locale);
  return locale
    ? getTags(postsIn(locale)).map((tag) => ({ tag: tag.slug }))
    : [];
}

export async function generateMetadata(
  props: PageProps<"/[locale]/blog/tags/[tag]">,
): Promise<Metadata> {
  const { tag } = await props.params;
  const locale = await localeParam(props.params);
  const result = getTagPosts(postsIn(locale), tag);
  if (!result) notFound();

  const t = await getTranslations({ locale, namespace: "blog" });

  return pageMeta(
    locale,
    result.tag.path,
    {
      title: t("taggedTitle", { tag: result.tag.name }),
      description: t("taggedDescription", { tag: result.tag.name }),
    },
    {
      image: ogImage.tag(result.tag.slug, locale),
      translations: tagLocales(result.tag.slug),
    },
  );
}

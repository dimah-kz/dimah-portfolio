import { localeParam } from "@/i18n/params";
import { BlogFeedLink, BlogList, BlogTagCloud } from "@/components/blog";
import { JsonLd } from "@/components/json-ld";
import { Container, PageHeader } from "@/components/layout/section";
import { locales } from "@/i18n/locales";
import { getTags } from "@/lib/blog";
import { blogJsonLd, ogImage, pageMeta } from "@/lib/seo";
import { postsIn } from "@/lib/source";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata(
  props: PageProps<"/[locale]/blog">,
): Promise<Metadata> {
  const locale = await localeParam(props.params);
  const t = await getTranslations({ locale, namespace: "blog" });

  return pageMeta(
    locale,
    "/blog",
    { title: t("title"), description: t("description") },
    {
      image: ogImage.page("blog", locale),
      translations: locales.filter((item) => postsIn(item).length > 0),
    },
  );
}

export default async function BlogIndexPage(
  props: PageProps<"/[locale]/blog">,
) {
  const locale = await localeParam(props.params);
  setRequestLocale(locale);

  const t = await getTranslations("blog");
  const posts = postsIn(locale);
  const tags = getTags(posts);

  return (
    <main id="main" className="flex flex-1 flex-col">
      <JsonLd data={blogJsonLd(locale, posts)} />
      <PageHeader title={t("title")} description={t("description")}>
        <div className="flex flex-col gap-4 pt-2">
          {tags.length > 0 ? <BlogTagCloud tags={tags} /> : null}
          <BlogFeedLink />
        </div>
      </PageHeader>
      <Container className="pt-8 pb-20 sm:pt-10">
        <BlogList posts={posts} />
      </Container>
    </main>
  );
}

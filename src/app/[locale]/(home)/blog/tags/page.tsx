import { localeParam } from "@/i18n/params";
import { BlogBackLink, BlogTagCloud } from "@/components/blog";
import { PageHeader } from "@/components/layout/section";
import { locales } from "@/i18n/locales";
import { getTags } from "@/lib/blog";
import { ogImage, pageMeta } from "@/lib/seo";
import { postsIn } from "@/lib/source";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata(
  props: PageProps<"/[locale]/blog/tags">,
): Promise<Metadata> {
  const locale = await localeParam(props.params);
  const t = await getTranslations({ locale, namespace: "blog" });

  return pageMeta(
    locale,
    "/blog/tags",
    { title: t("allTags"), description: t("tagsDescription") },
    {
      image: ogImage.page("tags", locale),
      translations: locales.filter((item) => getTags(postsIn(item)).length > 0),
    },
  );
}

export default async function BlogTagsPage(
  props: PageProps<"/[locale]/blog/tags">,
) {
  const locale = await localeParam(props.params);
  setRequestLocale(locale);

  const t = await getTranslations("blog");

  return (
    <main id="main" className="flex flex-1 flex-col">
      <PageHeader
        eyebrow={<BlogBackLink />}
        title={t("allTags")}
        description={t("tagsDescription")}
      >
        <div className="pt-2">
          <BlogTagCloud tags={getTags(postsIn(locale))} />
        </div>
      </PageHeader>
    </main>
  );
}

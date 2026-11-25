import { localeParam } from "@/i18n/params";
import {
  BlogBackLink,
  BlogBody,
  BlogByline,
  BlogDescription,
  BlogHeader,
  BlogPage,
  BlogPostNav,
  BlogTags,
  BlogTitle,
} from "@/components/blog";
import { JsonLd } from "@/components/json-ld";
import { getMDXComponents } from "@/components/mdx";
import { locales } from "@/i18n/locales";
import { findPost } from "@/lib/blog";
import { articleJsonLd, ogImage, pageMeta } from "@/lib/seo";
import { blogSource, postLocales, postsIn } from "@/lib/source";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export default async function BlogPostPage(
  props: PageProps<"/[locale]/blog/[slug]">,
) {
  const { slug } = await props.params;
  const locale = await localeParam(props.params);
  setRequestLocale(locale);

  const page = blogSource.getPage([slug], locale);
  const found = findPost(postsIn(locale), slug);
  if (!page || !found) notFound();

  const { post, newer, older } = found;
  const MDX = page.data.body;

  return (
    <main id="main" className="relative isolate flex flex-1 flex-col">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-14 -z-10 h-[28rem] bg-wash"
      />
      <JsonLd data={articleJsonLd(locale, post, ogImage.post(slug, locale))} />
      <BlogPage toc={page.data.toc}>
        <BlogHeader>
          <BlogBackLink />
          <BlogTags tags={post.tags} />
          <div className="flex flex-col gap-3">
            <BlogTitle>{post.title}</BlogTitle>
            <BlogDescription>{post.description}</BlogDescription>
          </div>
          <BlogByline post={post} />
        </BlogHeader>
        <BlogBody>
          <MDX components={getMDXComponents()} />
        </BlogBody>
        <BlogPostNav newer={newer} older={older} />
      </BlogPage>
    </main>
  );
}

/** Each language builds only the posts written in it. */
export function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  const locale = locales.find((item) => item === params.locale);
  return locale ? postsIn(locale).map((post) => ({ slug: post.slug })) : [];
}

export async function generateMetadata(
  props: PageProps<"/[locale]/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const locale = await localeParam(props.params);
  const found = findPost(postsIn(locale), slug);
  if (!found) notFound();

  const { post } = found;
  const translations = postLocales(slug);

  return pageMeta(
    locale,
    post.path,
    {
      title: post.title,
      description: post.description,
      openGraph: {
        type: "article",
        authors: post.authors.map((author) => author.name),
        tags: post.tags.map((tag) => tag.name),
        ...(post.date ? { publishedTime: post.date.toISOString() } : {}),
      },
    },
    { image: ogImage.post(slug, locale), translations },
  );
}

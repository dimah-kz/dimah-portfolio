import {
  BlogAuthors,
  BlogBackLink,
  BlogBody,
  BlogDate,
  BlogDescription,
  BlogHeader,
  BlogPage,
  BlogPostNav,
  BlogTags,
  BlogTitle,
} from "@/components/blog";
import { JsonLd } from "@/components/json-ld";
import { getMDXComponents } from "@/components/mdx";
import { findPost, getPosts } from "@/lib/blog";
import { articleJsonLd, pageMeta } from "@/lib/seo";
import { blogAuthors, blogSource } from "@/lib/source";
import { site } from "@/lib/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export default async function Page(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const page = blogSource.getPage([slug]);
  const found =
    page && findPost(getPosts(blogSource.getPages(), blogAuthors), page.url);
  if (!page || !found) notFound();

  const { post, newer, older } = found;
  const MDX = page.data.body;

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          type: "BlogPosting",
          pathname: post.url,
          title: post.title,
          description: post.description,
          datePublished: post.date,
          image: `/og/blog/${slug}/image.png`,
        })}
      />
      <BlogPage toc={page.data.toc}>
        <BlogHeader>
          <BlogBackLink href="/blog" />
          <BlogTitle>{post.title}</BlogTitle>
          <BlogDescription>{post.description}</BlogDescription>
          <BlogAuthors authors={post.authors} />
          <BlogTags tags={post.tags} />
          {post.date ? <BlogDate date={post.date} /> : null}
        </BlogHeader>
        <BlogBody>
          <MDX components={getMDXComponents()} />
        </BlogBody>
        <BlogPostNav newer={newer} older={older} />
      </BlogPage>
    </>
  );
}

export function generateStaticParams() {
  return blogSource.getPages().flatMap((page) => {
    const slug = page.slugs[0];
    return slug ? [{ slug }] : [];
  });
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const page = blogSource.getPage([slug]);
  if (!page) notFound();

  const found = findPost(
    getPosts(blogSource.getPages(), blogAuthors),
    page.url,
  );
  const published = found?.post.date?.toISOString();

  return pageMeta(page.url, {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      type: "article",
      images: {
        url: `/og/blog/${slug}/image.png`,
        width: 1200,
        height: 630,
        alt: page.data.title,
      },
      authors: [site.author.name],
      ...(published ? { publishedTime: published } : {}),
    },
  });
}

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
import { findPost, getPosts } from "@/lib/blog";
import { articleJsonLd, ogImage, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { blogAuthors, blogSource } from "@/lib/source";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const page = blogSource.getPage([slug]);
  const found =
    page && findPost(getPosts(blogSource.getPages(), blogAuthors), page.url);
  if (!page || !found) notFound();

  const { post, newer, older } = found;
  const MDX = page.data.body;

  return (
    <main id="main" className="relative isolate flex flex-1 flex-col">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-14 -z-10 h-[32rem] bg-grid"
      />
      <JsonLd
        data={articleJsonLd({
          type: "BlogPosting",
          pathname: post.url,
          title: post.title,
          description: post.description,
          datePublished: post.date,
          image: ogImage.post(slug),
        })}
      />
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

  return pageMeta(
    page.url,
    {
      title: page.data.title,
      description: page.data.description,
      openGraph: {
        type: "article",
        authors: [site.author.name],
        tags: found?.post.tags.map((tag) => tag.name),
        ...(published ? { publishedTime: published } : {}),
      },
    },
    ogImage.post(slug),
  );
}

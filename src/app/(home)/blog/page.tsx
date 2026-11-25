import { BlogCards, BlogFeedLink, BlogTagCloud } from "@/components/blog";
import { Container, PageHeader } from "@/components/layout/section";
import { getPosts, getTags } from "@/lib/blog";
import { t } from "@/lib/i18n";
import { ogImage, pageMeta } from "@/lib/seo";
import { blogAuthors, blogSource } from "@/lib/source";
import type { Metadata } from "next";

export const metadata: Metadata = pageMeta(
  "/blog",
  { title: t.blog.title, description: t.blog.description },
  ogImage.page("blog"),
);

export default function BlogIndexPage() {
  const posts = getPosts(blogSource.getPages(), blogAuthors);
  const tags = getTags(posts);

  return (
    <main id="main" className="flex flex-1 flex-col">
      <PageHeader title={t.blog.title} description={t.blog.description}>
        <div className="flex flex-col gap-4 pt-2">
          {tags.length > 0 ? <BlogTagCloud tags={tags} /> : null}
          <BlogFeedLink />
        </div>
      </PageHeader>
      <Container className="py-12 sm:py-16">
        <BlogCards posts={posts} latestUrl={posts[0]?.url} />
      </Container>
    </main>
  );
}

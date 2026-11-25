import { BlogBackLink, BlogTagCloud } from "@/components/blog";
import { PageHeader } from "@/components/layout/section";
import { getPosts, getTags } from "@/lib/blog";
import { t } from "@/lib/i18n";
import { ogImage, pageMeta } from "@/lib/seo";
import { blogSource } from "@/lib/source";
import type { Metadata } from "next";

export const metadata: Metadata = pageMeta(
  "/blog/tags",
  { title: t.blog.allTags, description: t.blog.tagsDescription },
  ogImage.page("tags"),
);

export default function BlogTagsPage() {
  const tags = getTags(getPosts(blogSource.getPages()));

  return (
    <main id="main" className="flex flex-1 flex-col">
      <PageHeader
        eyebrow={<BlogBackLink />}
        title={t.blog.allTags}
        description={t.blog.tagsDescription}
      >
        <div className="pt-2">
          <BlogTagCloud tags={tags} />
        </div>
      </PageHeader>
    </main>
  );
}

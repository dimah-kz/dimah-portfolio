import { Hero } from "@/components/home/hero";
import {
  ContactSection,
  PrinciplesSection,
  WorkSection,
  WritingSection,
} from "@/components/home/sections";
import { getPosts } from "@/lib/blog";
import { t } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { pageMeta } from "@/lib/seo";
import { blogAuthors, blogSource, source } from "@/lib/source";
import type { Metadata } from "next";

export const metadata: Metadata = pageMeta("/");

/** Posts on the home page. The rest are on `/blog`. */
const latestPostCount = 3;

export default function HomePage() {
  const posts = getPosts(blogSource.getPages(), blogAuthors);

  // Counted from the content, so the numbers never go stale.
  const stats = [
    { value: projects.length, label: t.stats.projectsLabel, href: "/projects" },
    { value: posts.length, label: t.stats.postsLabel, href: "/blog" },
    { value: source.getPages().length, label: t.stats.docsLabel, href: "/docs" },
  ].filter((stat) => stat.value > 0);

  return (
    <main id="main" className="flex flex-1 flex-col">
      <Hero latest={posts[0]} stats={stats} />
      <WorkSection />
      <PrinciplesSection />
      <WritingSection posts={posts.slice(0, latestPostCount)} />
      <ContactSection />
    </main>
  );
}

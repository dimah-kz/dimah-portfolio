import { JsonLd } from "@/components/json-ld";
import { Hero } from "@/components/home/hero";
import {
  ContactSection,
  ExperienceSection,
  PrinciplesSection,
  WorkSection,
  WritingSection,
} from "@/components/home/sections";
import { t } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { pageMeta, profilePageJsonLd } from "@/lib/seo";
import { posts } from "@/lib/source";
import type { Metadata } from "next";

export const metadata: Metadata = pageMeta("/");

/** Posts on the home page. The rest are on `/blog`. */
const latestPostCount = 3;

export default function HomePage() {
  // Counted from the content, so the numbers never go stale.
  const stats = [
    { value: projects.length, label: t.stats.projectsLabel, href: "/projects" },
    { value: posts.length, label: t.stats.postsLabel, href: "/blog" },
  ].filter((stat) => stat.value > 0);

  return (
    <main id="main" className="flex flex-1 flex-col">
      <JsonLd data={profilePageJsonLd()} />
      <Hero latest={posts[0]} stats={stats} />
      <WorkSection />
      <ExperienceSection />
      <PrinciplesSection />
      <WritingSection posts={posts.slice(0, latestPostCount)} />
      <ContactSection />
    </main>
  );
}

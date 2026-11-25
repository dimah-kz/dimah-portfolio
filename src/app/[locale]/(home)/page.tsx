import { localeParam } from "@/i18n/params";
import { Hero } from "@/components/home/hero";
import {
  ContactSection,
  ExperienceSection,
  PrinciplesSection,
  WorkSection,
  WritingSection,
} from "@/components/home/sections";
import { JsonLd } from "@/components/json-ld";
import { getProjects } from "@/lib/projects";
import { pageMeta, profilePageJsonLd } from "@/lib/seo";
import { postsIn } from "@/lib/source";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

/** Posts on the home page. The rest are on `/blog`. */
const latestPostCount = 3;

export async function generateMetadata(
  props: PageProps<"/[locale]">,
): Promise<Metadata> {
  return pageMeta(await localeParam(props.params), "/");
}

export default async function HomePage(props: PageProps<"/[locale]">) {
  const locale = await localeParam(props.params);
  setRequestLocale(locale);

  const t = await getTranslations("stats");
  const posts = postsIn(locale);
  // Counted from the content, so the numbers never go stale.
  const stats = [
    {
      value: getProjects(locale).length,
      label: t("projectsLabel"),
      href: "/projects",
    },
    { value: posts.length, label: t("postsLabel"), href: "/blog" },
  ].filter((stat) => stat.value > 0);

  return (
    <main id="main" className="flex flex-1 flex-col">
      <JsonLd data={profilePageJsonLd(locale)} />
      <Hero latest={posts[0]} stats={stats} />
      <WorkSection />
      <ExperienceSection />
      <PrinciplesSection />
      <WritingSection posts={posts.slice(0, latestPostCount)} />
      <ContactSection />
    </main>
  );
}

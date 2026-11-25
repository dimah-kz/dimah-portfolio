import { localeParam } from "@/i18n/params";
import { Hero } from "@/components/home/hero";
import {
  AboutSection,
  ContactSection,
  ExperienceSection,
  JourneySection,
  WorkSection,
  WritingSection,
} from "@/components/home/sections";
import { JsonLd } from "@/components/json-ld";
import { pageMeta, profilePageJsonLd } from "@/lib/seo";
import { postsIn } from "@/lib/source";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

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

  return (
    <main id="main" className="flex flex-1 flex-col">
      <JsonLd data={profilePageJsonLd(locale)} />
      <Hero />
      <WorkSection />
      <AboutSection />
      <JourneySection />
      <ExperienceSection />
      <WritingSection posts={postsIn(locale).slice(0, latestPostCount)} />
      <ContactSection />
    </main>
  );
}

import { localeParam } from "@/i18n/params";
import { JsonLd } from "@/components/json-ld";
import { ExperienceList } from "@/components/experience";
import {
  Container,
  PageHeader,
  SectionHeader,
} from "@/components/layout/section";
import { ProjectGrid } from "@/components/project-card";
import { BlurFade } from "@/components/ui/blur-fade";
import { Empty, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { getExperience } from "@/lib/experience";
import { getProjects } from "@/lib/projects";
import { ogImage, pageMeta, projectsJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata(
  props: PageProps<"/[locale]/projects">,
): Promise<Metadata> {
  const locale = await localeParam(props.params);
  const t = await getTranslations({ locale, namespace: "projects" });

  return pageMeta(
    locale,
    "/projects",
    { title: t("title"), description: t("description") },
    { image: ogImage.page("projects", locale) },
  );
}

export default async function ProjectsPage(
  props: PageProps<"/[locale]/projects">,
) {
  const locale = await localeParam(props.params);
  setRequestLocale(locale);

  const t = await getTranslations();
  const projects = getProjects(locale);
  const experience = getExperience(locale);

  return (
    <main id="main" className="flex flex-1 flex-col">
      <JsonLd data={projectsJsonLd(locale)} />
      <PageHeader
        title={t("projects.title")}
        description={t("projects.description")}
      />
      <Container className="flex flex-col gap-16 pt-8 pb-20 sm:pt-10">
        {projects.length > 0 ? (
          <ProjectGrid projects={projects} detailed />
        ) : (
          <Empty className="border">
            <EmptyHeader>
              <EmptyTitle>{t("projects.empty")}</EmptyTitle>
            </EmptyHeader>
          </Empty>
        )}
        {experience.length > 0 ? (
          <section
            aria-labelledby="experience-title"
            className="flex flex-col gap-7"
          >
            <BlurFade inView>
              <SectionHeader
                id="experience-title"
                title={t("experience.title")}
                description={t("experience.description")}
              />
            </BlurFade>
            <BlurFade inView delay={0.06}>
              <ExperienceList roles={experience} />
            </BlurFade>
          </section>
        ) : null}
      </Container>
    </main>
  );
}

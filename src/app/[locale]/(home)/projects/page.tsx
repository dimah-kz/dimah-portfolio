import { localeParam } from "@/i18n/params";
import { JsonLd } from "@/components/json-ld";
import {
  PageHeader,
  Section,
  SectionHeader,
} from "@/components/layout/section";
import { ProjectCard, ProjectList } from "@/components/project-card";
import { Empty, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
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

  const t = await getTranslations("projects");
  const projects = getProjects(locale);
  const featured = projects.filter((project) => project.featured);
  const other = projects.filter((project) => !project.featured);

  return (
    <main id="main" className="flex flex-1 flex-col">
      <JsonLd data={projectsJsonLd(locale)} />
      <PageHeader title={t("title")} description={t("description")} />

      {projects.length === 0 ? (
        <Section>
          <Empty className="border">
            <EmptyHeader>
              <EmptyTitle>{t("empty")}</EmptyTitle>
            </EmptyHeader>
          </Empty>
        </Section>
      ) : null}

      {featured.length > 0 ? (
        <Section aria-labelledby="featured-title">
          <SectionHeader id="featured-title" title={t("featured")} />
          <div className="grid gap-4 md:grid-cols-2">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Section>
      ) : null}

      {other.length > 0 ? (
        <Section aria-labelledby="other-title" className="pt-0 sm:pt-0">
          <SectionHeader id="other-title" title={t("other")} />
          <ProjectList projects={other} />
        </Section>
      ) : null}
    </main>
  );
}

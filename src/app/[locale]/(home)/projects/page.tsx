import { localeParam } from "@/i18n/params";
import { JsonLd } from "@/components/json-ld";
import { Container, PageHeader } from "@/components/layout/section";
import { ProjectGrid } from "@/components/project-card";
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

  return (
    <main id="main" className="flex flex-1 flex-col">
      <JsonLd data={projectsJsonLd(locale)} />
      <PageHeader title={t("title")} description={t("description")} />
      <Container className="pt-8 pb-20 sm:pt-10">
        {projects.length > 0 ? (
          <ProjectGrid projects={projects} detailed />
        ) : (
          <Empty className="border">
            <EmptyHeader>
              <EmptyTitle>{t("empty")}</EmptyTitle>
            </EmptyHeader>
          </Empty>
        )}
      </Container>
    </main>
  );
}

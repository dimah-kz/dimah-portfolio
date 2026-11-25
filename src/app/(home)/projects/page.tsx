import {
  PageHeader,
  Section,
  SectionHeader,
} from "@/components/layout/section";
import { ProjectCard, ProjectList } from "@/components/project-card";
import { Empty, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { JsonLd } from "@/components/json-ld";
import { t } from "@/lib/i18n";
import { featuredProjects, otherProjects, projects } from "@/lib/projects";
import { ogImage, pageMeta, projectsJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMeta(
  "/projects",
  { title: t.projects.title, description: t.projects.description },
  ogImage.page("projects"),
);

export default function ProjectsPage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <JsonLd data={projectsJsonLd()} />
      <PageHeader
        title={t.projects.title}
        description={t.projects.description}
      />

      {projects.length === 0 ? (
        <Section>
          <Empty className="border">
            <EmptyHeader>
              <EmptyTitle>{t.projects.empty}</EmptyTitle>
            </EmptyHeader>
          </Empty>
        </Section>
      ) : null}

      {featuredProjects.length > 0 ? (
        <Section aria-labelledby="featured-title">
          <SectionHeader id="featured-title" title={t.projects.featured} />
          <div className="grid gap-4 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Section>
      ) : null}

      {otherProjects.length > 0 ? (
        <Section aria-labelledby="other-title" className="pt-0 sm:pt-0">
          <SectionHeader id="other-title" title={t.projects.other} />
          <ProjectList projects={otherProjects} />
        </Section>
      ) : null}
    </main>
  );
}

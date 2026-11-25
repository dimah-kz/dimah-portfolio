import { PageHeader, Section, SectionHeader } from "@/components/layout/section";
import { ProjectCard, ProjectList } from "@/components/project-card";
import { t } from "@/lib/i18n";
import { featuredProjects, otherProjects } from "@/lib/projects";
import { ogImage, pageMeta } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMeta(
  "/projects",
  { title: t.projects.title, description: t.projects.description },
  ogImage.page("projects"),
);

export default function ProjectsPage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <PageHeader title={t.projects.title} description={t.projects.description} />

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

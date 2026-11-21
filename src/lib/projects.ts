/**
 * Published projects. Short blurbs match the home page and docs.
 * Logo geometry lives in `src/components/brand.tsx`, copied from each repo.
 */
export const projects = [
  {
    id: "starter",
    name: "dimah-starter",
    description:
      "Server-first Next.js 16 starter for multi-tenant SaaS. Organizations, roles, and an admin panel, with writes as Server Actions.",
    docs: "/docs/starter",
    live: "https://starter.dimah.dev",
    repository: "https://github.com/dimah-kz/dimah-starter",
    tag: "dimah-starter",
    group: "primary",
  },
  {
    id: "s3",
    name: "dimah-s3",
    description:
      "Full-stack S3 toolkit for React. The server signs the upload, the browser talks to the bucket, and credentials stay on the backend.",
    docs: "/docs/s3",
    live: "https://s3.dimah.dev",
    repository: "https://github.com/dimah-kz/dimah-s3",
    tag: "dimah-s3",
    group: "primary",
  },
  {
    id: "form",
    name: "dimah-form",
    description:
      "Backend-first form infrastructure for TypeScript servers and React clients.",
    live: "https://form.dimah.dev",
    repository: "https://github.com/dimah-kz/dimah-form",
    group: "other",
  },
  {
    id: "survey",
    name: "dimah-survey",
    description: "A backend for SurveyJS. SurveyJS stays the form.",
    live: "https://survey.dimah.dev",
    repository: "https://github.com/dimah-kz/dimah-survey",
    group: "other",
  },
] as const;

export type Project = (typeof projects)[number];
export type ProjectId = Project["id"];

const projectIds = new Set<string>(projects.map((project) => project.id));

export function isProjectId(icon: string): icon is ProjectId {
  return projectIds.has(icon);
}

export function projectsIn(group: Project["group"]): Project[] {
  return projects.filter((project) => project.group === group);
}

export function projectByTag(tag: string): Project | undefined {
  const key = tag.toLowerCase();
  return projects.find((project) =>
    "tag" in project ? project.tag.toLowerCase() === key : false,
  );
}

export function projectsForTags(tags: readonly string[]): Project[] {
  const seen = new Set<ProjectId>();
  const matches: Project[] = [];

  for (const tag of tags) {
    const project = projectByTag(tag);
    if (!project || seen.has(project.id)) continue;
    seen.add(project.id);
    matches.push(project);
  }

  return matches;
}

/** Docs section slug (`starter`, `s3`) for a page under that folder. */
export function projectForDocsSlug(slug: string | undefined): Project | undefined {
  if (!slug || !isProjectId(slug)) return;
  return projects.find((project) => project.id === slug);
}

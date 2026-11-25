import { defineCollections } from 'fumadocs-mdx/macro';
import { z } from 'zod';

/** Frontmatter of one `.mdx` file in `content/projects` per project. */
export const projectSchema = z.object({
  name: z.string(),
  /** One or two sentences. Shown on every card. */
  description: z.string(),
  /** Logo key in `src/components/brand.tsx`. Without one, the card shows the first letter. */
  mark: z.string().optional(),
  /** Featured projects get the large cards on the home page. */
  featured: z.boolean().default(false),
  /** Lower comes first. */
  order: z.number().default(100),
  /** Blog tag that belongs to this project. Posts with it show the project's logo. */
  tag: z.string().optional(),
  links: z.object({
    /** Docs path on this site, like `/docs/starter`. */
    docs: z.string().optional(),
    live: z.url().optional(),
    repository: z.url().optional(),
  }),
  /** Short points for the featured card. */
  highlights: z.array(z.string()).default([]),
  stack: z.array(z.string()).default([]),
});

// A `doc` collection, read for its frontmatter only. (`type: 'meta'` with YAML
// would fit better, but fumadocs-mdx 15.6 does not load macro meta collections.)
const collection = defineCollections({
  type: 'doc',
  dir: 'content/projects',
  schema: projectSchema,
});

export type Project = z.output<typeof projectSchema> & {
  /** File name without the extension. */
  slug: string;
};

/** Every project, ordered by `order`, then by name. */
export const projects: Project[] = collection.entries
  .map((entry) => ({
    ...projectSchema.parse(entry),
    slug: entry.info.path.replace(/\.mdx?$/, ''),
  }))
  .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));

export const featuredProjects = projects.filter((project) => project.featured);
export const otherProjects = projects.filter((project) => !project.featured);

export function projectByTag(tag: string): Project | undefined {
  const key = tag.toLowerCase();
  return projects.find((project) => project.tag?.toLowerCase() === key);
}

/** Projects of a post's tags, each once, in tag order. */
export function projectsForTags(tags: readonly string[]): Project[] {
  const matches = new Set<Project>();
  for (const tag of tags) {
    const project = projectByTag(tag);
    if (project) matches.add(project);
  }
  return [...matches];
}

/** The project whose docs live under `/docs/<slug>`. */
export function projectForDocsSlug(slug: string | undefined): Project | undefined {
  if (!slug) return;
  return projects.find((project) => project.links.docs === `/docs/${slug}`);
}

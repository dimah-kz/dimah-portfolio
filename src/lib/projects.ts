import type { Locale } from "@/i18n/locales";
import { defineCollections } from "fumadocs-mdx/macro";
import { z } from "zod";
import { localizedEntries } from "./localized-entries";

/** Frontmatter of one `.mdx` file per project in `content/projects`. */
export const projectSchema = z.object({
  name: z.string(),
  /** One or two sentences. Shown on every card. */
  description: z.string(),
  /**
   * Square image in `public/`, such as `/logos/my-project.svg`. Without one,
   * the card shows the first letter. A logo is drawn on light and dark pages,
   * so give it its own background.
   */
  logo: z
    .string()
    .startsWith("/", "A path in `public/`, starting with `/`.")
    .optional(),
  /** A badge next to the name. Leave it out for a project in normal use. */
  status: z.enum(["active", "beta", "archived"]).optional(),
  /** Featured projects come first, and the home page shows them before the rest. */
  featured: z.boolean().default(false),
  /** Lower comes first, among featured projects and among the rest. */
  order: z.number().default(100),
  /** Blog tag that belongs to this project. Posts with it show the project's logo. */
  tag: z.string().optional(),
  links: z
    .object({
      live: z.url().optional(),
      repository: z.url().optional(),
    })
    .default({}),
  /** Short points, shown on `/projects` and in the Markdown. */
  highlights: z.array(z.string()).default([]),
  stack: z.array(z.string()).default([]),
});

/** A translation, `<project>.<locale>.mdx`: only the fields that read differently. */
export const projectTranslationSchema = projectSchema
  .pick({ name: true, description: true, highlights: true })
  .partial();

// Read for its frontmatter only. (`type: 'meta'` with YAML would fit better,
// but fumadocs-mdx 15.6 does not load macro meta collections.)
const collection = defineCollections({
  type: "doc",
  dir: "content/projects",
});

export type Project = z.output<typeof projectSchema> & {
  /** File name without the extension and language. */
  slug: string;
};

const entries = localizedEntries(collection.entries, {
  base: projectSchema,
  translation: projectTranslationSchema,
  dir: "content/projects",
});

/** Every project in a language: featured first, then by `order`, then by name. */
export function getProjects(locale: Locale): Project[] {
  return [...entries(locale)].sort(
    (a, b) =>
      Number(b.featured) - Number(a.featured) ||
      a.order - b.order ||
      a.name.localeCompare(b.name),
  );
}

export function projectByTag(locale: Locale, tag: string): Project | undefined {
  const key = tag.toLowerCase();
  return getProjects(locale).find(
    (project) => project.tag?.toLowerCase() === key,
  );
}

/** Projects of a post's tags, each once, in tag order. */
export function projectsForTags(
  locale: Locale,
  tags: readonly string[],
): Project[] {
  const matches = new Set<Project>();
  for (const tag of tags) {
    const project = projectByTag(locale, tag);
    if (project) matches.add(project);
  }
  return [...matches];
}

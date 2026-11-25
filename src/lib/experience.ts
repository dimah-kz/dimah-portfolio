import { defineCollections } from "fumadocs-mdx/macro";
import { z } from "zod";

const month = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "A month as `YYYY-MM`, such as `2024-03`.");

/** Frontmatter of one `.mdx` file per role in `content/experience`. */
export const experienceSchema = z.object({
  role: z.string(),
  company: z.string(),
  /** The company's site. */
  url: z.url().optional(),
  location: z.string().optional(),
  /** First month, as `YYYY-MM`. */
  start: month,
  /** Last month, as `YYYY-MM`. Leave it out for a current role. */
  end: month.optional(),
  /** One or two sentences on what you did. */
  summary: z.string().optional(),
  stack: z.array(z.string()).default([]),
});

// Read for its frontmatter only, like `content/projects`.
const collection = defineCollections({
  type: "doc",
  dir: "content/experience",
  schema: experienceSchema,
});

export type Role = Omit<z.output<typeof experienceSchema>, "start" | "end"> & {
  slug: string;
  start: Date;
  /** `undefined` for a current role. */
  end?: Date;
};

function parseMonth(value: string): Date {
  const [year, month] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1));
}

/** Work history, current roles first, then by start month, newest first. */
export const experience: Role[] = collection.entries
  .map((entry) => {
    const data = experienceSchema.parse(entry);
    return {
      ...data,
      slug: entry.info.path.replace(/\.mdx?$/, ""),
      start: parseMonth(data.start),
      end: data.end ? parseMonth(data.end) : undefined,
    };
  })
  .sort(
    (a, b) =>
      Number(Boolean(a.end)) - Number(Boolean(b.end)) ||
      b.start.getTime() - a.start.getTime(),
  );

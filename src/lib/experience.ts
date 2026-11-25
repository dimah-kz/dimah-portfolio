import type { Locale } from "@/i18n/locales";
import { defineCollections } from "fumadocs-mdx/macro";
import { z } from "zod";
import { localizedEntries } from "./localized-entries";

const month = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "A month as `YYYY-MM`, such as `2024-03`.");

/** Frontmatter of one `.mdx` file per role in `content/experience`. */
export const experienceSchema = z.object({
  role: z.string(),
  company: z.string(),
  /** The company's site. */
  url: z.url().optional(),
  /**
   * Square image in `public/`, such as `/logos/my-company.svg`, drawn on light
   * and dark pages, so give it its own background. Leave it out to show none.
   */
  logo: z
    .string()
    .startsWith("/", "A path in `public/`, starting with `/`.")
    .optional(),
  location: z.string().optional(),
  /** First month, as `YYYY-MM`. */
  start: month,
  /** Last month, as `YYYY-MM`. Leave it out for a current role. */
  end: month.optional(),
  /** One or two sentences on what you did. A link is written `[text](https://…)`. */
  summary: z.string().optional(),
  stack: z.array(z.string()).default([]),
});

/** A translation, `<role>.<locale>.mdx`: only the fields that read differently. */
export const experienceTranslationSchema = experienceSchema
  .pick({ role: true, company: true, location: true, summary: true })
  .partial();

// Read for its frontmatter only, like `content/projects`.
const collection = defineCollections({
  type: "doc",
  dir: "content/experience",
});

export type Role = Omit<z.output<typeof experienceSchema>, "start" | "end"> & {
  slug: string;
  start: Date;
  /** `undefined` for a current role. */
  end?: Date;
};

const entries = localizedEntries(collection.entries, {
  base: experienceSchema,
  translation: experienceTranslationSchema,
  dir: "content/experience",
});

function parseMonth(value: string): Date {
  const [year, month] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1));
}

/** Work history in a language: current roles first, then the newest. */
export function getExperience(locale: Locale): Role[] {
  return entries(locale)
    .map((role) => ({
      ...role,
      start: parseMonth(role.start),
      end: role.end ? parseMonth(role.end) : undefined,
    }))
    .sort(
      (a, b) =>
        Number(Boolean(a.end)) - Number(Boolean(b.end)) ||
        b.start.getTime() - a.start.getTime(),
    );
}

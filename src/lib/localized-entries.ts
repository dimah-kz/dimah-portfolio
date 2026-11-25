import { defaultLocale, isLocale, type Locale } from "@/i18n/locales";
import type { z } from "zod";

interface Entry {
  info: { path: string };
}

function parse<T extends z.ZodType>(
  schema: T,
  entry: Entry,
  dir: string,
): z.output<T> {
  const result = schema.safeParse(entry);
  if (result.success) return result.data;
  throw new Error(
    `${dir}/${entry.info.path}: ${result.error.issues
      .map((issue) => `${issue.path.join(".") || "(root)"} ${issue.message}`)
      .join("; ")}`,
  );
}

/**
 * Frontmatter-only entries with translations next to them.
 *
 * `my-project.mdx` is the default language, with every field. A translation,
 * `my-project.fa.mdx`, holds only the fields that change (validated by
 * `translation`), and the rest come from the default file.
 *
 * @returns the entries of a language, each with its `slug` (the file name)
 */
export function localizedEntries<
  Base extends z.ZodType<object>,
  Translation extends z.ZodType<object>,
>(
  entries: readonly Entry[],
  {
    base,
    translation,
    dir,
  }: { base: Base; translation: Translation; dir: string },
): (locale: Locale) => (z.output<Base> & { slug: string })[] {
  const originals = new Map<string, z.output<Base>>();
  const overrides = new Map<string, z.output<Translation>>();

  for (const entry of entries) {
    const name = entry.info.path.replace(/\.mdx?$/, "");
    const dot = name.lastIndexOf(".");
    const suffix = dot === -1 ? undefined : name.slice(dot + 1);

    if (isLocale(suffix) && suffix !== defaultLocale) {
      overrides.set(
        `${name.slice(0, dot)}.${suffix}`,
        parse(translation, entry, dir),
      );
    } else {
      originals.set(
        isLocale(suffix) ? name.slice(0, dot) : name,
        parse(base, entry, dir),
      );
    }
  }

  const cache = new Map<Locale, (z.output<Base> & { slug: string })[]>();

  return (locale) => {
    let list = cache.get(locale);
    if (!list) {
      list = [...originals].map(([slug, data]) => ({
        ...data,
        ...overrides.get(`${slug}.${locale}`),
        slug,
      }));
      cache.set(locale, list);
    }
    return list;
  };
}

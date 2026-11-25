import { defaultLocale, type Locale, locales } from "@/i18n/locales";
import { getTags } from "@/lib/blog";
import { canonicalUrl } from "@/lib/seo";
import { postLocales, postsIn, tagLocales } from "@/lib/source";
import type { MetadataRoute } from "next";

type Entry = MetadataRoute.Sitemap[number];

/**
 * One entry per language a page exists in, each listing the others as
 * `hreflang` alternates (`x-default` is the default language).
 */
function entries(
  path: string,
  translations: readonly Locale[],
  extra: Omit<Entry, "url" | "alternates"> = {},
): Entry[] {
  const languages =
    translations.length > 1
      ? Object.fromEntries([
          ...translations.map((locale) => [locale, canonicalUrl(path, locale)]),
          ...(translations.includes(defaultLocale)
            ? [["x-default", canonicalUrl(path, defaultLocale)]]
            : []),
        ])
      : undefined;

  return translations.map((locale) => ({
    url: canonicalUrl(path, locale),
    ...extra,
    ...(languages ? { alternates: { languages } } : {}),
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = new Set(
    locales.flatMap((locale) => postsIn(locale).map((post) => post.slug)),
  );
  const tags = new Set(
    locales.flatMap((locale) =>
      getTags(postsIn(locale)).map((tag) => tag.slug),
    ),
  );
  const blogLocales = locales.filter((locale) => postsIn(locale).length > 0);
  const lastPost = postsIn(defaultLocale).find((post) => post.date)?.date;

  return [
    ...entries("/", locales, {
      changeFrequency: "weekly",
      priority: 1,
      ...(lastPost ? { lastModified: lastPost } : {}),
    }),
    ...entries("/projects", locales, {
      changeFrequency: "monthly",
      priority: 0.8,
    }),
    ...entries("/blog", blogLocales, {
      changeFrequency: "weekly",
      priority: 0.7,
    }),
    ...(tags.size > 0
      ? entries("/blog/tags", blogLocales, {
          changeFrequency: "monthly",
          priority: 0.3,
        })
      : []),
    ...[...slugs].flatMap((slug) => {
      const translations = postLocales(slug);
      const date = postsIn(translations[0]).find(
        (post) => post.slug === slug,
      )?.date;
      return entries(`/blog/${slug}`, translations, {
        changeFrequency: "monthly",
        priority: 0.5,
        ...(date ? { lastModified: date } : {}),
      });
    }),
    ...[...tags].flatMap((tag) =>
      entries(`/blog/tags/${tag}`, tagLocales(tag), {
        changeFrequency: "monthly",
        priority: 0.3,
      }),
    ),
  ];
}

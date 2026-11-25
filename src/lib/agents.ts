import { type Locale, localeConfig, locales } from "@/i18n/locales";
import { localizePath } from "@/i18n/paths";
import { getFormatter, getTranslations } from "next-intl/server";
import { type BlogPost, getTagPosts, getTags } from "./blog";
import { getExperience, type Role } from "./experience";
import { feedPath, llmsPath, profiles } from "./links";
import { markdownUrl } from "./markdown-url";
import { getProjects, type Project } from "./projects";
import { absoluteUrl, canonicalUrl } from "./seo";
import { authorName, headline, site, siteCopy } from "./site";
import { blogSource, postsIn } from "./source";

/**
 * The site as Markdown, for AI agents and anyone who prefers plain text, once
 * per language.
 *
 * - `/llms.txt`, `/fa/llms.txt`: an index of the site, following https://llmstxt.org.
 * - `/llms-full.txt`, `/fa/llms-full.txt`: every page below in one file.
 * - `<page>.md`: one page, such as `/projects.md`, `/fa/blog/<slug>.md`, or
 *   `/index.md` for the home page. Every HTML page has one, and links to it
 *   with `<link rel="alternate" type="text/markdown">`.
 * - A request for a page with `Accept: text/markdown` gets the same Markdown
 *   (see `src/proxy.ts`).
 *
 * Everything is read from `site.ts`, `content/`, and the messages, like the
 * HTML pages.
 */

export interface MarkdownPage {
  /** Path of the HTML page without the language, such as `/blog/my-post`. */
  path: string;
  title: string;
  description?: string;
  render: () => string | Promise<string>;
}

/** The language, its labels, and its formats, for one render. */
async function context(locale: Locale) {
  return {
    locale,
    t: await getTranslations({ locale }),
    format: await getFormatter({ locale }),
  };
}

type Context = Awaited<ReturnType<typeof context>>;

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function escapeLabel(text: string): string {
  return text.replace(/([[\]\\])/g, "\\$1");
}

function link(label: string, url: string): string {
  return `[${escapeLabel(label)}](${url})`;
}

/** Absolute URL of a page's Markdown in a language. */
function markdownLink(path: string, locale: Locale): string {
  return absoluteUrl(markdownUrl(path, locale));
}

/** Blocks joined by blank lines, empty ones dropped. */
function blocks(...parts: (string | false | undefined | null)[]): string {
  return `${parts.filter(Boolean).join("\n\n")}\n`;
}

function heading(title: string, description?: string): string {
  return blocks(`# ${title}`, description && `> ${description}`).trimEnd();
}

function postLine(post: BlogPost, { locale, format }: Context): string {
  const date = post.date ? ` (${format.dateTime(post.date, "date")})` : "";
  const description = post.description ? `: ${post.description}` : "";
  return `- ${link(post.title, markdownLink(post.path, locale))}${date}${description}`;
}

function projectFacts(project: Project, { t }: Context): string | undefined {
  const facts = [
    project.status && t(`project.status.${project.status}`),
    project.links.live && `${t("project.live")}: ${project.links.live}`,
    project.links.repository &&
      `${t("project.source")}: ${project.links.repository}`,
    project.stack.length > 0 &&
      `${t("project.stack")}: ${project.stack.join(", ")}`,
  ].filter(Boolean);
  return facts.length > 0 ? facts.join(" · ") : undefined;
}

function projectSection(project: Project, ctx: Context, level = "##"): string {
  return blocks(
    `${level} ${project.name}`,
    project.description,
    project.highlights.length > 0 &&
      project.highlights.map((highlight) => `- ${highlight}`).join("\n"),
    projectFacts(project, ctx),
  ).trimEnd();
}

function roleSection(role: Role, { t, format }: Context): string {
  const end = role.end
    ? format.dateTime(role.end, "month")
    : t("experience.present");
  const company = role.url ? link(role.company, role.url) : role.company;

  return blocks(
    `### ${role.role}, ${company}`,
    [`${format.dateTime(role.start, "month")} – ${end}`, role.location]
      .filter(Boolean)
      .join(" · "),
    role.summary,
    role.stack.length > 0 && `${t("project.stack")}: ${role.stack.join(", ")}`,
  ).trimEnd();
}

function contactLines({ locale, t }: Context): string {
  const lines = profiles.map((profile) => {
    const value =
      profile.id === "email"
        ? profile.href.replace(/^mailto:/, "")
        : profile.href;
    return `- ${t(`profiles.${profile.id}`)}: ${value}`;
  });
  const { resume } = siteCopy(locale);
  if (resume) lines.push(`- ${t("profile.resume")}: ${absoluteUrl(resume)}`);
  return lines.join("\n");
}

/** The About section of the home page: paragraphs, skills, and the timeline. */
function aboutSection({ locale, t }: Context): string | undefined {
  const { paragraphs, journey } = siteCopy(locale).about;
  const skills = site.skills ?? [];
  if (paragraphs.length + skills.length + journey.length === 0) return;

  const steps = journey.map(({ period, title, description }) => {
    const label = period ? `**${period}: ${title}.**` : `**${title}.**`;
    return description ? `- ${label} ${description}` : `- ${label}`;
  });

  return blocks(
    `## ${t("about.title")}`,
    ...paragraphs,
    skills.length > 0 && `${t("about.skills")}: ${skills.join(", ")}`,
    steps.length > 0 && `### ${t("about.journey")}\n\n${steps.join("\n")}`,
  ).trimEnd();
}

/* -------------------------------------------------------------------------- */
/* Pages                                                                      */
/* -------------------------------------------------------------------------- */

function home(ctx: Context): string {
  const { locale, t } = ctx;
  const copy = siteCopy(locale);
  const projects = getProjects(locale);
  const experience = getExperience(locale);
  const posts = postsIn(locale);

  return blocks(
    heading(site.name, copy.description),
    `**${headline(locale)}**`,
    copy.home.intro,
    [`${authorName(locale)}: ${copy.tagline}`, copy.availability]
      .filter(Boolean)
      .join("\n\n"),

    aboutSection(ctx),

    projects.length > 0 &&
      blocks(
        `## ${t("work.title")}`,
        ...projects.map((project) => projectSection(project, ctx, "###")),
        link(t("work.all"), markdownLink("/projects", locale)),
      ).trimEnd(),

    experience.length > 0 &&
      blocks(
        `## ${t("experience.title")}`,
        ...experience.map((role) => roleSection(role, ctx)),
      ).trimEnd(),

    posts.length > 0 &&
      blocks(
        `## ${t("writing.title")}`,
        posts
          .slice(0, 5)
          .map((post) => postLine(post, ctx))
          .join("\n"),
        link(t("writing.all"), markdownLink("/blog", locale)),
      ).trimEnd(),

    blocks(
      `## ${t("contact.title")}`,
      copy.contact,
      contactLines(ctx),
    ).trimEnd(),
  );
}

function projectsPage(ctx: Context): string {
  const { locale, t } = ctx;
  const projects = getProjects(locale);
  if (projects.length === 0) {
    return blocks(heading(t("projects.title")), t("projects.empty"));
  }
  return blocks(
    heading(t("projects.title"), t("projects.description")),
    ...projects.map((project) => projectSection(project, ctx)),
  );
}

function blogPage(ctx: Context): string {
  const { locale, t } = ctx;
  const posts = postsIn(locale);
  return blocks(
    heading(t("blog.title"), t("blog.description")),
    posts.length > 0
      ? posts.map((post) => postLine(post, ctx)).join("\n")
      : t("blog.empty"),
    getTags(posts).length > 0 &&
      link(t("blog.allTags"), markdownLink("/blog/tags", locale)),
  );
}

async function postPage(post: BlogPost, ctx: Context): Promise<string> {
  const { locale, t, format } = ctx;
  const page = blogSource.getPage([post.slug], locale);
  const body = page ? await page.data.getText("processed") : "";
  const meta = [
    post.authors.map((author) => author.name).join(", "),
    post.date && format.dateTime(post.date, "date"),
    post.readingTime && t("blog.readingTime", { minutes: post.readingTime }),
  ].filter(Boolean);

  return blocks(
    heading(post.title, post.description),
    meta.join(" · "),
    post.tags.length > 0 &&
      `${t("blog.tags")}: ${post.tags
        .map((tag) => link(tag.name, markdownLink(tag.path, locale)))
        .join(", ")}`,
    body.trim(),
  );
}

function tagsPage(ctx: Context): string {
  const { locale, t } = ctx;
  return blocks(
    heading(t("blog.allTags"), t("blog.tagsDescription")),
    getTags(postsIn(locale))
      .map(
        (tag) =>
          `- ${link(tag.name, markdownLink(tag.path, locale))} (${t("blog.posts", { count: tag.count })})`,
      )
      .join("\n"),
  );
}

function tagPage(slug: string, ctx: Context): string {
  const { locale, t } = ctx;
  const result = getTagPosts(postsIn(locale), slug);
  if (!result) return "";
  return blocks(
    heading(
      t("blog.taggedTitle", { tag: result.tag.name }),
      t("blog.taggedDescription", { tag: result.tag.name }),
    ),
    result.posts.map((post) => postLine(post, ctx)).join("\n"),
  );
}

/** Every page of a language that has a Markdown version, in reading order. */
export async function markdownPages(locale: Locale): Promise<MarkdownPage[]> {
  const ctx = await context(locale);
  const { t } = ctx;
  const copy = siteCopy(locale);
  const posts = postsIn(locale);
  const tags = getTags(posts);

  return [
    {
      path: "/",
      title: site.name,
      description: copy.description,
      render: () => home(ctx),
    },
    {
      path: "/projects",
      title: t("projects.title"),
      description: t("projects.description"),
      render: () => projectsPage(ctx),
    },
    {
      path: "/blog",
      title: t("blog.title"),
      description: t("blog.description"),
      render: () => blogPage(ctx),
    },
    ...posts.map((post) => ({
      path: post.path,
      title: post.title,
      description: post.description,
      render: () => postPage(post, ctx),
    })),
    ...(tags.length > 0
      ? [
          {
            path: "/blog/tags",
            title: t("blog.allTags"),
            description: t("blog.tagsDescription"),
            render: () => tagsPage(ctx),
          },
          ...tags.map((tag) => ({
            path: tag.path,
            title: t("blog.taggedTitle", { tag: tag.name }),
            description: t("blog.taggedDescription", { tag: tag.name }),
            render: () => tagPage(tag.slug, ctx),
          })),
        ]
      : []),
  ];
}

function decode(path: string): string {
  try {
    return decodeURIComponent(path);
  } catch {
    return path;
  }
}

export async function findMarkdownPage(
  locale: Locale,
  path: string,
): Promise<MarkdownPage | undefined> {
  const key = decode(path);
  return (await markdownPages(locale)).find(
    (page) => decode(page.path) === key,
  );
}

/* -------------------------------------------------------------------------- */
/* llms.txt                                                                   */
/* -------------------------------------------------------------------------- */

/** The index for agents: who this is, then links to the Markdown of each page. */
export async function llmsTxt(locale: Locale): Promise<string> {
  const ctx = await context(locale);
  const { t } = ctx;
  const copy = siteCopy(locale);
  const pages = await markdownPages(locale);
  const main = pages.filter((page) =>
    ["/", "/projects", "/blog"].includes(page.path),
  );
  const projects = getProjects(locale);
  const posts = postsIn(locale);
  const others = locales.filter((item) => item !== locale);

  const line = (page: MarkdownPage) => {
    const title = page.path === "/" ? t("nav.home") : page.title;
    const description = page.description ? `: ${page.description}` : "";
    return `- ${link(title, markdownLink(page.path, locale))}${description}`;
  };

  return blocks(
    heading(site.name, copy.description),
    copy.home.intro,
    `## ${t("footer.pages")}\n\n${main.map(line).join("\n")}`,

    projects.length > 0 &&
      `## ${t("nav.projects")}\n\n${projects
        .map((project) => {
          const url =
            project.links.live ??
            project.links.repository ??
            canonicalUrl("/projects", locale);
          return `- ${link(project.name, url)}: ${project.description}`;
        })
        .join("\n")}`,

    posts.length > 0 &&
      `## ${t("nav.blog")}\n\n${posts.map((post) => postLine(post, ctx)).join("\n")}`,

    `## ${t("contact.title")}\n\n${contactLines(ctx)}`,

    others.length > 0 &&
      `## ${t("agents.languages")}\n\n${others
        .map(
          (item) =>
            `- ${link(localeConfig[item].label, absoluteUrl(localizePath(llmsPath, item)))}`,
        )
        .join("\n")}`,

    // "Optional" is the llms.txt name for links an agent can skip.
    `## Optional\n\n${[
      `- ${link("llms-full.txt", absoluteUrl(localizePath("/llms-full.txt", locale)))}: ${t("agents.full")}`,
      `- ${link(t("blog.rss"), absoluteUrl(localizePath(feedPath, locale)))}`,
      `- ${link(t("agents.sitemap"), absoluteUrl("/sitemap.xml"))}`,
      site.repository && `- ${link(t("footer.source"), site.repository)}`,
    ]
      .filter(Boolean)
      .join("\n")}`,
  );
}

/** Every Markdown page of a language in one file, each under its URL. */
export async function llmsFullTxt(locale: Locale): Promise<string> {
  const pages = await markdownPages(locale);
  const sections = await Promise.all(
    pages.map(
      async (page) =>
        `<!-- ${canonicalUrl(page.path, locale)} -->\n\n${(await page.render()).trim()}`,
    ),
  );
  return `${sections.join("\n\n---\n\n")}\n`;
}

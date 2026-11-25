import { type BlogPost, getTagPosts, getTags } from "./blog";
import { experience, type Role } from "./experience";
import { formatDate, formatMonth, t } from "./i18n";
import { profiles } from "./links";
import { markdownUrl } from "./markdown-url";
import { type Project, projects } from "./projects";
import { absoluteUrl, canonicalUrl } from "./seo";
import { headline, site } from "./site";
import { blogSource, posts } from "./source";

/**
 * The site as Markdown, for AI agents and anyone who prefers plain text.
 *
 * - `/llms.txt`: an index of the site, following https://llmstxt.org.
 * - `/llms-full.txt`: every page below in one file.
 * - `<page>.md`: one page, such as `/projects.md`, `/blog/<slug>.md`, or
 *   `/index.md` for the home page. Every HTML page has one, and links to it
 *   with `<link rel="alternate" type="text/markdown">`.
 * - A request for a page with `Accept: text/markdown` gets the same Markdown
 *   (see `src/proxy.ts`).
 *
 * Everything is read from `site.ts` and `content/`, like the HTML pages.
 */

export interface MarkdownPage {
  /** Path of the HTML page, such as `/blog/my-post`. */
  path: string;
  title: string;
  description?: string;
  render: () => Promise<string>;
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function escapeLabel(text: string): string {
  return text.replace(/([[\]\\])/g, "\\$1");
}

function link(label: string, url: string): string {
  return `[${escapeLabel(label)}](${url})`;
}

/** Absolute URL of a page's Markdown. */
function markdownLink(path: string): string {
  return absoluteUrl(markdownUrl(path));
}

/** Blocks joined by blank lines, empty ones dropped. */
function blocks(...parts: (string | false | undefined | null)[]): string {
  return `${parts.filter(Boolean).join("\n\n")}\n`;
}

function heading(title: string, description?: string): string {
  return blocks(`# ${title}`, description && `> ${description}`).trimEnd();
}

function postLine(post: BlogPost): string {
  const date = post.date ? ` (${formatDate(post.date)})` : "";
  const description = post.description ? `: ${post.description}` : "";
  return `- ${link(post.title, markdownLink(post.url))}${date}${description}`;
}

function projectLinks(project: Project): string | undefined {
  const facts = [
    project.status && `${t.project.status[project.status]}`,
    project.links.live && `${t.project.live}: ${project.links.live}`,
    project.links.repository &&
      `${t.project.source}: ${project.links.repository}`,
    project.stack.length > 0 &&
      `${t.project.stack}: ${project.stack.join(", ")}`,
  ].filter(Boolean);
  return facts.length > 0 ? facts.join(" · ") : undefined;
}

function projectSection(project: Project, level = "##"): string {
  return blocks(
    `${level} ${project.name}`,
    project.description,
    project.highlights.length > 0 &&
      project.highlights.map((highlight) => `- ${highlight}`).join("\n"),
    projectLinks(project),
  ).trimEnd();
}

function roleSection(role: Role): string {
  const dates = `${formatMonth(role.start)} – ${role.end ? formatMonth(role.end) : t.experience.present}`;
  const company = role.url ? link(role.company, role.url) : role.company;

  return blocks(
    `### ${role.role}, ${company}`,
    [dates, role.location].filter(Boolean).join(" · "),
    role.summary,
    role.stack.length > 0 && `${t.project.stack}: ${role.stack.join(", ")}`,
  ).trimEnd();
}

function contactLines(): string {
  const lines = profiles.map((profile) => {
    const value =
      profile.id === "email"
        ? profile.href.replace(/^mailto:/, "")
        : profile.href;
    return `- ${profile.label}: ${value}`;
  });
  if (site.author.resume) {
    lines.push(`- ${t.profile.resume}: ${absoluteUrl(site.author.resume)}`);
  }
  return lines.join("\n");
}

/* -------------------------------------------------------------------------- */
/* Pages                                                                      */
/* -------------------------------------------------------------------------- */

async function home(): Promise<string> {
  const { author, home: copy } = site;

  return blocks(
    heading(site.name, site.description),
    `**${headline}**`,
    copy.intro,
    [`${author.name}: ${author.tagline}`, author.availability]
      .filter(Boolean)
      .join("\n\n"),

    projects.length > 0 &&
      blocks(
        `## ${t.work.title}`,
        ...projects.map((project) => projectSection(project, "###")),
        link(t.work.all, markdownLink("/projects")),
      ).trimEnd(),

    experience.length > 0 &&
      blocks(
        `## ${t.experience.title}`,
        ...experience.map(roleSection),
      ).trimEnd(),

    copy.principles.length > 0 &&
      blocks(
        `## ${t.principles.title}`,
        ...copy.principles.map(
          ({ title, description }) => `### ${title}\n\n${description}`,
        ),
      ).trimEnd(),

    posts.length > 0 &&
      blocks(
        `## ${t.writing.title}`,
        posts.slice(0, 5).map(postLine).join("\n"),
        link(t.writing.all, markdownLink("/blog")),
      ).trimEnd(),

    blocks(
      `## ${t.contact.title}`,
      site.contact.description,
      contactLines(),
    ).trimEnd(),
  );
}

async function projectsPage(): Promise<string> {
  if (projects.length === 0)
    return blocks(heading(t.projects.title), t.projects.empty);
  return blocks(
    heading(t.projects.title, t.projects.description),
    ...projects.map((project) => projectSection(project)),
  );
}

async function blogPage(): Promise<string> {
  return blocks(
    heading(t.blog.title, t.blog.description),
    posts.length > 0 ? posts.map(postLine).join("\n") : t.blog.empty,
    getTags(posts).length > 0 &&
      link(t.blog.allTags, markdownLink("/blog/tags")),
  );
}

async function postPage(post: BlogPost): Promise<string> {
  const page = blogSource.getPage(post.url.split("/").slice(2));
  const body = page ? await page.data.getText("processed") : "";
  const meta = [
    post.authors.map((author) => author.name).join(", "),
    post.date && formatDate(post.date),
    post.readingTime && t.blog.readingTime(post.readingTime),
  ].filter(Boolean);

  return blocks(
    heading(post.title, post.description),
    meta.join(" · "),
    post.tags.length > 0 &&
      `${t.blog.tags}: ${post.tags.map((tag) => link(tag.name, markdownLink(tag.url))).join(", ")}`,
    body.trim(),
  );
}

async function tagsPage(): Promise<string> {
  return blocks(
    heading(t.blog.allTags, t.blog.tagsDescription),
    getTags(posts)
      .map(
        (tag) =>
          `- ${link(tag.name, markdownLink(tag.url))} (${t.blog.posts(tag.count)})`,
      )
      .join("\n"),
  );
}

async function tagPage(slug: string): Promise<string> {
  const result = getTagPosts(posts, slug);
  if (!result) return "";
  return blocks(
    heading(
      t.blog.taggedTitle(result.tag.name),
      t.blog.taggedDescription(result.tag.name),
    ),
    result.posts.map(postLine).join("\n"),
  );
}

/** Every page that has a Markdown version, in reading order. */
export function markdownPages(): MarkdownPage[] {
  const tags = getTags(posts);

  return [
    {
      path: "/",
      title: site.name,
      description: site.description,
      render: home,
    },
    {
      path: "/projects",
      title: t.projects.title,
      description: t.projects.description,
      render: projectsPage,
    },
    {
      path: "/blog",
      title: t.blog.title,
      description: t.blog.description,
      render: blogPage,
    },
    ...posts.map((post) => ({
      path: post.url,
      title: post.title,
      description: post.description,
      render: () => postPage(post),
    })),
    ...(tags.length > 0
      ? [
          {
            path: "/blog/tags",
            title: t.blog.allTags,
            description: t.blog.tagsDescription,
            render: tagsPage,
          },
          ...tags.map((tag) => ({
            path: tag.url,
            title: t.blog.taggedTitle(tag.name),
            description: t.blog.taggedDescription(tag.name),
            render: () => tagPage(tag.slug),
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

export function findMarkdownPage(path: string): MarkdownPage | undefined {
  const key = decode(path);
  return markdownPages().find((page) => decode(page.path) === key);
}

/* -------------------------------------------------------------------------- */
/* llms.txt                                                                   */
/* -------------------------------------------------------------------------- */

/** The index for agents: who this is, then links to the Markdown of each page. */
export function llmsTxt(): string {
  const pages = markdownPages();
  const main = pages.filter((page) =>
    ["/", "/projects", "/blog"].includes(page.path),
  );

  const line = (page: MarkdownPage) => {
    const title = page.path === "/" ? t.nav.home : page.title;
    const description = page.description ? `: ${page.description}` : "";
    return `- ${link(title, markdownLink(page.path))}${description}`;
  };

  return blocks(
    heading(site.name, site.description),
    site.home.intro,
    `## ${t.footer.pages}\n\n${main.map(line).join("\n")}`,

    projects.length > 0 &&
      `## ${t.nav.projects}\n\n${projects
        .map((project) => {
          const url =
            project.links.live ??
            project.links.repository ??
            canonicalUrl("/projects");
          return `- ${link(project.name, url)}: ${project.description}`;
        })
        .join("\n")}`,

    posts.length > 0 && `## ${t.nav.blog}\n\n${posts.map(postLine).join("\n")}`,

    `## ${t.contact.title}\n\n${contactLines()}`,

    // "Optional" is the llms.txt name for links an agent can skip.
    `## Optional\n\n${[
      `- ${link("llms-full.txt", absoluteUrl("/llms-full.txt"))}: ${t.agents.full}`,
      `- ${link(t.blog.rss, absoluteUrl("/feed.xml"))}`,
      `- ${link(t.agents.sitemap, absoluteUrl("/sitemap.xml"))}`,
      site.repository && `- ${link(t.footer.source, site.repository)}`,
    ]
      .filter(Boolean)
      .join("\n")}`,
  );
}

/** Every Markdown page in one file, each under its URL. */
export async function llmsFullTxt(): Promise<string> {
  const sections = await Promise.all(
    markdownPages().map(
      async (page) =>
        `<!-- ${canonicalUrl(page.path)} -->\n\n${(await page.render()).trim()}`,
    ),
  );
  return `${sections.join("\n\n---\n\n")}\n`;
}

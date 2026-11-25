import type { Translations } from "fumadocs-ui/i18n";
import type { ProfileId } from "./site-config";
import { site } from "./site";

/**
 * Interface labels, per locale. `site.locale` picks the set.
 *
 * Copy that is about you (headline, intro, projects, posts) is not here.
 * It lives in `src/lib/site.ts` and `content/`.
 */
const en = {
  nav: {
    home: "Home",
    projects: "Projects",
    blog: "Blog",
    skipToContent: "Skip to content",
  },
  hero: {
    viewProjects: "View projects",
    readBlog: "Read the blog",
    latest: "Latest",
  },
  stats: {
    projects: (count: number) =>
      count === 1 ? "1 project" : `${count} projects`,
    projectsLabel: "Projects",
    postsLabel: "Posts",
  },
  profile: {
    resume: "Résumé",
  },
  /** Names of the profiles in `site.profiles`. Brand names stay as they are. */
  profiles: {
    github: "GitHub",
    linkedin: "LinkedIn",
    x: "X",
    telegram: "Telegram",
    email: "Email",
    website: "Website",
  } satisfies Record<ProfileId, string>,
  work: {
    eyebrow: "Work",
    title: "Selected work",
    description: "Featured projects, each linked to its live site and source.",
    more: "More projects",
    all: "All projects",
  },
  experience: {
    eyebrow: "Experience",
    title: "Where I have worked",
    description: "Roles and teams, most recent first.",
    present: "Present",
  },
  principles: {
    eyebrow: "Principles",
    title: "How I build",
    description: "Ideas the projects here share.",
  },
  writing: {
    eyebrow: "Blog",
    title: "Writing",
    description: "Notes on the projects and the decisions behind them.",
    all: "All posts",
  },
  contact: {
    eyebrow: "Contact",
    title: "Get in touch",
    /** The main button, per `site.contact.primary`. */
    cta: {
      github: "Follow on GitHub",
      linkedin: "Connect on LinkedIn",
      x: "Message on X",
      telegram: "Message on Telegram",
      email: "Send an email",
      website: "Visit the website",
    } satisfies Record<ProfileId, string>,
  },
  project: {
    live: "Live",
    source: "Source",
    stack: "Stack",
    liveFor: (name: string) => `Live site for ${name}`,
    sourceFor: (name: string) => `Source of ${name}`,
    status: {
      active: "Active",
      beta: "Beta",
      archived: "Archived",
    },
  },
  projects: {
    title: "Projects",
    description: "Projects with their live sites and source.",
    featured: "Featured",
    other: "Also published",
    empty: "No projects yet.",
  },
  blog: {
    title: "Blog",
    description: "Notes on the projects and the decisions behind them.",
    back: "All posts",
    newer: "Newer post",
    older: "Older post",
    toc: "On this page",
    share: "Share",
    copied: "Link copied",
    tags: "Tags",
    allTags: "All tags",
    taggedTitle: (tag: string) => `Tagged “${tag}”`,
    taggedDescription: (tag: string) => `Posts tagged ${tag}.`,
    tagsDescription: "Every topic across the blog.",
    readingTime: (minutes: number) => `${minutes} min read`,
    read: "Read post",
    latest: "Latest",
    posts: (count: number) => (count === 1 ? "1 post" : `${count} posts`),
    rss: "RSS feed",
    empty: "No posts yet.",
  },
  footer: {
    builtWith: "Built with Next.js and Fumadocs.",
    source: "Source",
    social: "Elsewhere",
    pages: "Pages",
    feeds: "Feeds",
  },
  agents: {
    full: "Every page of the site in one Markdown file.",
    sitemap: "Sitemap",
  },
  notFound: {
    title: "Page not found",
    description:
      "The page you are looking for was moved, renamed, or never existed.",
    home: "Back to home",
  },
};

export type Messages = typeof en;

const fa: Messages = {
  nav: {
    home: "خانه",
    projects: "پروژه‌ها",
    blog: "بلاگ",
    skipToContent: "رفتن به محتوا",
  },
  hero: {
    viewProjects: "دیدن پروژه‌ها",
    readBlog: "خواندن بلاگ",
    latest: "تازه",
  },
  stats: {
    projects: (count) => `${count.toLocaleString("fa")} پروژه`,
    projectsLabel: "پروژه",
    postsLabel: "نوشته",
  },
  profile: {
    resume: "رزومه",
  },
  profiles: {
    github: "گیت‌هاب",
    linkedin: "لینکدین",
    x: "X",
    telegram: "تلگرام",
    email: "ایمیل",
    website: "وب‌سایت",
  },
  work: {
    eyebrow: "کارها",
    title: "کارهای منتخب",
    description: "پروژه‌های برگزیده، هرکدام با پیوند به نسخه زنده و کد منبع.",
    more: "پروژه‌های دیگر",
    all: "همه پروژه‌ها",
  },
  experience: {
    eyebrow: "سابقه",
    title: "جاهایی که کار کرده‌ام",
    description: "نقش‌ها و تیم‌ها، از تازه‌ترین.",
    present: "اکنون",
  },
  principles: {
    eyebrow: "اصول",
    title: "چطور می‌سازم",
    description: "ایده‌هایی که پروژه‌های اینجا در آن مشترک‌اند.",
  },
  writing: {
    eyebrow: "بلاگ",
    title: "نوشته‌ها",
    description: "یادداشت‌هایی درباره پروژه‌ها و تصمیم‌های پشت آن‌ها.",
    all: "همه نوشته‌ها",
  },
  contact: {
    eyebrow: "تماس",
    title: "در تماس باشیم",
    cta: {
      github: "دنبال کردن در گیت‌هاب",
      linkedin: "ارتباط در لینکدین",
      x: "پیام در X",
      telegram: "پیام در تلگرام",
      email: "ارسال ایمیل",
      website: "دیدن وب‌سایت",
    },
  },
  project: {
    live: "نسخه زنده",
    source: "کد منبع",
    stack: "فناوری‌ها",
    liveFor: (name) => `نسخه زنده ${name}`,
    sourceFor: (name) => `کد منبع ${name}`,
    status: {
      active: "فعال",
      beta: "بتا",
      archived: "بایگانی‌شده",
    },
  },
  projects: {
    title: "پروژه‌ها",
    description: "پروژه‌ها، با نسخه زنده و کد منبع.",
    featured: "برگزیده",
    other: "منتشرشده‌های دیگر",
    empty: "هنوز پروژه‌ای اضافه نشده.",
  },
  blog: {
    title: "بلاگ",
    description: "یادداشت‌هایی درباره پروژه‌ها و تصمیم‌های پشت آن‌ها.",
    back: "همه نوشته‌ها",
    newer: "نوشته جدیدتر",
    older: "نوشته قدیمی‌تر",
    toc: "در این صفحه",
    share: "اشتراک‌گذاری",
    copied: "پیوند کپی شد",
    tags: "برچسب‌ها",
    allTags: "همه برچسب‌ها",
    taggedTitle: (tag) => `برچسب «${tag}»`,
    taggedDescription: (tag) => `نوشته‌های با برچسب ${tag}.`,
    tagsDescription: "همه موضوع‌های بلاگ.",
    readingTime: (minutes) => `${minutes.toLocaleString("fa")} دقیقه مطالعه`,
    read: "خواندن نوشته",
    latest: "تازه",
    posts: (count) => `${count.toLocaleString("fa")} نوشته`,
    rss: "خوراک RSS",
    empty: "هنوز نوشته‌ای منتشر نشده.",
  },
  footer: {
    builtWith: "ساخته‌شده با Next.js و Fumadocs.",
    source: "کد منبع",
    social: "شبکه‌ها",
    pages: "صفحه‌ها",
    feeds: "خوراک‌ها",
  },
  agents: {
    full: "همه صفحه‌های سایت در یک فایل Markdown.",
    sitemap: "نقشه سایت",
  },
  notFound: {
    title: "صفحه پیدا نشد",
    description:
      "صفحه‌ای که دنبالش هستید جابه‌جا شده، تغییر نام داده یا وجود نداشته است.",
    home: "بازگشت به خانه",
  },
};

/** Persian labels for the Fumadocs UI this site uses. English is built in. */
const fumadocsFa: Partial<Translations> = {
  "On this page(table of contents)": "در این صفحه",
  "No Headings(table of contents)": "بدون سرفصل",
  "Table of Contents(inline table of contents)": "فهرست مطالب",
  "Toggle Menu(home layout header)(aria-label)": "باز و بسته کردن منو",
  "Toggle Theme(theme switcher)(aria-label)": "تغییر پوسته",
  "Light(theme switcher)(aria-label)": "روشن",
  "Dark(theme switcher)(aria-label)": "تیره",
  "System(theme switcher)(aria-label)": "سیستم",
  "Theme(site menu)": "پوسته",
  "Skip to Content(skip link)": "رفتن به محتوا",
  "Copy Text(code block)(aria-label)": "کپی متن",
  "Copied Text(code block)(aria-label)": "کپی شد",
  "Copy Anchor Link(heading anchor)(aria-label)": "کپی پیوند",
  "Copied Anchor Link(heading anchor)(aria-label)": "پیوند کپی شد",
  "Page Not Found(404 not found page)": "صفحه پیدا نشد",
  "Back to Home(404 not found page)": "بازگشت به خانه",
};

const messages = { en, fa } satisfies Record<string, Messages>;
const fumadocsMessages: Partial<
  Record<keyof typeof messages, Partial<Translations>>
> = {
  fa: fumadocsFa,
};

/** Labels for `site.locale`. */
export const t: Messages = messages[site.locale];

/** Props for the Fumadocs `RootProvider` `i18n` option. */
export const fumadocsI18n = {
  locale: site.locale,
  translations: fumadocsMessages[site.locale],
};

const dateFormat = new Intl.DateTimeFormat(site.locale, {
  dateStyle: "medium",
  timeZone: "UTC",
});

const monthFormat = new Intl.DateTimeFormat(site.locale, {
  year: "numeric",
  month: "short",
  timeZone: "UTC",
});

export function formatDate(date: Date): string {
  return dateFormat.format(date);
}

/** A month and year, such as `Mar 2024`, for work history. */
export function formatMonth(date: Date): string {
  return monthFormat.format(date);
}

import type { Translations } from 'fumadocs-ui/i18n';
import { site } from './site';

/**
 * Interface labels, per locale. `site.locale` picks the set.
 *
 * Copy that is about you (headline, intro, projects, posts) is not here.
 * It lives in `src/lib/site.ts` and `content/`.
 */
const en = {
  nav: {
    home: 'Home',
    projects: 'Projects',
    docs: 'Docs',
    blog: 'Blog',
    skipToContent: 'Skip to content',
  },
  hero: {
    viewProjects: 'View projects',
    readBlog: 'Read the blog',
    latest: 'Latest',
  },
  stats: {
    projects: (count: number) => (count === 1 ? '1 project' : `${count} projects`),
    posts: (count: number) => (count === 1 ? '1 post' : `${count} posts`),
    docs: (count: number) => (count === 1 ? '1 docs page' : `${count} docs pages`),
    projectsLabel: 'Projects',
    postsLabel: 'Posts',
    docsLabel: 'Docs pages',
  },
  work: {
    eyebrow: 'Work',
    title: 'Selected work',
    description: 'The projects that carry most of the work, with docs and a live demo.',
    more: 'More projects',
    all: 'All projects',
  },
  principles: {
    eyebrow: 'Principles',
    title: 'How I build',
    description: 'Three ideas every project here shares.',
  },
  writing: {
    eyebrow: 'Blog',
    title: 'Writing',
    description: 'Notes on the projects and the decisions behind them.',
    all: 'All posts',
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Get in touch',
    description:
      'The quickest way to reach me is a message on Telegram. For a question about a project, an issue on its repository works too.',
    telegram: 'Message on Telegram',
    email: 'Send an email',
  },
  project: {
    docs: 'Docs',
    live: 'Live',
    source: 'Source',
    docsFor: (name: string) => `Docs for ${name}`,
    liveFor: (name: string) => `Live site for ${name}`,
    sourceFor: (name: string) => `Source of ${name} on GitHub`,
  },
  projects: {
    title: 'Projects',
    description: 'Open-source projects, with their docs, live demos, and source.',
    featured: 'Featured',
    other: 'Also published',
  },
  blog: {
    title: 'Blog',
    description: 'Notes on the projects and the decisions behind them.',
    back: 'All posts',
    newer: 'Newer post',
    older: 'Older post',
    toc: 'On this page',
    share: 'Share',
    copied: 'Link copied',
    tags: 'Tags',
    allTags: 'All tags',
    taggedTitle: (tag: string) => `Tagged “${tag}”`,
    taggedDescription: (tag: string) => `Posts tagged ${tag}.`,
    tagsDescription: 'Every topic across the blog.',
    readingTime: (minutes: number) => `${minutes} min read`,
    read: 'Read post',
    latest: 'Latest',
    posts: (count: number) => (count === 1 ? '1 post' : `${count} posts`),
    rss: 'RSS feed',
  },
  footer: {
    builtWith: 'Built with Next.js and Fumadocs.',
    source: 'Source',
    rss: 'RSS',
    social: 'Elsewhere',
    pages: 'Pages',
  },
  notFound: {
    title: 'Page not found',
    description: 'The page you are looking for was moved, renamed, or never existed.',
    home: 'Back to home',
  },
};

export type Messages = typeof en;

const fa: Messages = {
  nav: {
    home: 'خانه',
    projects: 'پروژه‌ها',
    docs: 'مستندات',
    blog: 'بلاگ',
    skipToContent: 'رفتن به محتوا',
  },
  hero: {
    viewProjects: 'دیدن پروژه‌ها',
    readBlog: 'خواندن بلاگ',
    latest: 'تازه',
  },
  stats: {
    projects: (count) => `${count.toLocaleString('fa')} پروژه`,
    posts: (count) => `${count.toLocaleString('fa')} نوشته`,
    docs: (count) => `${count.toLocaleString('fa')} صفحه مستندات`,
    projectsLabel: 'پروژه',
    postsLabel: 'نوشته',
    docsLabel: 'صفحه مستندات',
  },
  work: {
    eyebrow: 'کارها',
    title: 'کارهای منتخب',
    description: 'پروژه‌هایی که بیشتر کار روی آن‌هاست، با مستندات و دموی زنده.',
    more: 'پروژه‌های دیگر',
    all: 'همه پروژه‌ها',
  },
  principles: {
    eyebrow: 'اصول',
    title: 'چطور می‌سازم',
    description: 'سه ایده که همه پروژه‌های اینجا در آن مشترک‌اند.',
  },
  writing: {
    eyebrow: 'بلاگ',
    title: 'نوشته‌ها',
    description: 'یادداشت‌هایی درباره پروژه‌ها و تصمیم‌های پشت آن‌ها.',
    all: 'همه نوشته‌ها',
  },
  contact: {
    eyebrow: 'تماس',
    title: 'در تماس باشیم',
    description:
      'سریع‌ترین راه، پیام در تلگرام است. برای سؤال درباره یک پروژه، issue در مخزن همان پروژه هم کار می‌کند.',
    telegram: 'پیام در تلگرام',
    email: 'ارسال ایمیل',
  },
  project: {
    docs: 'مستندات',
    live: 'نسخه زنده',
    source: 'کد منبع',
    docsFor: (name) => `مستندات ${name}`,
    liveFor: (name) => `نسخه زنده ${name}`,
    sourceFor: (name) => `کد منبع ${name} در گیت‌هاب`,
  },
  projects: {
    title: 'پروژه‌ها',
    description: 'پروژه‌های متن‌باز، با مستندات، دموی زنده و کد منبع.',
    featured: 'برگزیده',
    other: 'منتشرشده‌های دیگر',
  },
  blog: {
    title: 'بلاگ',
    description: 'یادداشت‌هایی درباره پروژه‌ها و تصمیم‌های پشت آن‌ها.',
    back: 'همه نوشته‌ها',
    newer: 'نوشته جدیدتر',
    older: 'نوشته قدیمی‌تر',
    toc: 'در این صفحه',
    share: 'اشتراک‌گذاری',
    copied: 'پیوند کپی شد',
    tags: 'برچسب‌ها',
    allTags: 'همه برچسب‌ها',
    taggedTitle: (tag) => `برچسب «${tag}»`,
    taggedDescription: (tag) => `نوشته‌های با برچسب ${tag}.`,
    tagsDescription: 'همه موضوع‌های بلاگ.',
    readingTime: (minutes) => `${minutes.toLocaleString('fa')} دقیقه مطالعه`,
    read: 'خواندن نوشته',
    latest: 'تازه',
    posts: (count) => `${count.toLocaleString('fa')} نوشته`,
    rss: 'خوراک RSS',
  },
  footer: {
    builtWith: 'ساخته‌شده با Next.js و Fumadocs.',
    source: 'کد منبع',
    rss: 'RSS',
    social: 'شبکه‌ها',
    pages: 'صفحه‌ها',
  },
  notFound: {
    title: 'صفحه پیدا نشد',
    description: 'صفحه‌ای که دنبالش هستید جابه‌جا شده، تغییر نام داده یا وجود نداشته است.',
    home: 'بازگشت به خانه',
  },
};

/** Persian labels for Fumadocs UI (search, sidebar, table of contents). English is built in. */
const fumadocsFa: Partial<Translations> = {
  'Search(search trigger)': 'جستجو',
  'Search(search dialog)': 'جستجو',
  'Open Search(search trigger)(aria-label)': 'باز کردن جستجو',
  'Close Search(search dialog)(aria-label)': 'بستن جستجو',
  'No results found(search dialog)': 'نتیجه‌ای پیدا نشد',
  'Search failed(search dialog)': 'جستجو انجام نشد',
  'On this page(table of contents)': 'در این صفحه',
  'No Headings(table of contents)': 'بدون سرفصل',
  'Table of Contents(inline table of contents)': 'فهرست مطالب',
  'Next Page(pagination)': 'صفحه بعد',
  'Previous Page(pagination)': 'صفحه قبل',
  'Edit on GitHub(edit page)': 'ویرایش در گیت‌هاب',
  'Last updated on(page footer)': 'آخرین به‌روزرسانی',
  'Copy Markdown(page actions)': 'کپی Markdown',
  'Copied Markdown(page actions)': 'کپی شد',
  'Open(page actions)': 'باز کردن',
  'View as Markdown(page actions)': 'نمایش Markdown',
  'Open in GitHub(page actions)': 'باز کردن در گیت‌هاب',
  'Toggle Menu(home layout header)(aria-label)': 'باز و بسته کردن منو',
  'Toggle Theme(theme switcher)(aria-label)': 'تغییر پوسته',
  'Light(theme switcher)(aria-label)': 'روشن',
  'Dark(theme switcher)(aria-label)': 'تیره',
  'System(theme switcher)(aria-label)': 'سیستم',
  'Theme(site menu)': 'پوسته',
  'Open Sidebar(aria-label)': 'باز کردن نوار کناری',
  'Close Sidebar(aria-label)': 'بستن نوار کناری',
  'Open Sidebar(sidebar)(aria-label)': 'باز کردن نوار کناری',
  'Close Sidebar(sidebar)(aria-label)': 'بستن نوار کناری',
  'Collapse Sidebar(sidebar)(aria-label)': 'جمع کردن نوار کناری',
  'Show Sidebar(sidebar)': 'نمایش نوار کناری',
  'Hide Sidebar(sidebar)': 'پنهان کردن نوار کناری',
  'Skip to Content(skip link)': 'رفتن به محتوا',
  'Copy Text(code block)(aria-label)': 'کپی متن',
  'Copied Text(code block)(aria-label)': 'کپی شد',
  'Copy Anchor Link(heading anchor)(aria-label)': 'کپی پیوند',
  'Copied Anchor Link(heading anchor)(aria-label)': 'پیوند کپی شد',
  'Page Not Found(404 not found page)': 'صفحه پیدا نشد',
  'Back to Home(404 not found page)': 'بازگشت به خانه',
};

const messages = { en, fa } satisfies Record<string, Messages>;
const fumadocsMessages: Partial<Record<keyof typeof messages, Partial<Translations>>> = {
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
  dateStyle: 'medium',
  timeZone: 'UTC',
});

export function formatDate(date: Date): string {
  return dateFormat.format(date);
}

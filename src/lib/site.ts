import type { Locale } from "@/i18n/locales";
import { KeyRoundIcon, LanguagesIcon, ServerIcon } from "lucide-react";
import type { SiteConfig, SiteCopy } from "./site-config";

/**
 * Who this site is about, and the home page copy.
 *
 * The committed values are Dimah's public profile (https://github.com/dimah-kz)
 * and are the demo content of the template. Replace them to make the site yours.
 * Every field is described in `src/lib/site-config.ts`.
 *
 * Everything else that is about you lives in `content/`:
 * projects in `content/projects`, work history in `content/experience`,
 * and posts in `content/blog`.
 */
export const site: SiteConfig = {
  name: "dimah",
  url: "https://dimah.dev",

  author: {
    name: "dimah",
    avatar: "/avatar.png",
  },

  profiles: {
    telegram: "https://t.me/dimahkz",
    github: "https://github.com/dimah-kz",
    x: "https://x.com/dimahkzx",
    email: "dimahkz.dev@gmail.com",
  },

  contact: {
    primary: "telegram",
  },

  repository: "https://github.com/dimah-kz/dimah-portfolio",

  copy: {
    en: {
      description: "Open-source, server-first tools for React and Next.js.",
      tagline: "Believer in open source.",
      contact:
        "The quickest way to reach me is a message on Telegram. For a question about a project, an issue on its repository works too.",
      home: {
        headline: "Server-first tools for",
        headlineAccent: "React and Next.js.",
        intro:
          "I build and publish open-source tools under dimah-kz. Most of that work is dimah-starter, a multi-tenant SaaS starter for Next.js 16, and dimah-s3, an S3 upload toolkit that keeps credentials on the server.",
        principles: [
          {
            icon: ServerIcon,
            title: "Server-first",
            description:
              "Pages read the session in Server Components and every write is a Server Action. Permission checks run on each read, not only in a layout.",
          },
          {
            icon: KeyRoundIcon,
            title: "Credentials stay on the backend",
            description:
              "The server signs an upload and the browser talks to the bucket. Auth, quotas, and database rules live in server hooks.",
          },
          {
            icon: LanguagesIcon,
            title: "Both directions",
            description:
              "English and Persian ship together. Direction is set once on the document, so the same layout reads left-to-right and right-to-left.",
          },
        ],
      },
    },

    fa: {
      description: "ابزارهای متن‌باز و سرورمحور برای React و Next.js.",
      tagline: "باورمند به نرم‌افزار متن‌باز.",
      contact:
        "سریع‌ترین راه تماس با من، پیام در تلگرام است. برای سؤال درباره یک پروژه، باز کردن issue در مخزن همان پروژه هم کار می‌کند.",
      home: {
        headline: "ابزارهای سرورمحور برای",
        headlineAccent: "React و Next.js.",
        intro:
          "ابزارهای متن‌باز را با نام dimah-kz می‌سازم و منتشر می‌کنم. بیشتر این کار در dimah-starter است، یک استارتر SaaS چندمستأجری برای Next.js 16، و dimah-s3، ابزاری برای آپلود در S3 که کلیدهای دسترسی را روی سرور نگه می‌دارد.",
        principles: [
          {
            icon: ServerIcon,
            title: "سرورمحور",
            description:
              "صفحه‌ها نشست کاربر را در Server Components می‌خوانند و هر تغییر داده یک Server Action است. بررسی دسترسی در هر خواندن انجام می‌شود، نه فقط در layout.",
          },
          {
            icon: KeyRoundIcon,
            title: "کلیدها روی سرور می‌مانند",
            description:
              "سرور آپلود را امضا می‌کند و مرورگر مستقیم با باکت حرف می‌زند. احراز هویت، سهمیه‌ها و قواعد پایگاه داده در hookهای سرور هستند.",
          },
          {
            icon: LanguagesIcon,
            title: "هر دو جهت",
            description:
              "انگلیسی و فارسی با هم عرضه می‌شوند. جهت یک بار روی سند تنظیم می‌شود، پس همان چیدمان هم چپ‌به‌راست خوانده می‌شود و هم راست‌به‌چپ.",
          },
        ],
      },
    },
  },
};

/** The copy of one language. */
export function siteCopy(locale: Locale): SiteCopy {
  return site.copy[locale];
}

/** The whole hero title, for browser titles and share cards. */
export function headline(locale: Locale): string {
  const { home } = siteCopy(locale);
  return `${home.headline} ${home.headlineAccent}`;
}

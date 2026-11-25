import { KeyRoundIcon, LanguagesIcon, ServerIcon } from "lucide-react";
import type { SiteConfig } from "./site-config";

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
  description: "Open-source, server-first tools for React and Next.js.",
  url: "https://dimah.dev",
  locale: "en",
  direction: "ltr",

  author: {
    name: "dimah",
    tagline: "Believer in open source.",
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
    description:
      "The quickest way to reach me is a message on Telegram. For a question about a project, an issue on its repository works too.",
  },

  repository: "https://github.com/dimah-kz/dimah-portfolio",

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
};

/** The whole hero title, for browser titles and share cards. */
export const headline = `${site.home.headline} ${site.home.headlineAccent}`;

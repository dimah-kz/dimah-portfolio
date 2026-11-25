import { KeyRoundIcon, LanguagesIcon, ServerIcon } from 'lucide-react';

/** Locales with interface labels in `src/lib/i18n.ts`. */
type Locale = 'en' | 'fa';
type Direction = 'ltr' | 'rtl';

/**
 * Identity and home page copy for this portfolio.
 *
 * The committed values are Dimah's public profile (https://github.com/dimah-kz)
 * and are the demo content of the template. Replace them to make the site yours.
 *
 * - Projects are YAML files in `content/projects`.
 * - Docs are MDX in `content/docs`. Blog posts are MDX in `content/blog`.
 * - Interface labels (buttons, headings) are in `src/lib/i18n.ts`, per locale.
 */
export const site = {
  /** Short name. Shown in the header, titles, and the footer. */
  name: 'dimah',
  /** One line. Used as the meta description and the RSS description. */
  description: 'Open-source, server-first tools for React and Next.js.',
  /**
   * Public origin of the deployed site, without a trailing slash.
   * This template is deployed at https://dimah.dev. Replace it when you deploy your own.
   */
  url: 'https://dimah.dev',
  /** Document language. `fa` with `direction: 'rtl'` flips the whole site. */
  locale: 'en' as Locale,
  direction: 'ltr' as Direction,

  author: {
    name: 'dimah',
    /** Short line under the name on posts and in structured data. */
    tagline: 'Believer in open source.',
    github: 'dimah-kz',
    githubUrl: 'https://github.com/dimah-kz',
    x: 'dimahkzx',
    xUrl: 'https://x.com/dimahkzx',
    /** Telegram username, without the `@`. The contact section links to it first. */
    telegram: 'dimahkz',
    telegramUrl: 'https://t.me/dimahkz',
    email: 'dimahkz.dev@gmail.com',
    /** Served from `public/dimah-avatar.png`. */
    avatarUrl: '/dimah-avatar.png',
  },

  /** The repository of this site. Used for "edit on GitHub" links. */
  repository: {
    owner: 'dimah-kz',
    name: 'dimah-portfolio',
    branch: 'main',
    url: 'https://github.com/dimah-kz/dimah-portfolio',
  },

  /** Home page copy. */
  home: {
    /** The hero title. `headlineAccent` follows it in the brand color. */
    headline: 'Server-first tools for',
    headlineAccent: 'React and Next.js.',
    intro:
      'I build and publish open-source tools under dimah-kz. Most of that work is dimah-starter, a multi-tenant SaaS starter for Next.js 16, and dimah-s3, an S3 upload toolkit that keeps credentials on the server.',
    /** Three ideas the projects share. Each is backed by the docs. */
    principles: [
      {
        icon: ServerIcon,
        title: 'Server-first',
        description:
          'Pages read the session in Server Components and every write is a Server Action. Permission checks run on each read, not only in a layout.',
      },
      {
        icon: KeyRoundIcon,
        title: 'Credentials stay on the backend',
        description:
          'The server signs an upload and the browser talks to the bucket. Auth, quotas, and database rules live in server hooks.',
      },
      {
        icon: LanguagesIcon,
        title: 'Both directions',
        description:
          'English and Persian ship together. Direction is set once on the document, so the same layout reads left-to-right and right-to-left.',
      },
    ],
  },
} as const;

export type Site = typeof site;

/** The whole hero title, for browser titles and share cards. */
export const headline = `${site.home.headline} ${site.home.headlineAccent}`;

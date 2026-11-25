import type { Locale } from "@/i18n/locales";

/**
 * The shape of `src/lib/site.ts`. Hover a field in your editor to read what it
 * does. Optional fields can be left out; the parts of the site that use them
 * are hidden.
 */

/**
 * Profiles the site has an icon and a label for, in `src/lib/links.ts`.
 * To support another one, add it there and here.
 */
export type ProfileId =
  "github" | "linkedin" | "x" | "telegram" | "email" | "website";

/** One step of the timeline in the About section. */
export interface Milestone {
  /** When, in your own words: an age, a year, or "Today". */
  period?: string;
  title: string;
  /** A link is written `[text](https://…)`. */
  description?: string;
}

/** Everything the site says about you, in one language. */
export interface SiteCopy {
  /** Your name as it is written in this language, when it differs from `author.name`. */
  name?: string;
  /** One line. The meta description, and the summary in the footer, the feed, and `llms.txt`. */
  description: string;
  /** Short line under your name: the hero, posts, and structured data. */
  tagline: string;
  /** A badge next to your name, such as "Open to new roles". Leave out to hide it. */
  availability?: string;
  /** A CV in `public/` (such as `/resume.pdf`) or a URL. Adds a button to the hero. */
  resume?: string;
  /** The paragraph in the contact section. */
  contact: string;
  /** The first screen of the home page. */
  home: {
    /** The hero title. `headlineAccent` follows it in a softer color. */
    headline: string;
    headlineAccent: string;
    /** One or two sentences under the title. */
    intro: string;
  };
  /** The About section. With no paragraphs and no milestones, it is hidden. */
  about: {
    /** A link is written `[text](https://…)`. */
    paragraphs: string[];
    /** The timeline under the paragraphs, oldest first. An empty list hides it. */
    journey: Milestone[];
  };
}

export interface SiteConfig {
  /** Short name. Shown in the header, browser titles, share images, and the footer. */
  name: string;
  /** Public origin of the deployed site, without a trailing slash. */
  url: string;

  author: {
    /** Your name as people write it. The hero, posts, and structured data. */
    name: string;
    /** Square image in `public/`, such as `/avatar.png`. */
    avatar: string;
  };

  /**
   * Profile links, in the order they show. A URL for each, and the address
   * for `email`. Leave one out to hide it everywhere.
   */
  profiles: Partial<Record<ProfileId, string>>;

  contact: {
    /** The profile behind the main button in the contact section. */
    primary: ProfileId;
    /** The profile behind the main button in the hero, such as your GitHub. Defaults to `primary`. */
    hero?: ProfileId;
  };

  /** Languages, frameworks, and tools, shown as badges in the About section. Leave out to hide them. */
  skills?: string[];

  /** Source of this site. The footer links to it. Leave out to hide the link. */
  repository?: string;

  /** The copy, once per language in `src/i18n/locales.ts`. */
  copy: Record<Locale, SiteCopy>;
}

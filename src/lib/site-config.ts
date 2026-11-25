import type { Locale } from "@/i18n/locales";
import type { LucideIcon } from "lucide-react";

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

export interface Principle {
  /** A lucide icon component, such as `ServerIcon`. */
  icon: LucideIcon;
  title: string;
  description: string;
}

/** Everything the site says about you, in one language. */
export interface SiteCopy {
  /** One line. The meta description, and the summary in the feed and `llms.txt`. */
  description: string;
  /** Short line under your name: the profile card, posts, and structured data. */
  tagline: string;
  /** A badge on the profile card, such as "Open to new roles". Leave out to hide it. */
  availability?: string;
  /** A CV in `public/` (such as `/resume.pdf`) or a URL. Adds a button to the profile card. */
  resume?: string;
  /** The paragraph in the contact section. */
  contact: string;
  /** Home page copy. */
  home: {
    /** The hero title. `headlineAccent` follows it in the brand color. */
    headline: string;
    headlineAccent: string;
    intro: string;
    /** Cards in the "How I build" section. An empty list hides the section. */
    principles: Principle[];
  };
}

export interface SiteConfig {
  /** Short name. Shown in the header, browser titles, share images, and the footer. */
  name: string;
  /** Public origin of the deployed site, without a trailing slash. */
  url: string;

  author: {
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
    /** The profile behind the main button in the hero and the contact section. */
    primary: ProfileId;
  };

  /** Source of this site. The footer links to it. Leave out to hide the link. */
  repository?: string;

  /** The copy, once per language in `src/i18n/locales.ts`. */
  copy: Record<Locale, SiteCopy>;
}

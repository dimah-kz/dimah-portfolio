import {
  GitHubIcon,
  LinkedInIcon,
  TelegramIcon,
  XIcon,
} from "@/components/icons";
import type { Locale } from "@/i18n/locales";
import { GlobeIcon, MailIcon } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { site } from "./site";
import type { ProfileId } from "./site-config";
import { postsIn } from "./source";

export type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export interface IconLink {
  label: string;
  href: string;
  icon: Icon;
}

/** A profile from `site.profiles`. Its label is `profiles.<id>` in the messages. */
export interface Profile {
  id: ProfileId;
  href: string;
  icon: Icon;
  /** The username, for profiles addressed by one (GitHub, X, Telegram). */
  handle?: string;
}

const profileIcons: Record<ProfileId, Icon> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
  telegram: TelegramIcon,
  email: MailIcon,
  website: GlobeIcon,
};

const handled = new Set<ProfileId>(["github", "x", "telegram"]);

function handleOf(id: ProfileId, url: string): string | undefined {
  if (!handled.has(id)) return;
  return new URL(url).pathname.split("/").find(Boolean);
}

/** `site.profiles`, in the order they are written there. */
export const profiles: Profile[] = Object.entries(site.profiles).flatMap(
  ([key, value]) => {
    const id = key as ProfileId;
    if (!value) return [];
    return [
      {
        id,
        href: id === "email" ? `mailto:${value}` : value,
        icon: profileIcons[id],
        handle: handleOf(id, value),
      },
    ];
  },
);

export function findProfile(id: ProfileId): Profile | undefined {
  return profiles.find((profile) => profile.id === id);
}

/** The main contact button: `site.contact.primary`, else the first profile. */
export const primaryContact: Profile | undefined =
  findProfile(site.contact.primary) ?? profiles[0];

/** The main button in the hero: `site.contact.hero`, else the main contact. */
export const heroContact: Profile | undefined =
  (site.contact.hero && findProfile(site.contact.hero)) || primaryContact;

/** Icon links in the header, after the theme and language switches. */
export const headerProfiles = profiles.filter(
  (profile) => profile.id === "github" || profile.id === "x",
);

export interface NavLink {
  /** Its label is `nav.<key>` in the messages. */
  key: "home" | "projects" | "blog";
  /** Path without the language, for `Link`. */
  href: string;
}

/**
 * Pages in the header, the footer, and the 404 page. The blog shows once the
 * language has a post.
 */
export function navLinks(locale: Locale): NavLink[] {
  return [
    { key: "projects", href: "/projects" },
    ...(postsIn(locale).length > 0
      ? [{ key: "blog" as const, href: "/blog" }]
      : []),
  ];
}

/** The feed of a language, before `localizePath`. */
export const feedPath = "/feed.xml";

/** The index for AI agents, before `localizePath`. See `src/lib/agents.ts`. */
export const llmsPath = "/llms.txt";

/** `true` for links that leave the site. */
export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

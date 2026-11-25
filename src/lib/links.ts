import {
  GitHubIcon,
  LinkedInIcon,
  TelegramIcon,
  XIcon,
} from "@/components/icons";
import { BotIcon, GlobeIcon, MailIcon, RssIcon } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { t } from "./i18n";
import { site } from "./site";
import type { ProfileId } from "./site-config";
import { posts } from "./source";

export interface NavLink {
  label: string;
  href: string;
}

export interface IconLink extends NavLink {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface Profile extends IconLink {
  id: ProfileId;
  /** The username, for profiles addressed by one (GitHub, X, Telegram). */
  handle?: string;
}

const profileIcons: Record<ProfileId, IconLink["icon"]> = {
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
        label: t.profiles[id],
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

/** Icon links in the header, after the pages. */
export const headerProfiles = profiles.filter(
  (profile) => profile.id === "github" || profile.id === "x",
);

/** Pages in the header, the footer, and the 404 page. The blog shows once it has a post. */
export const navLinks: NavLink[] = [
  { label: t.nav.projects, href: "/projects" },
  ...(posts.length > 0 ? [{ label: t.nav.blog, href: "/blog" }] : []),
];

export const feedLink: IconLink = {
  label: t.blog.rss,
  href: "/feed.xml",
  icon: RssIcon,
};

/** The index for AI agents, see `src/lib/agents.ts`. */
export const llmsLink: IconLink = {
  label: "llms.txt",
  href: "/llms.txt",
  icon: BotIcon,
};

/** `true` for links that leave the site. */
export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

import { GitHubIcon, TelegramIcon, XIcon } from "@/components/icons";
import { MailIcon, RssIcon } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { t } from "./i18n";
import { site } from "./site";

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink extends NavLink {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

/** Pages in the header and the footer. */
export const navLinks: NavLink[] = [
  { label: t.nav.projects, href: "/projects" },
  { label: t.nav.docs, href: "/docs" },
  { label: t.nav.blog, href: "/blog" },
];

/** Profiles from `site.author`. Remove a line to hide it everywhere. */
export const socialLinks: SocialLink[] = [
  { label: "Telegram", href: site.author.telegramUrl, icon: TelegramIcon },
  { label: "GitHub", href: site.author.githubUrl, icon: GitHubIcon },
  { label: "X", href: site.author.xUrl, icon: XIcon },
  { label: "Email", href: `mailto:${site.author.email}`, icon: MailIcon },
];

export const feedLink: SocialLink = {
  label: t.blog.rss,
  href: "/feed.xml",
  icon: RssIcon,
};

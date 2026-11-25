import { XIcon } from "@/components/icons";
import { site } from "@/lib/site";
import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared";
import { FolderGit2Icon, NotebookPenIcon } from "lucide-react";
import Image from "next/image";
import { t } from "./i18n";
import { navLinks } from "./links";

/** Avatar and name, linked to `/` by the layout. */
function BrandTitle() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src={site.author.avatarUrl}
        alt=""
        width={28}
        height={28}
        sizes="28px"
        priority
        className="size-7 rounded-full ring-1 ring-border"
      />
      <span className="font-heading text-[0.9375rem] font-semibold tracking-tight">
        {site.name}
      </span>
    </span>
  );
}

const xLink: LinkItemType = {
  type: "icon",
  url: site.author.xUrl,
  text: "X",
  label: "X",
  icon: <XIcon />,
  external: true,
};

/** Header of the home layout: `/`, `/projects`, `/blog`. */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <BrandTitle />,
      // Glass: the hero runs under the header. Tint and blur are in `global.css`.
      transparentMode: "always",
    },
    githubUrl: site.author.githubUrl,
    links: [
      ...navLinks.map(
        (link): LinkItemType => ({
          text: link.label,
          url: link.href,
          active: "nested-url",
        }),
      ),
      xLink,
    ],
  };
}

/** Docs sidebar shows the page tree, then links back to the rest of the site. */
export function docsOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <BrandTitle />,
    },
    githubUrl: site.author.githubUrl,
    links: [
      {
        text: t.nav.projects,
        url: "/projects",
        icon: <FolderGit2Icon />,
      },
      {
        text: t.nav.blog,
        url: "/blog",
        icon: <NotebookPenIcon />,
      },
      xLink,
    ],
  };
}

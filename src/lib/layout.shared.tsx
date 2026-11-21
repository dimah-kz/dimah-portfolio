import { site } from "@/lib/site";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import { appName, gitConfig } from "./shared";

function XIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

const xLink = {
  type: "icon" as const,
  url: site.author.xUrl,
  text: "X",
  label: "X",
  icon: <XIcon />,
  external: true,
};

function BrandTitle() {
  return (
    <span className="inline-flex items-center gap-2">
      <Image
        src={site.author.avatarUrl}
        alt=""
        width={24}
        height={24}
        sizes="24px"
        className="size-6 rounded-full"
      />
      {appName}
    </span>
  );
}

const githubUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

const headerLinks = [
  {
    text: "Docs",
    url: "/docs",
    active: "nested-url" as const,
  },
  {
    text: "Blog",
    url: "/blog",
    active: "nested-url" as const,
  },
];

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <BrandTitle />,
    },
    githubUrl,
    links: [...headerLinks, xLink],
  };
}

/** Docs sidebar shows the page tree. Header links stay on the home layout. */
export function docsOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <BrandTitle />,
    },
    githubUrl,
    links: [xLink],
  };
}

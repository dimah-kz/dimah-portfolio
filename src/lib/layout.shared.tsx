import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { appName, gitConfig } from "./shared";

const githubUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

const headerLinks: BaseLayoutProps["links"] = [
  {
    text: "Docs",
    url: "/docs",
    active: "nested-url",
  },
  {
    text: "Blog",
    url: "/blog",
    active: "nested-url",
  },
];

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    githubUrl,
    links: headerLinks,
  };
}

/** Docs sidebar shows the page tree. Header links stay on the home layout. */
export function docsOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    githubUrl,
  };
}

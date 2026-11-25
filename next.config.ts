import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const config: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // The site had a docs section. Each project's docs now live on its own site.
      { source: "/docs", destination: "/projects", permanent: true },
      { source: "/docs/:path*", destination: "/projects", permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: "/favicon.ico", destination: "/icon.png" },
      // `<page>.md` is the Markdown of a page, see `src/lib/agents.ts`.
      { source: "/:path*.md", destination: "/llms.mdx/:path*" },
    ];
  },
  serverExternalPackages: ["@takumi-rs/core"],
};

export default withMDX(config);

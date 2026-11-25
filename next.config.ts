import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withMDX = createMDX();
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const config: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // The site had a docs section. Each project's docs now live on its own site.
      { source: "/docs", destination: "/projects", permanent: true },
      { source: "/docs/:path*", destination: "/projects", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
  async rewrites() {
    // `.md` URLs and languages are routed by `src/proxy.ts`.
    return [{ source: "/favicon.ico", destination: "/icon.png" }];
  },
  serverExternalPackages: ["@takumi-rs/core"],
  experimental: {
    // `app/[locale]/layout.tsx` is the root layout, so URLs outside every
    // language get `app/global-not-found.tsx`.
    globalNotFound: true,
  },
};

export default withNextIntl(withMDX(config));

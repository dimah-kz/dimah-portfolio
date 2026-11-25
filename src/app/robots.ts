import { isPreviewDeploy } from "@/lib/seo";
import { site } from "@/lib/site";
import type { MetadataRoute } from "next";

/** Every crawler, AI agents included, may read the site. Preview deploys are closed. */
export default function robots(): MetadataRoute.Robots {
  if (isPreviewDeploy()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

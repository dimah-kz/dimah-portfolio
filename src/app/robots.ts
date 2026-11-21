import { isPreviewDeploy } from '@/lib/seo';
import { site } from '@/lib/site';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  if (isPreviewDeploy()) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

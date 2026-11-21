import { siteOgImage } from '@/lib/og';
import { site } from '@/lib/site';

export const alt = `${site.name} — ${site.description}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return siteOgImage(site.name, site.description);
}

import { createGetUrl } from 'fumadocs-core/source';
import { site } from './site';

export const appName = site.name;
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';

export const gitConfig = {
  user: site.repository.owner,
  repo: site.repository.name,
  branch: site.repository.branch,
};

const getImageUrl = createGetUrl(docsImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'image.webp'];

  return { segments, url: getImageUrl(segments, page.locale) };
}

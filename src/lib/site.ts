/**
 * Identity for this portfolio.
 *
 * The committed values are Dimah's public profile (https://github.com/dimah-kz)
 * and are the demo content of the template. Replace them to make the site yours.
 * Long-form copy lives in `content/`, not here.
 */
export const site = {
  name: 'dimah',
  description: 'Believer in open source.',
  /**
   * Public origin of the deployed site, without a trailing slash.
   * This template is deployed at https://dimah.dev. Replace it when you deploy your own.
   */
  url: 'https://dimah.dev',
  locale: 'en',
  direction: 'ltr',
  author: {
    name: 'dimah',
    github: 'dimah-kz',
    githubUrl: 'https://github.com/dimah-kz',
    x: 'dimahkzx',
    xUrl: 'https://x.com/dimahkzx',
    email: 'dimahkz.dev@gmail.com',
    /** Served from `public/dimah-avatar.png`. */
    avatarUrl: '/dimah-avatar.png',
  },
  repository: {
    owner: 'dimah-kz',
    name: 'dimah-portfolio',
    branch: 'main',
    url: 'https://github.com/dimah-kz/dimah-portfolio',
  },
} as const;

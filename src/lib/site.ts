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
  locale: 'en',
  direction: 'ltr',
  author: {
    name: 'dimah',
    github: 'dimah-kz',
    githubUrl: 'https://github.com/dimah-kz',
    x: 'dimahkzx',
    xUrl: 'https://x.com/dimahkzx',
    email: 'dimahkz.dev@gmail.com',
    avatarUrl: 'https://avatars.githubusercontent.com/u/312741413?v=4',
  },
  repository: {
    owner: 'dimah-kz',
    name: 'dimah-portfolio',
    branch: 'main',
    url: 'https://github.com/dimah-kz/dimah-portfolio',
  },
} as const;

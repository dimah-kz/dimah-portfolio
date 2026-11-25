# dimah-portfolio

A developer portfolio built to be forked: projects, work history, a blog, and a Markdown version of every page for AI agents. Everything about you lives in one config file and a `content/` folder, so making it yours needs no component edits.

The sample content is [dimah](https://github.com/dimah-kz), deployed at [dimah.dev](https://dimah.dev).

[![The home page share card of dimah.dev](https://dimah.dev/og/pages/home/image.png)](https://dimah.dev)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdimah-kz%2Fdimah-portfolio)

## Features

- **Home page**: a hero under a glass header, a profile card (live counts, your main contact, résumé, availability), selected work, experience, principles, the latest posts, and contact. A section with no content is hidden.
- **Projects** as a content collection: one `.mdx` file per project, with a logo, status, highlights, stack, and links to its live site and source.
- **Experience** as a content collection: one `.mdx` file per role.
- **Blog**: cards with a ribbon on the newest post, tags, reading time, newer and older links, a floating table of contents, and an RSS feed.
- **Readable by AI agents**: `llms.txt`, `llms-full.txt`, a `.md` version of every page, `Accept: text/markdown` content negotiation, and JSON-LD for the person, the projects, and each post. See [For AI agents](#for-ai-agents).
- **Share images** for every page, rendered at build time with [Takumi](https://www.npmjs.com/package/takumi-js), which shapes Persian and mixed-direction text.
- **SEO**: per-page metadata, canonical URLs, sitemap, and robots. Preview deploys are `noindex`.
- **Right-to-left ready**: logical CSS everywhere, and English and Persian interface labels. Two lines in the config flip the site.
- **shadcn-first design** on Base UI, with [Magic UI](https://magicui.design) for motion, light and dark themes, and one accent color.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Fumadocs MDX · shadcn/ui (`base-mira`, Base UI) · Magic UI · Takumi · lucide

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Then make it yours, in this order:

1. **Config.** Edit [`src/lib/site.ts`](src/lib/site.ts): name, description, deployed URL, author, profile links, contact, and home page copy. Each field is described in [`src/lib/site-config.ts`](src/lib/site-config.ts); hover one in your editor.
2. **Images.** Replace `public/avatar.png` (square), `src/app/icon.png` (512×512), and `src/app/apple-icon.png` (180×180).
3. **Content.** Replace the samples in `content/projects` and `content/blog`, add your roles to `content/experience`, and put your project logos in `public/logos`.
4. **Deploy.** Set `url` in `site.ts` to your domain, then deploy. On Vercel there is nothing else to configure.

## Make it yours

| What                                                      | Where                                                              |
| --------------------------------------------------------- | ------------------------------------------------------------------ |
| Name, description, URL, locale, direction                 | [`src/lib/site.ts`](src/lib/site.ts)                               |
| Author, availability, résumé                              | `site.author`                                                      |
| GitHub, LinkedIn, X, Telegram, email, website             | `site.profiles`. Leave one out to hide it everywhere.              |
| The main contact button and the contact paragraph         | `site.contact`                                                     |
| Headline, intro, principles                               | `site.home`                                                        |
| Projects                                                  | [`content/projects/*.mdx`](content/projects)                       |
| Project logos                                             | `public/logos/`, referenced by a project's `logo`                  |
| Work history                                              | [`content/experience/*.mdx`](content/experience)                   |
| Blog posts                                                | [`content/blog/*.mdx`](content/blog)                               |
| Guest authors                                             | `blogAuthors` in [`src/lib/source.ts`](src/lib/source.ts)          |
| Interface labels, per locale                              | [`src/lib/i18n.ts`](src/lib/i18n.ts)                               |
| Pages in the header and footer, icons in the header       | [`src/lib/links.ts`](src/lib/links.ts)                             |
| Accent color                                              | `--brand` in [`src/app/global.css`](src/app/global.css)            |
| Share image colors and layout                             | [`src/lib/og/card.tsx`](src/lib/og/card.tsx)                       |

### A project

```mdx
---
name: my-project
description: One or two sentences, shown on every card.
logo: /logos/my-project.svg # square image in public/; without it, the first letter is shown
status: beta # optional badge: active, beta, or archived
featured: true # large card on the home page
order: 1 # lower comes first
tag: my-project # blog posts with this tag show the project's logo
links:
  live: https://example.com
  repository: https://github.com/you/my-project
highlights:
  - What it does well
stack:
  - Next.js
---
```

Fields are validated by `projectSchema` in [`src/lib/projects.ts`](src/lib/projects.ts). Only the frontmatter is used. A logo is drawn on light and dark pages, so give it its own background.

### A role

```mdx
---
role: Senior Frontend Engineer
company: Example Inc.
url: https://example.com
location: Remote
start: 2023-04 # YYYY-MM
end: 2025-01 # leave out for a current role
summary: One or two sentences on what you did.
stack: [TypeScript, React]
---
```

Fields are validated by `experienceSchema` in [`src/lib/experience.ts`](src/lib/experience.ts). Current roles come first, then the newest. The section is hidden until the folder has a role.

### A blog post

```mdx
---
title: The title
description: One line under the title, in the feed, and in llms.txt.
date: 2026-11-21
tags: [my-project]
---
```

Posts are by the site's author unless they list `authors` (keys of `blogAuthors`). With no posts, the blog leaves the header and the home page.

## For AI agents

Every page can be read as Markdown, built from the same config and content as the HTML.

| URL                       | What it is                                                           |
| ------------------------- | -------------------------------------------------------------------- |
| `/llms.txt`               | An index of the site, following [llmstxt.org](https://llmstxt.org)   |
| `/llms-full.txt`          | Every page in one file                                               |
| `/index.md`               | The home page                                                        |
| `/projects.md`            | All projects                                                         |
| `/blog.md`, `/blog/<slug>.md` | The blog and each post                                           |
| `/blog/tags.md`, `/blog/tags/<tag>.md` | Tags                                                    |

- A request for any page with `Accept: text/markdown` gets its Markdown at the same URL ([`src/proxy.ts`](src/proxy.ts)).
- Each HTML page links its Markdown with `<link rel="alternate" type="text/markdown">`.
- JSON-LD describes the person (`Person`, `ProfilePage`), the projects (`ItemList` of `SoftwareSourceCode`), the blog (`Blog`), and each post (`BlogPosting`).
- `robots.txt` allows every crawler. Markdown responses are `noindex` and point search engines to the HTML page with a canonical `Link` header.

The Markdown is written in [`src/lib/agents.ts`](src/lib/agents.ts).

## Right-to-left

Set `locale: "fa"` and `direction: "rtl"` in `src/lib/site.ts`. The document, the Fumadocs UI, every label in `src/lib/i18n.ts`, dates, and share images follow. Inter covers Latin and Noto Sans Arabic covers Arabic script. To add a language, add its labels to `src/lib/i18n.ts` and its code to `Locale` in `src/lib/site-config.ts`.

## Structure

```
content/
  blog/            posts
  experience/      one file per role
  projects/        one file per project
public/
  avatar.png       your photo
  logos/           project logos
src/
  app/
    (home)/        home, /projects, /blog
    llms.mdx/      the Markdown of each page (served as <page>.md)
    llms.txt/      llms.txt and llms-full.txt
    og/            share images: pages, posts, tags
  components/
    home/          home page sections
    layout/        header slot, footer, page and section shells
    blog/          post list, post page, table of contents panel
    ui/            shadcn/ui and Magic UI components (CLI-managed)
  lib/
    site.ts        who you are, and the home page copy
    site-config.ts the documented shape of site.ts
    i18n.ts        interface labels and date formats
    links.ts       profiles, header and footer links
    projects.ts    projects collection
    experience.ts  experience collection
    source.ts      blog collection and authors
    agents.ts      Markdown pages and llms.txt
    seo.ts         metadata, share image URLs, JSON-LD
    og/            share card, renderer, and its fonts (OFL)
  proxy.ts         Accept: text/markdown negotiation
```

## Scripts

| Command             | What it does                    |
| ------------------- | ------------------------------- |
| `pnpm dev`          | Dev server on port 3000         |
| `pnpm build`        | Production build                |
| `pnpm lint`         | ESLint                          |
| `pnpm types:check`  | Route types and TypeScript      |
| `pnpm format`       | Prettier, with class sorting    |
| `pnpm format:check` | Prettier, without writing       |

CI runs `format:check`, `lint`, `types:check`, and `build` on every pull request ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)).

Add a shadcn component with `pnpm dlx shadcn@latest add <name>`, or a Magic UI one with `pnpm dlx shadcn@latest add @magicui/<name>`, from this directory. Coding agents should follow [`AGENTS.md`](AGENTS.md).

## Deploy

This is a standard Next.js app and deploys on Vercel with no extra configuration. Set `url` in [`src/lib/site.ts`](src/lib/site.ts) to your domain first, so canonical URLs, share images, the sitemap, and `llms.txt` point to it.

```bash
vercel link
vercel --prod
```

## License

[MIT](LICENSE) © [dimah-kz](https://github.com/dimah-kz)

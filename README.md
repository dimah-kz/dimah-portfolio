# dimah-portfolio

A developer portfolio with projects, docs, and a blog, built to be forked. Everything about you lives in one config file and a `content/` folder, so making it yours needs no component edits.

The sample content is [dimah](https://github.com/dimah-kz): the bio, the four open-source projects, their docs, and the notes in the blog. The deployed site is [dimah.dev](https://dimah.dev).

## Features

- **Home page**: a hero under a glass header (newest post, headline with a gold accent, a profile card with live counts and Telegram), featured projects, principles, latest posts, and contact. Every section reads from config or content.
- **Projects** as a content collection: one `.mdx` file of frontmatter per project, with logo, highlights, stack, and links.
- **Docs** with [Fumadocs](https://fumadocs.dev): sidebar, search, table of contents, copy as Markdown, and `llms.txt`.
- **Blog** as cards with a ribbon on the newest post, tags, reading time, newer/older links, a floating table of contents, and an RSS feed.
- **shadcn-first design**: shadcn/ui on Base UI for every surface, and [Magic UI](https://magicui.design) for motion (blur-fade entrances, a gold spotlight border on cards, shiny text).
- **Share images** for every page, rendered at build with [Takumi](https://www.npmjs.com/package/takumi-js): the gold wash, the title, and the avatar or the project's logo on a tile. Persian cards read right to left.
- **SEO**: per-page metadata, canonical URLs, JSON-LD, sitemap, robots. Preview deploys are `noindex`.
- **Right-to-left ready**: logical CSS everywhere, and English and Persian interface labels. Two lines in the config flip the site.
- **Light and dark** themes on shadcn/ui tokens, one accent color, and a custom 404 page.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Fumadocs MDX · shadcn/ui (`base-mira`, Base UI) · Magic UI · Takumi · lucide

## Make it yours

| What                                             | Where                                                    |
| ------------------------------------------------ | -------------------------------------------------------- |
| Name, bio, headline, links, locale, deployed URL | [`src/lib/site.ts`](src/lib/site.ts)                     |
| Telegram, GitHub, X, email                       | `site.author` in [`src/lib/site.ts`](src/lib/site.ts)    |
| Avatar                                           | `public/dimah-avatar.png`, path in `site.author.avatarUrl` |
| Projects                                         | [`content/projects/*.mdx`](content/projects)             |
| Docs                                             | [`content/docs`](content/docs), order in `meta.json`     |
| Blog posts                                       | [`content/blog/*.mdx`](content/blog), author key `dimah` |
| Interface labels (per locale)                    | [`src/lib/i18n.ts`](src/lib/i18n.ts)                     |
| Accent color                                     | `--brand` in [`src/app/global.css`](src/app/global.css)  |
| Share image colors and layout                    | [`src/lib/og/card.tsx`](src/lib/og/card.tsx)             |
| Project logos                                    | [`src/components/brand.tsx`](src/components/brand.tsx)  |

### A project

```mdx
---
name: my-project
description: One or two sentences, shown on every card.
mark: starter # logo key in src/components/brand.tsx; without one, the first letter is shown
featured: true # large card on the home page
order: 1
tag: my-project # blog posts with this tag show the project's logo
links:
  docs: /docs/my-project
  live: https://example.com
  repository: https://github.com/you/my-project
highlights:
  - What it does well
stack:
  - Next.js
---
```

The fields are validated by `projectSchema` in [`src/lib/projects.ts`](src/lib/projects.ts). Only the frontmatter is used.

### A blog post

```mdx
---
title: The title
description: One line under the title and in the feed.
date: 2026-11-21
tags: [my-project]
authors: [dimah]
---
```

### Right-to-left

Set `locale: 'fa'` and `direction: 'rtl'` in `src/lib/site.ts`. The document, the Fumadocs UI, and every label in `src/lib/i18n.ts` follow. Inter covers Latin, Noto Sans Arabic covers Arabic script. Add another language by adding its labels to `src/lib/i18n.ts`.

## Structure

```
content/
  blog/          posts
  docs/          docs pages and meta.json
  projects/      one file per project
src/
  app/
    (home)/      home, /projects, /blog
    docs/        /docs
    og/          share images: pages, posts, tags, docs
  components/
    home/        home page sections
    layout/      header slot, footer, page and section shells
    ui/          shadcn/ui and Magic UI components (CLI-managed)
    blog/        post list, post page, table of contents panel
  lib/
    site.ts      identity and home copy
    i18n.ts      interface labels and date formats
    projects.ts  projects collection
    source.ts    docs and blog collections
    seo.ts       metadata, share image URLs, JSON-LD
    og/          share card, renderer, and its fonts (OFL)
```

## Scripts

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm lint
pnpm types:check
pnpm build
```

Add a shadcn component with `pnpm dlx shadcn@latest add <name>`, or a Magic UI one with `pnpm dlx shadcn@latest add @magicui/<name>`, from this directory. Coding agents should follow [`AGENTS.md`](AGENTS.md).

## Deploy

The app is a Next.js project and deploys on Vercel with no extra config. The public origin is `site.url` in [`src/lib/site.ts`](src/lib/site.ts). Change it before you ship a fork, so canonical and Open Graph URLs match your domain.

```bash
vercel link
vercel --prod
```

## License

[MIT](LICENSE) © [dimah-kz](https://github.com/dimah-kz)

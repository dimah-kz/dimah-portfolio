# dimah-portfolio

A developer portfolio built to be forked: projects, work history, a blog, any number of languages, and a Markdown version of every page for AI agents. Everything about you lives in one config file and a `content/` folder, so making it yours needs no component edits.

The sample content is [dimah](https://github.com/dimah-kz), deployed at [dimah.dev](https://dimah.dev).

[![The home page share card of dimah.dev](https://dimah.dev/og/pages/home/image.png)](https://dimah.dev)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdimah-kz%2Fdimah-portfolio)

## Features

- **Home page**: a hero under a glass header (your name, tagline, title, intro, and main contact), your projects with the main one on a card of its own, an About section with your skills, a timeline of how you got here, experience, the latest posts, and contact. A section with no content is hidden.
- **Projects** as a content collection: one `.mdx` file per project, with a logo, status, highlights, stack, and links to its live site and source.
- **Experience** as a content collection: one `.mdx` file per role.
- **Blog**: a quiet list of posts, tags, reading time, newer and older links, a floating table of contents, and an RSS feed.
- **Multilingual** with [next-intl](https://next-intl.dev): English at `/`, Persian at `/fa`, each language indexed on its own with `hreflang`, a flag language switcher next to the theme switch and in the footer, and one file to add or remove a language. See [Languages](#languages).
- **Readable by AI agents**: `llms.txt`, `llms-full.txt`, a `.md` version of every page, `Accept: text/markdown` content negotiation, and JSON-LD for the person, the projects, and each post. See [For AI agents](#for-ai-agents).
- **Share images** for every page in every language, rendered at build time with [Takumi](https://www.npmjs.com/package/takumi-js), which shapes Persian and mixed-direction text.
- **SEO**: per-page metadata, canonical URLs, `hreflang`, a sitemap with language alternates, and robots. Preview deploys are `noindex`. Baseline security headers are set in `next.config.ts`.
- **Right-to-left ready**: logical CSS everywhere, so a right-to-left language needs no CSS pass. Persian is set in [Vazirmatn](https://github.com/rastikerdar/vazirmatn), with normal letter-spacing and code kept left to right.
- **shadcn-first design** on Base UI, with [Magic UI](https://magicui.design) for motion, light and dark themes, and one accent color.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · next-intl · Fumadocs MDX · shadcn/ui (`base-mira`, Base UI) · Magic UI · Takumi · lucide

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Then make it yours, in this order:

1. **Languages.** Keep, remove, or add languages in [`src/i18n/locales.ts`](src/i18n/locales.ts). See [Languages](#languages).
2. **Config.** Edit [`src/lib/site.ts`](src/lib/site.ts): name, deployed URL, author, profile links, contact, and, once per language, the description, tagline, home page copy, and About section. Each field is described in [`src/lib/site-config.ts`](src/lib/site-config.ts); hover one in your editor.
3. **Images.** Replace `public/avatar.png` (square), `src/app/icon.png` (512×512), and `src/app/apple-icon.png` (180×180).
4. **Content.** Replace the samples in `content/projects` and `content/blog`, add your roles to `content/experience`, and put your project logos in `public/logos`. Translations sit next to each file as `<name>.<locale>.mdx`.
5. **Deploy.** Set `url` in `site.ts` to your domain, then deploy. On Vercel there is nothing else to configure.

## Make it yours

| What                                                      | Where                                                              |
| --------------------------------------------------------- | ------------------------------------------------------------------ |
| Languages and the default language                        | [`src/i18n/locales.ts`](src/i18n/locales.ts)                       |
| Flags in the language switcher                            | [`src/i18n/flags.tsx`](src/i18n/flags.tsx)                         |
| Name, URL, author, and the name in another script         | [`src/lib/site.ts`](src/lib/site.ts), `site.copy.<locale>.name`    |
| Description, tagline, availability, résumé, per language  | `site.copy.<locale>`                                               |
| GitHub, LinkedIn, X, Telegram, email, website             | `site.profiles`. Leave one out to hide it everywhere.              |
| The main contact button                                   | `site.contact.primary`                                             |
| Contact paragraph, headline, intro, About, timeline       | `site.copy.<locale>`                                               |
| Skills in the About section                               | `site.skills`                                                      |
| Projects                                                  | [`content/projects/*.mdx`](content/projects)                       |
| Project logos                                             | `public/logos/`, referenced by a project's `logo`                  |
| Work history                                              | [`content/experience/*.mdx`](content/experience)                   |
| Blog posts                                                | [`content/blog/*.mdx`](content/blog)                               |
| Guest authors                                             | `blogAuthors` in [`src/lib/source.ts`](src/lib/source.ts)          |
| Interface labels, per language                            | [`messages/<locale>.json`](messages)                               |
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
featured: true # your main project: first, on a full-width card
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

A translation, `my-project.fa.mdx`, holds only the fields that read differently (`name`, `description`, `highlights`); everything else comes from `my-project.mdx`.

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

Fields are validated by `experienceSchema` in [`src/lib/experience.ts`](src/lib/experience.ts). Current roles come first, then the newest. The section is hidden until the folder has a role. A translation, `<role>.fa.mdx`, holds only `role`, `company`, `location`, or `summary`.

### A blog post

```mdx
---
title: The title
description: One line under the title, in the feed, and in llms.txt.
date: 2026-11-21
tags: [my-project]
---
```

Posts are by the site's author unless they list `authors` (keys of `blogAuthors`). A translation is a whole post, `my-post.fa.mdx`, served at `/fa/blog/my-post`; link to other posts with the language prefix (`/fa/blog/...`). A language lists only the posts written in it, and a language with no posts drops the blog from its header and home page.

## For AI agents

Every page can be read as Markdown, in every language, built from the same config and content as the HTML. Other languages put their prefix in front: `/fa/llms.txt`, `/fa/index.md`, `/fa/blog/<slug>.md`.

| URL                       | What it is                                                           |
| ------------------------- | -------------------------------------------------------------------- |
| `/llms.txt`               | An index of the site, following [llmstxt.org](https://llmstxt.org)   |
| `/llms-full.txt`          | Every page in one file                                               |
| `/index.md`               | The home page                                                        |
| `/projects.md`            | All projects                                                         |
| `/blog.md`, `/blog/<slug>.md`          | The blog and each post                                             |
| `/blog/tags.md`, `/blog/tags/<tag>.md` | Tags                                                    |

- A request for any page with `Accept: text/markdown` gets its Markdown at the same URL ([`src/proxy.ts`](src/proxy.ts)).
- Each HTML page links its Markdown with `<link rel="alternate" type="text/markdown">`.
- JSON-LD describes the person (`Person`, `ProfilePage`), the projects (`ItemList` of `SoftwareSourceCode`), the blog (`Blog`), and each post (`BlogPosting`).
- `robots.txt` allows every crawler. Markdown responses are `noindex` and point search engines to the HTML page with a canonical `Link` header.

The Markdown is written in [`src/lib/agents.ts`](src/lib/agents.ts).

## Languages

The site ships in English (the default) and Persian. Routing, labels, and formats are [next-intl](https://next-intl.dev); content translations are Fumadocs files.

- **URLs.** The default language has no prefix (`/projects`); every other language has its code in front (`/fa/projects`). `/en/...` redirects to the unprefixed URL. A URL always shows the same language, with no redirect by browser language or cookie, so crawlers and shared links see stable pages.
- **SEO.** Each page has its own canonical URL, `hreflang` for every language it exists in plus `x-default`, `og:locale`, a share image, a feed, and a sitemap entry with its alternates. A post without a translation lists no alternates.
- **Switcher.** A small menu next to the theme switch in the header and the mobile menu, and again in the footer. It shows only the current language's flag and short name (`EN`, `فا`) and opens the list of languages. It opens the same page in the other language, or that language's home when the page has no translation.
- **Direction and dates.** `dir` comes from the language (`fa` is right to left), and dates use its calendar and digits.

### Add a language

1. Add it to [`src/i18n/locales.ts`](src/i18n/locales.ts): its name, its short name in its own script, its direction, and its Open Graph locale.
2. Add `messages/<code>.json` (start from `en.json`) and a line for it in [`src/i18n/messages.ts`](src/i18n/messages.ts).
3. Add its copy to `copy` in [`src/lib/site.ts`](src/lib/site.ts).
4. Add its flag in [`src/i18n/flags.tsx`](src/i18n/flags.tsx), from [`country-flag-icons`](https://www.npmjs.com/package/country-flag-icons).
5. Optionally, translate content: `<name>.<code>.mdx` next to a project, role, or post. Fumadocs UI labels go in [`src/i18n/fumadocs.ts`](src/i18n/fumadocs.ts).

TypeScript reports any step that is missing, including a key missing from the new messages file. To remove a language, undo the same steps and delete its `.<code>.mdx` files. To change the default language, set `defaultLocale`; its pages take the unprefixed URLs.

Inter covers Latin and Vazirmatn covers Persian and Arabic. Share images use the same files, in `src/lib/og/fonts`. Another script needs its font in [`src/app/fonts.ts`](src/app/fonts.ts).

## Structure

```
content/
  blog/            posts, with translations as <slug>.<locale>.mdx
  experience/      one file per role
  projects/        one file per project
messages/          interface labels, one JSON file per language
public/
  avatar.png       your photo
  logos/           project logos
src/
  app/
    [locale]/      everything that has a language
      (home)/      home, /projects, /blog
      llms.mdx/    the Markdown of each page (served as <page>.md)
      llms.txt/    llms.txt, and llms-full.txt next to it
      feed.xml/    the RSS feed
      og/          share images: pages, posts, tags
    sitemap.ts     every page in every language, with alternates
  components/
    home/          home page sections
    layout/        header slot, footer, page and section shells
    blog/          post list, post page, table of contents panel
    ui/            shadcn/ui and Magic UI components (CLI-managed)
  i18n/
    locales.ts     the languages: add or remove one here
    routing.ts     next-intl routing: prefixes, no detection
    request.ts     next-intl request config: messages and formats
    navigation.ts  locale-aware Link and router
    fumadocs.ts    content and Fumadocs UI languages
  lib/
    site.ts        who you are, and your copy per language
    site-config.ts the documented shape of site.ts
    links.ts       profiles, header and footer links
    projects.ts    projects collection
    experience.ts  experience collection
    source.ts      blog collection and authors
    agents.ts      Markdown pages and llms.txt
    seo.ts         metadata, hreflang, share image URLs, JSON-LD
    og/            share card, renderer, and its fonts (OFL)
  proxy.ts         next-intl routing, .md URLs, Accept: text/markdown
```

## Scripts

| Command             | What it does                    |
| ------------------- | ------------------------------- |
| `pnpm dev`          | Dev server on port 3000         |
| `pnpm build`        | Production build                |
| `pnpm lint`         | ESLint                          |
| `pnpm types:check`  | Route types and TypeScript      |
| `pnpm test`         | Unit tests (Vitest)             |
| `pnpm format`       | Prettier, with class sorting    |
| `pnpm format:check` | Prettier, without writing       |

CI runs `format:check`, `lint`, `types:check`, `test`, and `build` on every pull request ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)).

Add a shadcn component with `pnpm dlx shadcn@latest add <name>`, or a Magic UI one with `pnpm dlx shadcn@latest add @magicui/<name>`, from this directory. Coding agents should follow [`AGENTS.md`](AGENTS.md).

## Deploy

This is a standard Next.js app (Node.js 20.9 or newer) and deploys on Vercel with no extra configuration. Set `url` in [`src/lib/site.ts`](src/lib/site.ts) to your domain first, so canonical URLs, `hreflang`, share images, the sitemap, and `llms.txt` point to it.

```bash
vercel link
vercel --prod
```

## License

[MIT](LICENSE) © [dimah-kz](https://github.com/dimah-kz)

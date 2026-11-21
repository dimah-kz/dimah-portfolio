# dimah-portfolio

A personal portfolio for developers, and a template you can make your own. Content is [MDX](https://fumadocs.dev/docs/mdx) through [Fumadocs](https://fumadocs.dev). UI is [shadcn/ui](https://ui.shadcn.com) on Base UI.

The sample copy is [dimah](https://github.com/dimah-kz): the name, the bio, and the open-source projects in the docs and the blog. The deployed site is [dimah.dev](https://dimah.dev). Replace the copy, and `url` in [`src/lib/site.ts`](src/lib/site.ts), when you deploy your own.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Fumadocs MDX · shadcn/ui (`base-mira`, Base UI) · lucide

Direction is ready for right-to-left. Styles use logical properties (`ms-*`, `ps-*`, `text-start`), and `src/lib/site.ts` is the switch.

## Make it yours

| What                                        | Where                                                  |
| ------------------------------------------- | ------------------------------------------------------ |
| Name, bio, locale, direction, GitHub, email, deployed URL | [`src/lib/site.ts`](src/lib/site.ts)                   |
| Docs                                        | [`content/docs`](content/docs)                         |
| Blog posts                                  | [`content/blog`](content/blog)                         |
| Home page                                   | [`src/app/(home)/page.tsx`](<src/app/(home)/page.tsx>) |

Set `direction` to `"rtl"` and `locale` to `"fa"` (or another language) when the portfolio should read right-to-left. Inter covers Latin; Noto Sans Arabic covers Arabic script. Coding agents should follow [`AGENTS.md`](AGENTS.md).

## Scripts

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm lint
pnpm types:check
pnpm build
```

Add a shadcn component with `pnpm dlx shadcn@latest add <name>` from this directory. The blog components come from `pnpm dlx @fumadocs/cli@latest add blog`.

## Deploy

The app is a Next.js project and deploys on Vercel with no extra config. `pnpm` is the package manager. The public origin is `site.url` in [`src/lib/site.ts`](src/lib/site.ts). For this repository that is `https://dimah.dev`. Change it before you ship a fork so canonical and Open Graph URLs match your domain.

```bash
vercel link
vercel --prod
```

## License

[MIT](LICENSE) © [dimah-kz](https://github.com/dimah-kz)

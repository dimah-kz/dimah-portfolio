# dimah-portfolio

A personal portfolio and a public template for developers. The sample copy is Dimah's public profile ([github.com/dimah-kz](https://github.com/dimah-kz)). Someone making it theirs edits `src/lib/site.ts` and the files under `content/`, and never a component. Do not invent a biography, an employer, a location, or a metric that is not already in those files.

This site is built with [Fumadocs](https://fumadocs.dev) on Next.js. Fumadocs APIs differ from most training data, so check its docs before using them:

- Writing pages: https://fumadocs.dev/docs/next/markdown.md
- Organizing pages and folders: https://fumadocs.dev/docs/next/page-conventions.md
- Collections: https://fumadocs.dev/docs/mdx/collections
- Customizing the UI: https://fumadocs.dev/docs/next/guides/customize-ui.md
- Theme: https://fumadocs.dev/docs/ui/theme.md
- Upgrading: https://fumadocs.dev/docs/next/upgrade.md
- Every docs page: https://fumadocs.dev/llms.txt

## Stack

Next.js 16, React 19, Tailwind CSS 4. Exact versions are in `package.json`.

| Concern           | Use                                                                                                            |
| ----------------- | -------------------------------------------------------------------------------------------------------------- |
| Long-form content | Fumadocs MDX (`fumadocs-mdx`, `fumadocs-core`). Docs chrome is `fumadocs-ui`, resolved to `@fumadocs/base-ui`. |
| UI primitives     | shadcn/ui in `src/components/ui`. Style `base-mira`, library Base UI (`@base-ui/react`), not Radix.            |
| Icons             | `lucide-react`. `components.json` `iconLibrary` is `lucide`.                                                   |
| Class names       | `import { cn } from "cn"`.                                                                                     |
| Direction         | `site.direction` in `src/lib/site.ts`. `components.json` has `"rtl": true`.                                    |
| Interface labels  | `t` from `src/lib/i18n.ts`, one set per locale. Dates with `formatDate` from the same file.                    |
| Page shells       | `SiteLayout`, `Container`, `Section`, `SectionHeader`, `Eyebrow`, `PageHeader` in `src/components/layout`.     |
| Decoration        | `Rings` and `Cover` in `src/components`. The share cards in `src/lib/og/card.tsx` draw the same shapes.        |
| Share images      | Takumi (`takumi-js`), routes under `src/app/og`, URLs from `ogImage` in `src/lib/seo.ts`.                      |
| Buttons           | Pointer cursor is the base rule in `src/app/global.css`. Leave it in place.                                    |

## Commands

| Task                   | Command                             |
| ---------------------- | ----------------------------------- |
| Dev server             | `pnpm dev`                          |
| Lint                   | `pnpm lint`                         |
| Types                  | `pnpm types:check`                  |
| Production build       | `pnpm build`                        |
| Add a shadcn component | `pnpm dlx shadcn@latest add <name>` |

Run shadcn from this directory so it reads `components.json`. Do not pass `--base radix`.

## Rules

1. **Copy is content.** Identity, profile links, and the home page copy (headline, intro, principles) live in `src/lib/site.ts`. Projects are `content/projects/*.mdx`. Docs are MDX in `content/docs`. Blog posts are MDX in `content/blog`. A component reads those; it does not restate them. Do not add placeholder posts or project claims that are not true of dimah-kz.
2. **Interface labels are not copy.** Button text, section titles, and aria labels come from `t` in `src/lib/i18n.ts`, which has an `en` and a `fa` set. A new label goes in both sets. Do not hardcode English in a component.
3. **A new section that is a set of documents is a Fumadocs collection**, then a route. Do not start that section as a hardcoded array in a component. Docs and the blog are loaded in `src/lib/source.ts`. Projects are loaded in `src/lib/projects.ts` as a `doc` collection read for its frontmatter (a `meta` collection does not load in fumadocs-mdx 15.6). The blog was installed with `pnpm dlx @fumadocs/cli@latest add blog` and is rendered by `src/app/(home)/blog`.
4. **Reach for an installed shadcn component before custom markup.** Add a missing primitive with the CLI. Compose at the call site. Do not restyle a primitive's colors or radius with `className`.
5. **Base UI, not Radix.** Custom triggers use `render`, not `asChild`. `nativeButton={false}` is for a non-button tag that should still be a button. A link that should look like a button uses `className={buttonVariants()}` on `Link`. Do not pass a link to `Button`'s `render` prop — Base UI forces `role="button"` on it.
6. **Logical properties everywhere.** `ms-*` / `me-*`, `ps-*` / `pe-*`, `start-*` / `end-*`, `text-start`, `border-s`, `rounded-s`. `gap-*`, not `space-x-*` or `space-y-*`. Equal width and height is `size-*`. A directional arrow gets `rtl:rotate-180`. This is what makes `site.direction = "rtl"` work without a restyle.
7. **Direction is set once.** `lang` and `dir` go on `<html>`. Pass the same `site.direction` to `DirectionProvider` and to Fumadocs `RootProvider`. Do not set `dir` on nested elements.
8. **Icons inside a component get `data-icon` and no size class.** `data-icon="inline-start"` or `data-icon="inline-end"`. Pass the component (`icon={CheckIcon}`), not a string. Brand icons (GitHub, X) are in `src/components/icons.tsx`; lucide does not ship them.
9. **Feedback uses the installed toast.** `import { toast } from "@/components/ui/toast"`, then `toast.add({ title, type })`. `Toaster` is already mounted in the root layout. Do not add Sonner.
10. **Colors are tokens.** `bg-background`, `text-muted-foreground`, `border-border`. No raw palette classes for UI chrome. `--brand` (`bg-brand`, `text-brand`) is the accent sampled from the avatar; use it for marks, icons, and glows, not for body text. Fumadocs uses `fumadocs-ui/css/shadcn.css` so docs colors follow the same tokens.
11. **Fonts.** `--font-latin` is Inter, `--font-arabic` is Noto Sans Arabic, and both `font-sans` and `font-heading` use that stack. Persian and Arabic glyphs already resolve. Do not put a second font-family on `<html>`.
12. **Every page renders its own `<main id="main">`.** `SiteLayout` wraps `(home)` routes and the 404 page with the header and the footer. The skip link targets `#main`. Content width is `--fd-layout-width`, so the header and the page line up; use `Container` instead of a new `max-w-*`. The header is glass (`transparentMode: "always"` plus the `#nd-nav` rule in `global.css`), and the first block of a page runs under it with `-mt-14 pt-14`, as `Hero` and `PageHeader` do.
13. **Every page has a share image.** A new route passes its card URL as the third argument of `pageMeta` (`ogImage.page`, `ogImage.post`, `ogImage.tag`), and a new kind of page adds a route under `src/app/og` that renders `OgCard`. Do not go back to `next/og`: Satori does not shape Persian. Images cannot read CSS variables, so keep `ogColors` in step with `global.css`.

## Make it yours

| Change                                                    | Where                                                         |
| --------------------------------------------------------- | ------------------------------------------------------------- |
| Name, tagline, headline, intro, principles, profile links | `src/lib/site.ts`                                             |
| Telegram, GitHub, X, email                                | `site.author` in `src/lib/site.ts`                            |
| Locale, direction, deployed URL                           | `src/lib/site.ts` (`site.url`, currently `https://dimah.dev`) |
| Projects                                                  | `content/projects/*.mdx`, fields in `projectSchema`           |
| Project logos                                             | `src/components/brand.tsx`, referenced by a project's `mark`  |
| Docs                                                      | `content/docs` and `content/docs/meta.json`                   |
| Blog posts                                                | `content/blog/*.mdx`. Author key `dimah`                      |
| Interface labels                                          | `src/lib/i18n.ts`                                             |
| Home page sections                                        | `src/components/home`, composed in `src/app/(home)/page.tsx`  |
| Header and footer links                                   | `src/lib/links.ts`, read by `src/lib/layout.shared.tsx`       |
| Accent color                                              | `--brand` in `src/app/global.css`                             |
| Share image design                                        | `src/lib/og/card.tsx`                                         |

Setting `direction` to `"rtl"` and `locale` to `"fa"` flips the document, the Fumadocs UI, the labels, and the date format. Keep writing styles with the logical properties above so that flip does not require a CSS pass.

## Check

`pnpm lint` and `pnpm types:check` pass. UI changes are checked in the running app, including `/`, `/projects`, `/docs`, and `/blog`, in light and dark, at phone width, and once with `direction: "rtl"`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

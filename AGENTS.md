# dimah-portfolio

A personal portfolio and a public template for developers. The sample copy is Dimah's public profile ([github.com/dimah-kz](https://github.com/dimah-kz)). Someone making it theirs edits `src/lib/site.ts` and the MDX under `content/`. Do not invent a biography, an employer, a location, or a metric that is not already in those files.

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

1. **Copy is content.** Docs are MDX in `content/docs`. Blog posts are MDX in `content/blog`. Name, description, locale, direction, and profile links live only in `src/lib/site.ts`. A component reads those; it does not restate them. Do not add placeholder posts or project claims that are not true of dimah-kz.
2. **A new section that is a set of documents is a Fumadocs collection**, then a route. Do not start that section as a hardcoded array in a component. Docs are loaded in `src/lib/source.ts`. The blog collection is there too, installed with `pnpm dlx @fumadocs/cli@latest add blog`, and rendered by `src/app/(home)/blog`.
3. **Reach for an installed shadcn component before custom markup.** Add a missing primitive with the CLI. Compose at the call site. Do not restyle a primitive's colors or radius with `className`.
4. **Base UI, not Radix.** Custom triggers use `render`, not `asChild`. `nativeButton={false}` is for a non-button tag that should still be a button. A link that should look like a button uses `className={buttonVariants()}` on `Link`. Do not pass a link to `Button`'s `render` prop — Base UI forces `role="button"` on it.
5. **Logical properties everywhere.** `ms-*` / `me-*`, `ps-*` / `pe-*`, `start-*` / `end-*`, `text-start`, `border-s`, `rounded-s`. `gap-*`, not `space-x-*` or `space-y-*`. Equal width and height is `size-*`. This is what makes `site.direction = "rtl"` work later without a restyle.
6. **Direction is set once.** `lang` and `dir` go on `<html>`. Pass the same `site.direction` to `DirectionProvider` and to Fumadocs `RootProvider`. Do not set `dir` on nested elements.
7. **Icons inside a component get `data-icon` and no size class.** `data-icon="inline-start"` or `data-icon="inline-end"`. Pass the component (`icon={CheckIcon}`), not a string.
8. **Feedback uses the installed toast.** `import { toast } from "@/components/ui/toast"`, then `toast.add({ title, type })`. `Toaster` is already mounted in the root layout. Do not add Sonner.
9. **Colors are tokens.** `bg-background`, `text-muted-foreground`, `border-border`. No raw palette classes for UI chrome. Fumadocs uses `fumadocs-ui/css/shadcn.css` so docs colors follow the same tokens.
10. **Fonts.** `--font-latin` is Inter, `--font-arabic` is Noto Sans Arabic, and both `font-sans` and `font-heading` use that stack. Persian and Arabic glyphs already resolve. Do not put a second font-family on `<html>`.

## Make it yours

| Change                                      | Where                                         |
| ------------------------------------------- | --------------------------------------------- |
| Name, bio, locale, direction, GitHub, email, deployed URL | `src/lib/site.ts` (`site.url`, currently `https://dimah.dev`) |
| Docs                                        | `content/docs` and `content/docs/meta.json`   |
| Blog posts                                  | `content/blog/*.mdx`. Author key `dimah`      |
| Home page sections                          | `src/app/(home)/`                             |
| Docs navigation label                       | `src/lib/layout.shared.tsx` reads `site.name` |

Setting `direction` to `"rtl"` and `locale` to `"fa"` flips the document. Keep writing styles with the logical properties above so that flip does not require a CSS pass.

## Check

`pnpm lint` and `pnpm types:check` pass. UI changes are checked in the running app, including `/`, `/docs`, and `/blog`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

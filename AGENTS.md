# dimah-portfolio

A personal portfolio and a public template for developers. The sample copy is Dimah's public profile ([github.com/dimah-kz](https://github.com/dimah-kz)). Someone making it theirs edits `src/lib/site.ts`, the files under `content/`, and the images in `public/`, and never a component. Do not invent a biography, an employer, a location, or a metric that is not already in those files. `content/experience` is empty on purpose: the sample has no work history to show.

This site is built with [Fumadocs](https://fumadocs.dev) and [next-intl](https://next-intl.dev) on Next.js. Their APIs differ from most training data, so check the docs before using them:

- Collections: https://fumadocs.dev/docs/mdx/collections
- Writing Markdown: https://fumadocs.dev/docs/next/markdown.md
- Customizing the UI: https://fumadocs.dev/docs/next/guides/customize-ui.md
- Theme: https://fumadocs.dev/docs/ui/theme.md
- Upgrading: https://fumadocs.dev/docs/next/upgrade.md
- Every docs page: https://fumadocs.dev/llms.txt
- next-intl App Router setup: https://next-intl.dev/docs/getting-started/app-router
- next-intl routing: https://next-intl.dev/docs/routing

## Stack

Next.js 16, React 19, Tailwind CSS 4. Exact versions are in `package.json`.

| Concern           | Use                                                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Content           | Fumadocs MDX collections (`fumadocs-mdx`, `fumadocs-core`). Header and providers are `fumadocs-ui`, resolved to `@fumadocs/base-ui`. |
| UI primitives     | shadcn/ui in `src/components/ui`. Style `base-mira`, library Base UI (`@base-ui/react`), not Radix.                                  |
| Motion & effects  | Magic UI (`@magicui` registry, `motion`): `BlurFade`, `MagicCard`.                                              |
| Icons             | `lucide-react`. Brand icons (GitHub, LinkedIn, X, Telegram) are in `src/components/icons.tsx`.                                       |
| Class names       | `import { cn } from "cn"`.                                                                                                           |
| Config            | `site` in `src/lib/site.ts`, typed and documented by `SiteConfig` in `src/lib/site-config.ts`.                                       |
| Languages         | `src/i18n/locales.ts` is the list. next-intl routing in `src/i18n/routing.ts`, `Link` from `src/i18n/navigation.ts`.               |
| Direction         | `localeConfig[locale].dir`, set on `<html>`. `components.json` has `"rtl": true`.                                                    |
| Interface labels  | `messages/<locale>.json`, read with `useTranslations` / `getTranslations`. Dates with `useFormatter().dateTime(date, "date")`.      |
| Links             | `profiles`, `primaryContact`, `findProfile`, `navLinks`, `headerProfiles` in `src/lib/links.ts`, derived from `site`.                |
| Page shells       | `SiteLayout`, `Container`, `Section`, `SectionHeader`, `PageHeader` in `src/components/layout`.                           |
| Site compositions | `SpotlightCard`, `SocialLinks`, `ContactButton`, `ProjectCard`, `ProjectLogo`, `BlogList`, `Timeline`.                                 |
| Agents            | Markdown pages and `llms.txt` in `src/lib/agents.ts`. `Accept: text/markdown` in `src/proxy.ts`.                                     |
| Share images      | Takumi (`takumi-js`), routes under `src/app/og`, URLs from `ogImage` in `src/lib/seo.ts`.                                            |
| Buttons           | Pointer cursor is the base rule in `src/app/global.css`. Leave it in place.                                                          |

## Commands

| Task                   | Command                                                            |
| ---------------------- | ------------------------------------------------------------------ |
| Dev server             | `pnpm dev`                                                         |
| Lint                   | `pnpm lint`                                                        |
| Types                  | `pnpm types:check`                                                 |
| Unit tests             | `pnpm test` (Vitest, `src/**/*.test.ts`)                           |
| Format                 | `pnpm format` (Prettier with the Tailwind plugin)                  |
| Format check           | `pnpm format:check`                                                |
| Production build       | `pnpm build`                                                       |
| Add a shadcn component | `pnpm dlx shadcn@latest add <name>`                                |
| Add a Magic UI item    | `pnpm dlx shadcn@latest add @magicui/<name>`                       |
| Search the registries  | `pnpm dlx shadcn@latest search @shadcn -q <query>` (or `@magicui`) |

Run shadcn from this directory so it reads `components.json`. Do not pass `--base radix`. `src/components/ui` holds only the components in use; add one when you need it.

## Design is shadcn-first

The look of this site comes from shadcn/ui, not from hand-made markup. Before writing UI, go down this list and stop at the first step that fits:

1. **An installed shadcn component.** The list is `src/components/ui`. Use its full composition: `Card` with `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`; `Item` inside `ItemGroup`; `Avatar` with `AvatarFallback`; `Empty` with `EmptyHeader`. Use its variants (`variant="outline"`, `size="lg"`) before classes.
2. **A shadcn component that is not installed yet.** Find it with `pnpm dlx shadcn@latest search @shadcn -q <query>` and add it with the CLI. Do not copy component code by hand.
3. **A Magic UI item** for motion and effects, from the `@magicui` registry (configured in `components.json`). Already installed: `BlurFade` (entrance when in view), `MagicCard` (spotlight border on project cards, used through `SpotlightCard`). Content must read right without JavaScript: do not add effects that render a placeholder value (a counter starting at 0) in the server HTML. After adding one, read it: swap `@/lib/utils` for `cn`, raw colors (`neutral-*`, `black`, `white`) for tokens, and any hardcoded locale for a prop.
4. **A small composition in `src/components`** built from the steps above, with tokens and logical properties, such as `SpotlightCard` or `ContactButton`. Only then custom markup.

Keep the look calm: no background patterns (grids, dots, rings), one accent (`--brand`), and the soft `bg-wash` light under the glass header as the only backdrop. Above the fold, animate with CSS (`animate-in fade-in blur-in-sm` from tw-animate-css) so content shows before hydration; below it, wrap sections in `BlurFade inView`. Motion follows the visitor's reduced-motion setting through `MotionProvider`.

## Rules

1. **Copy is content.** Identity, profile links, and contact live in `src/lib/site.ts`, and the copy about the person (description, tagline, home page, About, and the timeline) lives there once per language in `site.copy`. Projects are `content/projects/*.mdx`, roles are `content/experience/*.mdx`, and posts are `content/blog/*.mdx`, with translations next to them as `<name>.<locale>.mdx`. A component reads those; it does not restate them. Do not add placeholder posts, roles, or project claims that are not true of dimah-kz.
2. **Interface labels are not copy.** Button text, section titles, and aria labels come from `messages/<locale>.json` through `useTranslations` (sync components) or `getTranslations` (async ones, metadata, routes). A new label goes in every messages file; `src/i18n/messages.ts` makes a missing key a type error. Plurals and placeholders use ICU (`{count, plural, ...}`). Do not hardcode English in a component.
3. **A set of documents is a Fumadocs collection**, then a route or a section. Do not start it as a hardcoded array in a component. The blog is loaded in `src/lib/source.ts` with the languages of `src/i18n/fumadocs.ts` and rendered by `src/app/[locale]/(home)/blog`. Projects (`src/lib/projects.ts`) and experience (`src/lib/experience.ts`) are `doc` collections read for their frontmatter (a `meta` collection does not load in fumadocs-mdx 15.6); a translation file holds only the fields of its translation schema (`localizedEntries`).
4. **Empty content hides its UI.** A home section, a nav link, or a button whose content is missing (no roles, no posts, no `resume`, a profile left out of `site.profiles`) renders nothing. A new optional field follows the same rule.
5. **No person-specific code.** A component never names a platform the person may not use. Read `primaryContact`, `profiles`, and `findProfile()` from `src/lib/links.ts`. A new profile type goes in `ProfileId` in `site-config.ts`, `profileIcons` in `links.ts`, and `t.profiles` and `t.contact.cta` in `i18n.ts`.
6. **shadcn first.** Follow [Design is shadcn-first](#design-is-shadcn-first). Compose at the call site. `className` on a primitive is for layout and size, not for its colors or radius.
7. **Base UI, not Radix.** Custom triggers use `render`, not `asChild`. `nativeButton={false}` is for a non-button tag that should still be a button. A link that should look like a button uses `className={buttonVariants()}` on `Link`. Do not pass a link to `Button`'s `render` prop — Base UI forces `role="button"` on it.
8. **Logical properties everywhere.** `ms-*` / `me-*`, `ps-*` / `pe-*`, `start-*` / `end-*`, `text-start`, `border-s`, `rounded-s`. `gap-*`, not `space-x-*` or `space-y-*`. Equal width and height is `size-*`. A directional arrow gets `rtl:rotate-180`. This is what makes a right-to-left language work without a restyle.
9. **Direction is set once per language.** `lang` and `dir` go on `<html>` in `src/app/[locale]/layout.tsx`, from `localeConfig`. Pass the same `dir` to `DirectionProvider` and to Fumadocs `RootProvider`. Do not set `dir` on nested elements, except `dir="ltr"` on a handle or a URL; code is left to right through a base rule in `global.css`. Negative letter-spacing breaks Persian letter joins, so tight tracking on text is `ltr:tracking-tight`.
10. **Icons inside a component get `data-icon` and no size class.** `data-icon="inline-start"` or `data-icon="inline-end"`. Pass the component (`icon={CheckIcon}`), not a string.
11. **Feedback uses the installed toast.** `import { toast } from "@/components/ui/toast"`, then `toast.add({ title, type })`. `Toaster` is already mounted in the root layout. Do not add Sonner.
12. **Colors are tokens.** `bg-background`, `text-muted-foreground`, `border-border`. No raw palette classes for UI chrome. `--brand` (`bg-brand`, `text-brand`) is the accent sampled from the avatar; use it for marks, icons, and glows, not for body text. Project logos are image files with their own background, so they read on both themes.
13. **Fonts.** `--font-latin` is Inter, `--font-arabic` is Vazirmatn (Persian and Arabic), and both `font-sans` and `font-heading` use that stack. Persian and Arabic glyphs already resolve. Do not put a second font-family on `<html>`.
14. **Every page renders its own `<main id="main">`.** `SiteLayout` wraps `(home)` routes and the 404 page with the header and the footer. The skip link targets `#main`. Content width is `--fd-layout-width`, so the header and the page line up; use `Container` instead of a new `max-w-*`. The header is glass (`transparentMode: "always"` plus the `#nd-nav` rule in `global.css`), and the first block of a page runs under it with `-mt-14 pt-14` on `bg-wash`, as `Hero` and `PageHeader` do.
15. **Every page has a share image.** A new route passes its card URL as `image` in the last argument of `pageMeta` (`ogImage.page(page, locale)`, `ogImage.post`, `ogImage.tag`), and a new kind of page adds a route under `src/app/[locale]/og` that renders `OgCard` with the `locale`. Do not go back to `next/og`: Satori does not shape Persian. The cards use the light theme. Images cannot read CSS variables, so keep `ogColors` in step with `:root` in `global.css`.
16. **Every page lives in every language.** A page goes under `src/app/[locale]`, calls `setRequestLocale(locale)` in its page and layout, and passes the locale to `pageMeta` with the languages it exists in (`translations`), which writes canonical and `hreflang`. Internal links use `Link` from `@/i18n/navigation` with a path without the language (`/blog/my-post`). Outside components, `localizePath(path, locale)` from `src/i18n/paths.ts` builds the same URL. Do not prefix paths by hand and do not import `next/link` for internal pages.
17. **Every page has a Markdown version.** A new route adds an entry to `markdownPages()` in `src/lib/agents.ts`, adds its path to the `matcher` in `src/proxy.ts`, and uses `pageMeta`, which links the Markdown with `<link rel="alternate" type="text/markdown">`. Structured data for a page goes through a helper in `src/lib/seo.ts` and `JsonLd`.

## Make it yours

| Change                                             | Where                                                             |
| -------------------------------------------------- | ----------------------------------------------------------------- |
| Languages and the default language                 | `src/i18n/locales.ts`, flags in `src/i18n/flags.tsx`              |
| Name, deployed URL, author                         | `src/lib/site.ts` (`site.url` is currently `https://dimah.dev`), `site.copy.<locale>.name` for another script |
| Description, tagline, availability, résumé         | `site.copy.<locale>`                                              |
| GitHub, LinkedIn, X, Telegram, email, website      | `site.profiles`                                                   |
| Main contact button                                | `site.contact.primary`                                            |
| Contact paragraph, headline, intro, About, timeline | `site.copy.<locale>`                                             |
| Skills in the About section                        | `site.skills`                                                     |
| Avatar and app icons                               | `public/avatar.png`, `src/app/icon.png`, `src/app/apple-icon.png` |
| Projects                                           | `content/projects/*.mdx`, fields in `projectSchema`               |
| Project logos                                      | `public/logos/`, referenced by a project's `logo`                 |
| Work history                                       | `content/experience/*.mdx`, fields in `experienceSchema`          |
| Blog posts                                         | `content/blog/*.mdx`. Guest authors in `blogAuthors`              |
| Interface labels                                   | `messages/<locale>.json`                                          |
| Home page sections                                 | `src/components/home`, composed in `src/app/[locale]/(home)/page.tsx` |
| Header and footer links                            | `src/lib/links.ts`, read by `src/lib/layout.shared.tsx`           |
| Accent color                                       | `--brand` in `src/app/global.css`                                 |
| Share image design                                 | `src/lib/og/card.tsx`                                             |

Adding a language is five steps, listed at the top of `src/i18n/locales.ts`; TypeScript reports a missing one. A right-to-left language flips the document, the Fumadocs UI, the labels, and the date format. Keep writing styles with the logical properties above so that flip does not require a CSS pass.

## Check

`pnpm format:check`, `pnpm lint`, `pnpm types:check`, and `pnpm test` pass. A change to a plain helper (paths, URLs, content parsing) comes with a test next to it. UI changes are checked in the running app, including `/`, `/projects`, and `/blog`, and their Persian pages under `/fa`, in light and dark and at phone width. Content changes are also checked in `/llms.txt` and the page's `.md`, and SEO changes in the page's `hreflang` and `/sitemap.xml`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

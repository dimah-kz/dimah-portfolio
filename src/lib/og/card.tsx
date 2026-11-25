import { readFileSync } from "node:fs";
import { extname, join } from "node:path";
import { type Locale, localeConfig } from "@/i18n/locales";
import type { ReactNode } from "react";
import type { Project } from "../projects";
import { site } from "../site";
import { ogFontFamily } from "./render";

/**
 * The site's dark theme in plain colors: images cannot read CSS variables.
 * Keep them close to `src/app/global.css`.
 */
export const ogColors = {
  background: "#0a0a0a",
  foreground: "#fafafa",
  muted: "#a3a3a3",
  subtle: "#737373",
  border: "rgba(255, 255, 255, 0.12)",
  /** A card on the background, like `--card`. */
  surface: "#141414",
  /** `--brand`, the gold of the avatar. */
  brand: "#d6b52d",
  brandGlow: "rgba(214, 181, 45, 0.22)",
  brandRing: "rgba(214, 181, 45, 0.55)",
} as const;

const imageTypes: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

/** A file in `public/` as a data URL. The renderer does not fetch. */
function publicImage(path: string): string {
  const type = imageTypes[extname(path).toLowerCase()] ?? "image/png";
  const data = readFileSync(join(process.cwd(), "public", path));
  return `data:${type};base64,${data.toString("base64")}`;
}

const avatarSrc = publicImage(site.author.avatar);

const host = new URL(site.url).host;

/** A short heading is set large; a longer one smaller, so three lines hold it. */
function titleSize(title: string, narrow: boolean) {
  if (title.length <= 18) return narrow ? 96 : 112;
  if (title.length <= 36) return narrow ? 68 : 84;
  return narrow ? 58 : 68;
}

/**
 * `dimah-starter` stays on one line: a word with a hyphen is set `nowrap`.
 * (The font subsets have no non-breaking hyphen glyph.)
 */
function keepHyphens(text: string): ReactNode {
  return text.split(/(\s+)/).map((part, index) =>
    /\p{L}-\p{L}/u.test(part) ? (
      <span key={index} style={{ whiteSpace: "nowrap" }}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

type OgCardProps = {
  /** The language of the card: its direction and text. */
  locale: Locale;
  /** Section label after the name, like `Blog` or `Projects`. */
  eyebrow?: string;
  title: string;
  /** The end of the title, set in the brand color, as in the home hero. */
  titleAccent?: string;
  description?: string;
  /** Short facts on the bottom row: a date, a reading time, a count. */
  meta?: string[];
  /** A drawing on the end side. Without it, the text spans the card. */
  art?: ReactNode;
};

/**
 * The 1200×630 share card: the site's gold wash, the avatar and the section on
 * top, a large title, the facts and the domain at the bottom, and a tile with
 * the avatar or a project logo on the end side.
 * It lays out in the language's direction, so a Persian card reads right to left with
 * the art on the left. Title and description stop with an ellipsis.
 */
export function OgCard({
  locale,
  eyebrow,
  title,
  titleAccent,
  description,
  meta = [],
  art,
}: OgCardProps) {
  const { dir } = localeConfig[locale];
  const fullTitle = titleAccent ? `${title} ${titleAccent}` : title;

  return (
    <div
      dir={dir}
      lang={locale}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        width: "100%",
        height: "100%",
        padding: "64px 80px",
        fontFamily: ogFontFamily,
        color: ogColors.foreground,
        backgroundColor: ogColors.background,
        // The site's wash: a soft light of the brand color from the top.
        backgroundImage: `radial-gradient(60% 100% at 50% 0%, ${ogColors.brandGlow}, transparent)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Takumi renders <img>, not next/image. */}
        <img
          src={avatarSrc}
          width={52}
          height={52}
          alt=""
          style={{ borderRadius: 999, border: `2px solid ${ogColors.border}` }}
        />
        <span
          style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.01em" }}
        >
          {site.name}
        </span>
        {eyebrow ? (
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{ width: 36, height: 2, backgroundColor: ogColors.brand }}
            />
            <span
              style={{ fontSize: 28, fontWeight: 500, color: ogColors.brand }}
            >
              {keepHyphens(eyebrow)}
            </span>
          </div>
        ) : null}
      </div>

      {/* Text, then the art on the end side. A row follows `dir`, so a Persian
          card puts the art on the left. The art box has no height, so its
          rings overflow the row without moving the text. */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 40,
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            flex: 1,
            minWidth: 0,
            maxWidth: art ? 660 : 1040,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: titleSize(fullTitle, Boolean(art)),
              fontWeight: 650,
              lineHeight: 1.08,
              letterSpacing: dir === "ltr" ? "-0.035em" : 0,
            }}
          >
            <div
              style={{ textWrap: "balance", lineClamp: titleAccent ? 2 : 3 }}
            >
              {keepHyphens(title)}
            </div>
            {/* Its own line, as in the hero: an inline span breaks under a
              line clamp when the card is right to left. */}
            {titleAccent ? (
              <div style={{ color: ogColors.brand, lineClamp: 1 }}>
                {keepHyphens(titleAccent)}
              </div>
            ) : null}
          </div>
          {description ? (
            <div
              style={{
                fontSize: art ? 30 : 32,
                lineHeight: 1.4,
                color: ogColors.muted,
                textWrap: "pretty",
                lineClamp: 2,
              }}
            >
              {keepHyphens(description)}
            </div>
          ) : null}
        </div>
        {art ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 340,
              height: 0,
              flexShrink: 0,
            }}
          >
            {art}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          gap: 24,
          fontSize: 26,
          color: ogColors.subtle,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {meta.map((item, index) => (
            <div
              key={item}
              style={{ display: "flex", alignItems: "center", gap: 16 }}
            >
              {index > 0 ? (
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    backgroundColor: ogColors.subtle,
                  }}
                />
              ) : null}
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              backgroundColor: ogColors.brand,
            }}
          />
          <span dir="ltr" style={{ color: ogColors.muted }}>
            {host}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * A raised square, like a shadcn `Card`: a hairline border, a faint gold light
 * from the top, and whatever the card is about in the middle.
 */
function Tile({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 300,
        height: 300,
        borderRadius: 56,
        border: `2px solid ${ogColors.border}`,
        backgroundColor: ogColors.surface,
        backgroundImage: `radial-gradient(80% 60% at 50% 0%, ${ogColors.brandGlow}, transparent)`,
        boxShadow: "0 40px 80px rgba(0, 0, 0, 0.55)",
      }}
    >
      {children}
    </div>
  );
}

/** The avatar on a tile, for the home and blog cards. */
export function OgAvatarArt() {
  return (
    <Tile>
      {/* eslint-disable-next-line @next/next/no-img-element -- Takumi renders <img>, not next/image. */}
      <img
        src={avatarSrc}
        width={168}
        height={168}
        alt=""
        style={{ borderRadius: 999, border: `3px solid ${ogColors.brandRing}` }}
      />
    </Tile>
  );
}

function ProjectTile({ project, size }: { project: Project; size: number }) {
  if (project.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- Takumi renders <img>, not next/image.
      <img src={publicImage(project.logo)} width={size} height={size} alt="" />
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: size * 0.22,
        border: `2px solid ${ogColors.border}`,
        backgroundColor: "#171717",
        fontSize: size * 0.45,
        fontWeight: 600,
        color: ogColors.muted,
      }}
    >
      {project.name.slice(0, 1).toUpperCase()}
    </div>
  );
}

/** One project's logo on a tile, for its blog tag and the posts about it. */
export function OgProjectArt({ project }: { project: Project }) {
  return (
    <Tile>
      <ProjectTile project={project} size={150} />
    </Tile>
  );
}

/** Up to four project logos on a tile, for `/projects`. */
export function OgProjectsArt({ projects }: { projects: Project[] }) {
  return (
    <Tile>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 24,
          width: 224,
        }}
      >
        {projects.slice(0, 4).map((project) => (
          <ProjectTile key={project.slug} project={project} size={100} />
        ))}
      </div>
    </Tile>
  );
}

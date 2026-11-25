import { readFileSync } from "node:fs";
import { extname, join } from "node:path";
import { type Locale, localeConfig } from "@/i18n/locales";
import type { CSSProperties, ReactNode } from "react";
import type { Project } from "../projects";
import { site } from "../site";
import { ogFontFamily, ogSize } from "./render";

/**
 * The site's light theme in plain colors: images cannot read CSS variables.
 * Keep them close to `:root` in `src/app/global.css`.
 */
export const ogColors = {
  background: "#ffffff",
  /** A quiet tile, like `--muted`. */
  surface: "#f5f5f5",
  foreground: "#0a0a0a",
  /** `--muted-foreground`. */
  muted: "#737373",
  subtle: "#a3a3a3",
  /** `--border`. */
  border: "#e5e5e5",
  /** The guide lines, a step lighter than `--border`. */
  guide: "#ededed",
  /** `--brand`, the gold of the avatar. */
  brand: "#c09f00",
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

/** How far the guide lines sit from the edges. */
const inset = 48;
/** The width of the box that holds the art, on the end side. */
const artWidth = 300;

/** A short heading is set large; a longer one smaller, so three lines hold it. */
function titleSize(title: string, narrow: boolean) {
  if (title.length <= 18) return narrow ? 84 : 100;
  if (title.length <= 36) return narrow ? 56 : 72;
  return narrow ? 48 : 60;
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

function Dot({ size, color }: { size: number; color: string }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        backgroundColor: color,
        flexShrink: 0,
      }}
    />
  );
}

/**
 * Hairlines that run edge to edge at the inset, and a small cross where they
 * meet at each corner. Absolute, so they draw under the content without
 * moving it.
 */
function guides(): ReactNode[] {
  const { width, height } = ogSize;
  const line = (key: string, style: CSSProperties) => (
    <div
      key={key}
      style={{
        position: "absolute",
        backgroundColor: ogColors.guide,
        ...style,
      }}
    />
  );
  const arm = 10;
  const stroke = 1.5;
  const cross = (key: string, x: number, y: number) => [
    <div
      key={`${key}-h`}
      style={{
        position: "absolute",
        left: x - arm,
        top: y - stroke / 2,
        width: arm * 2,
        height: stroke,
        backgroundColor: ogColors.subtle,
      }}
    />,
    <div
      key={`${key}-v`}
      style={{
        position: "absolute",
        left: x - stroke / 2,
        top: y - arm,
        width: stroke,
        height: arm * 2,
        backgroundColor: ogColors.subtle,
      }}
    />,
  ];
  const near = inset + 0.5;
  const farX = width - inset - 0.5;
  const farY = height - inset - 0.5;

  return [
    line("top", { left: 0, top: inset, width, height: 1 }),
    line("bottom", { left: 0, top: height - inset - 1, width, height: 1 }),
    line("left", { left: inset, top: 0, width: 1, height }),
    line("right", { left: width - inset - 1, top: 0, width: 1, height }),
    ...cross("tl", near, near),
    ...cross("tr", farX, near),
    ...cross("bl", near, farY),
    ...cross("br", farX, farY),
  ];
}

type OgCardProps = {
  /** The language of the card: its direction and text. */
  locale: Locale;
  /** Section label after the name, like `Blog` or `Projects`. */
  eyebrow?: string;
  title: string;
  /** The end of the title, on its own line in a softer color, as in the hero. */
  titleAccent?: string;
  description?: string;
  /** Short facts on the bottom row: a date, a reading time, a count. */
  meta?: string[];
  /** A drawing on the end side. Without it, the text spans the card. */
  art?: ReactNode;
};

/**
 * The 1200×630 share card, in the light theme: one flat white surface with
 * hairline guides near the edges and a cross at each corner. The name and the
 * section on top with the domain at the end of that row, a large title, the
 * facts at the bottom, and the avatar or a project logo on the end side. It
 * lays out in the language's direction, so a Persian card reads right to left
 * with the art and the domain on the left. Title and description stop with an
 * ellipsis.
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
  const ltr = dir === "ltr";
  // The accent has a line of its own, so the longer of the two sets the size.
  const sizedBy =
    titleAccent && titleAccent.length > title.length ? titleAccent : title;

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
        padding: `${inset + 36}px ${inset + 52}px`,
        fontFamily: ogFontFamily,
        color: ogColors.foreground,
        backgroundColor: ogColors.background,
      }}
    >
      {guides()}

      {/* The name and the section, then the domain at the end of the row. */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
          }}
        >
          <Dot size={12} color={ogColors.brand} />
          <span
            style={{
              fontWeight: 650,
              letterSpacing: ltr ? "-0.02em" : 0,
            }}
          >
            {site.name}
          </span>
          {eyebrow ? (
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ color: ogColors.border, fontWeight: 300 }}>/</span>
              <span style={{ color: ogColors.muted, fontWeight: 500 }}>
                {keepHyphens(eyebrow)}
              </span>
            </div>
          ) : null}
        </div>
        <span dir="ltr" style={{ fontSize: 24, color: ogColors.subtle }}>
          {host}
        </span>
      </div>

      {/* Text, then the art on the end side. A row follows `dir`. */}
      <div style={{ display: "flex", alignItems: "center", gap: 52 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            flex: 1,
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: titleSize(sizedBy, Boolean(art)),
              fontWeight: 650,
              lineHeight: ltr ? 1.06 : 1.3,
              letterSpacing: ltr ? "-0.04em" : 0,
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
              <div style={{ color: ogColors.subtle, lineClamp: 1 }}>
                {keepHyphens(titleAccent)}
              </div>
            ) : null}
          </div>
          {description ? (
            <div
              style={{
                fontSize: art ? 26 : 30,
                lineHeight: 1.45,
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
              width: artWidth,
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
          gap: 14,
          minHeight: 30,
          fontSize: 24,
          color: ogColors.muted,
        }}
      >
        {meta.map((item, index) => (
          <div
            key={item}
            style={{ display: "flex", alignItems: "center", gap: 14 }}
          >
            {/* A hairline, not a dot: a dot reads as a Persian zero. */}
            {index > 0 ? (
              <div
                style={{
                  width: 1.5,
                  height: 22,
                  backgroundColor: ogColors.border,
                }}
              />
            ) : null}
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const lift = "0 28px 56px -24px rgba(0, 0, 0, 0.35)";

/** The avatar in a hairline ring, for the home and blog cards. */
export function OgAvatarArt() {
  return (
    <div
      style={{
        display: "flex",
        padding: 12,
        borderRadius: 999,
        border: `1.5px solid ${ogColors.border}`,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- Takumi renders <img>, not next/image. */}
      <img
        src={avatarSrc}
        width={232}
        height={232}
        alt=""
        style={{ borderRadius: 999, boxShadow: lift }}
      />
    </div>
  );
}

function ProjectTile({ project, size }: { project: Project; size: number }) {
  if (project.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- Takumi renders <img>, not next/image.
      <img
        src={publicImage(project.logo)}
        width={size}
        height={size}
        alt=""
        style={{ borderRadius: size * 0.22, boxShadow: lift }}
      />
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
        border: `1.5px solid ${ogColors.border}`,
        backgroundColor: ogColors.surface,
        fontSize: size * 0.45,
        fontWeight: 600,
        color: ogColors.muted,
      }}
    >
      {project.name.slice(0, 1).toUpperCase()}
    </div>
  );
}

/** One project's logo, for its blog tag and the posts about it. */
export function OgProjectArt({ project }: { project: Project }) {
  return <ProjectTile project={project} size={208} />;
}

/** Up to four project logos in a square, for `/projects`. */
export function OgProjectsArt({ projects }: { projects: Project[] }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 24,
        width: 264,
      }}
    >
      {projects.slice(0, 4).map((project) => (
        <ProjectTile key={project.slug} project={project} size={120} />
      ))}
    </div>
  );
}

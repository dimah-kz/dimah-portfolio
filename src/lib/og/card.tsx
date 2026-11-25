import { isMarkId, ProjectMark } from "@/components/brand";
import { readFileSync } from "node:fs";
import { join } from "node:path";
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
  grid: "rgba(255, 255, 255, 0.07)",
  /** `--brand`, the gold of the avatar. */
  brand: "#d6b52d",
  brandGlow: "rgba(214, 181, 45, 0.22)",
  brandRing: "rgba(214, 181, 45, 0.55)",
} as const;

const avatarSrc = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public", site.author.avatarUrl),
).toString("base64")}`;

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
  /** Section label after the name, like `Blog` or `Docs`. */
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
 * The 1200×630 share card: the hero's grid and gold glow, the avatar and the
 * section on top, a large title, and the facts and the domain at the bottom.
 * It lays out in `site.direction`, so a Persian card reads right to left with
 * the art on the left. Title and description stop with an ellipsis.
 */
export function OgCard({
  eyebrow,
  title,
  titleAccent,
  description,
  meta = [],
  art,
}: OgCardProps) {
  const fullTitle = titleAccent ? `${title} ${titleAccent}` : title;

  return (
    <div
      dir={site.direction}
      lang={site.locale}
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
        // Gold glow from the top, the grid fading out below it, as in the hero.
        backgroundImage: [
          `radial-gradient(ellipse 60% 55% at 50% 0%, ${ogColors.brandGlow}, transparent 100%)`,
          `radial-gradient(ellipse 80% 75% at 50% 0%, transparent 0%, ${ogColors.background} 100%)`,
          `linear-gradient(to right, ${ogColors.grid} 1px, transparent 1px)`,
          `linear-gradient(to bottom, ${ogColors.grid} 1px, transparent 1px)`,
        ].join(", "),
        backgroundSize: "100% 100%, 100% 100%, 64px 64px, 64px 64px",
        backgroundPosition: "0 0, 0 0, center 0, center 0",
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
        <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.01em" }}>
          {site.name}
        </span>
        {eyebrow ? (
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 36, height: 2, backgroundColor: ogColors.brand }} />
            <span style={{ fontSize: 28, fontWeight: 500, color: ogColors.brand }}>
              {keepHyphens(eyebrow)}
            </span>
          </div>
        ) : null}
      </div>

      {/* Text, then the art on the end side. A row follows `dir`, so a Persian
          card puts the art on the left. The art box has no height, so its
          rings overflow the row without moving the text. */}
      <div style={{ display: "flex", alignItems: "center", gap: 40, width: "100%" }}>
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
            letterSpacing: site.direction === "ltr" ? "-0.035em" : 0,
          }}
        >
          <div style={{ textWrap: "balance", lineClamp: titleAccent ? 2 : 3 }}>
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
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 16 }}>
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
            style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: ogColors.brand }}
          />
          <span dir="ltr" style={{ color: ogColors.muted }}>
            {host}
          </span>
        </div>
      </div>
    </div>
  );
}

/** Concentric rings, every other one dashed, fading outward. As in the hero. */
function Rings({ size }: { size: number }) {
  const radii = [0.24, 0.33, 0.42, 0.5];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      {radii.map((radius, index) => (
        <circle
          key={radius}
          cx={size / 2}
          cy={size / 2}
          r={size * radius - 1}
          fill="none"
          stroke={ogColors.brand}
          strokeOpacity={0.5 - index * 0.11}
          strokeWidth={1.5}
          strokeDasharray={index % 2 === 1 ? "4 8" : undefined}
        />
      ))}
    </svg>
  );
}

/** Something centered in rings, over a soft gold halo. */
function Halo({ size = 380, children }: { size?: number; children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: 999,
        backgroundImage: `radial-gradient(circle closest-side, ${ogColors.brandGlow}, transparent 70%)`,
      }}
    >
      <Rings size={size} />
      {children}
    </div>
  );
}

/** The avatar in its rings, for the home card. */
export function OgAvatarArt() {
  return (
    <Halo>
      {/* eslint-disable-next-line @next/next/no-img-element -- Takumi renders <img>, not next/image. */}
      <img
        src={avatarSrc}
        width={150}
        height={150}
        alt=""
        style={{ borderRadius: 999, border: `3px solid ${ogColors.brandRing}` }}
      />
    </Halo>
  );
}

function ProjectTile({ project, size }: { project: Project; size: number }) {
  if (isMarkId(project.mark)) {
    return <ProjectMark id={project.mark} size={size} color={ogColors.foreground} />;
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

/** One project's logo in rings, for its docs and its blog tag. */
export function OgProjectArt({ project }: { project: Project }) {
  return (
    <Halo>
      <ProjectTile project={project} size={132} />
    </Halo>
  );
}

/** Up to four project logos in a grid, for `/projects`. */
export function OgProjectsArt({ projects }: { projects: Project[] }) {
  return (
    <Halo size={400}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 20,
          width: 220,
        }}
      >
        {projects.slice(0, 4).map((project) => (
          <ProjectTile key={project.slug} project={project} size={100} />
        ))}
      </div>
    </Halo>
  );
}

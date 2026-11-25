import { cn } from "cn";
import type { ReactNode } from "react";

type MarkProps = {
  className?: string;
  /** Width and height in pixels, for images rendered outside CSS (Open Graph). */
  size?: number;
  /** `currentColor` for the mark, for images rendered outside CSS. */
  color?: string;
};

/** Dimah monogram from dimah-starter (`brand-mark.tsx` / `app/icon.svg`). */
const dimahMarkPath =
  "M12.6 1.15H15.15V12.15C15.15 15.43 12.88 18.26 9.68 18.98C6.48 19.7 3.22 18.1 1.82 15.14C0.42 12.17 1.27 8.64 3.85 6.63C6.44 4.61 10.07 4.66 12.6 6.75ZM12.6 12.15C12.6 14.61 10.61 16.6 8.15 16.6C5.69 16.6 3.7 14.61 3.7 12.15C3.7 9.69 5.69 7.7 8.15 7.7C10.61 7.7 12.6 9.69 12.6 12.15Z";

function Mark({
  className,
  size,
  color,
  viewBox,
  children,
}: MarkProps & { viewBox: string; children: ReactNode }) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      color={color}
    >
      {children}
    </svg>
  );
}

/** Square tile. A hairline in `currentColor` keeps the black tiles visible on a dark page. */
function Tile({ children }: { children: ReactNode }) {
  return (
    <>
      <rect
        x="0.75"
        y="0.75"
        width="30.5"
        height="30.5"
        rx="7"
        fill="#0a0a0a"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="1.5"
      />
      {children}
    </>
  );
}

function StarterMark(props: MarkProps) {
  return (
    <Mark viewBox="0 0 32 32" {...props}>
      <g transform="translate(6.77 3.64) scale(1.186)" fill="currentColor">
        <path fillRule="evenodd" d={dimahMarkPath} />
      </g>
    </Mark>
  );
}

/** Cloud-upload tile from dimah-s3 `apps/docs/src/app/icon.svg`. */
function S3Mark(props: MarkProps) {
  return (
    <Mark viewBox="0 0 32 32" {...props}>
      <Tile>
        <g
          transform="translate(4 4)"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 13v8" />
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
          <path d="m8 17 4-4 4 4" />
        </g>
      </Tile>
    </Mark>
  );
}

/** App icon from dimah-form `apps/docs/src/app/icon.svg`. */
function FormMark(props: MarkProps) {
  return (
    <Mark viewBox="0 0 32 32" {...props}>
      <Tile>
        <g transform="translate(16 16) scale(0.78) translate(-16 -16)">
          <path
            fill="#fafaf9"
            fillRule="evenodd"
            d="M6 4h14c5.523 0 10 4.477 10 10v4c0 5.523-4.477 10-10 10H6A4 4 0 0 1 2 24V8a4 4 0 0 1 4-4zm10.5 8h5a2.5 2.5 0 0 1 2.5 2.5v3a2.5 2.5 0 0 1-2.5 2.5h-5a2.5 2.5 0 0 1-2.5-2.5v-3a2.5 2.5 0 0 1 2.5-2.5z"
          />
        </g>
      </Tile>
    </Mark>
  );
}

/** Square mark from dimah-survey `public/brand/dimah-survey-icon.svg`. */
function SurveyMark(props: MarkProps) {
  return (
    <Mark viewBox="0 0 512 512" {...props}>
      <rect width="512" height="512" rx="128" fill="#009693" />
      <g
        transform="translate(97.5 97.5) scale(19.8125) translate(1.125 0)"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3.25h4.2a3.55 3.55 0 1 1 0 7.1H3v-7.1Z" />
        <path d="M3 12.75h5.8" />
      </g>
    </Mark>
  );
}

function StarterGlyph(props: MarkProps) {
  return (
    <Mark viewBox="0 0 16.3 20.3" {...props}>
      <path fill="currentColor" fillRule="evenodd" d={dimahMarkPath} />
    </Mark>
  );
}

/** Same cloud as the dimah-s3 docs nav, without the favicon tile. */
function S3Glyph(props: MarkProps) {
  return (
    <Mark viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 13v8" />
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <path d="m8 17 4-4 4 4" />
      </g>
    </Mark>
  );
}

/** Mark from dimah-form `public/logo.svg`, in the current text color. */
function FormGlyph(props: MarkProps) {
  return (
    <Mark viewBox="0 0 32 32" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M6 4h14c5.523 0 10 4.477 10 10v4c0 5.523-4.477 10-10 10H6A4 4 0 0 1 2 24V8a4 4 0 0 1 4-4zm10.5 8h5a2.5 2.5 0 0 1 2.5 2.5v3a2.5 2.5 0 0 1-2.5 2.5h-5a2.5 2.5 0 0 1-2.5-2.5v-3a2.5 2.5 0 0 1 2.5-2.5z"
      />
    </Mark>
  );
}

/** Survey symbol from `brand-mark.tsx`, without the teal tile. */
function SurveyGlyph(props: MarkProps) {
  return (
    <Mark viewBox="-1.125 0 16 16" {...props}>
      <path
        d="M3 3.25h4.2a3.55 3.55 0 1 1 0 7.1H3v-7.1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 12.75h5.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Mark>
  );
}

const tiles = {
  starter: StarterMark,
  s3: S3Mark,
  form: FormMark,
  survey: SurveyMark,
} as const;

const glyphs = {
  starter: StarterGlyph,
  s3: S3Glyph,
  form: FormGlyph,
  survey: SurveyGlyph,
} as const;

/** Logo keys. A project's `mark` in `content/projects` and a docs folder's `icon` use these. */
export type MarkId = keyof typeof tiles;

export function isMarkId(value: string | undefined): value is MarkId {
  return value !== undefined && Object.hasOwn(tiles, value);
}

/**
 * Product logo.
 * `tile` is the app icon. `glyph` fills a small icon slot, such as a docs card.
 */
export function ProjectMark({
  id,
  variant = "tile",
  ...props
}: MarkProps & { id: MarkId; variant?: "glyph" | "tile" }) {
  const MarkIcon = variant === "glyph" ? glyphs[id] : tiles[id];
  return <MarkIcon {...props} />;
}

/**
 * Fixed slot for headings and cards. A project without a known `mark`
 * gets its first letter on a muted tile.
 */
export function ProjectLogo({
  mark,
  name,
  className,
}: MarkProps & { mark?: string; name: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center",
        className,
      )}
    >
      {isMarkId(mark) ? (
        <ProjectMark id={mark} className="size-full" />
      ) : (
        <span
          aria-hidden="true"
          className="flex size-full items-center justify-center rounded-[22%] border bg-muted font-heading text-[0.6em] font-semibold text-muted-foreground uppercase"
        >
          {name.slice(0, 1)}
        </span>
      )}
    </span>
  );
}

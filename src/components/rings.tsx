import { cn } from "cn";

/** Ring radii in the 1000-unit square. Every other ring is dashed, like a compass. */
const rings = [
  { r: 110, opacity: 0.45 },
  { r: 170, opacity: 0.35, dashed: true },
  { r: 240, opacity: 0.28 },
  { r: 320, opacity: 0.2, dashed: true },
  { r: 410, opacity: 0.14 },
  { r: 495, opacity: 0.08, dashed: true },
];

const fade = "radial-gradient(circle closest-side, black 25%, transparent 100%)";

/**
 * Concentric rings over a soft brand halo, fading out before the edges. The
 * Open Graph cards draw the same shape. Give it a size with `className`; it
 * centers itself on its positioned parent in either direction.
 */
export function Rings({
  className,
  pulse = false,
}: {
  className?: string;
  /** One ring keeps growing outward, slowly. Reduced motion drops it. */
  pulse?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        // Centered with `left` and a translate: symmetric, so it holds in RTL too.
        "pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-1/2",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_closest-side,color-mix(in_oklch,var(--brand)_22%,transparent),color-mix(in_oklch,var(--brand)_6%,transparent)_40%,transparent_72%)]" />
      <svg
        viewBox="0 0 1000 1000"
        fill="none"
        className="absolute inset-0 size-full text-brand"
        style={{ maskImage: fade, WebkitMaskImage: fade }}
      >
        {rings.map((ring) => (
          <circle
            key={ring.r}
            cx="500"
            cy="500"
            r={ring.r}
            stroke="currentColor"
            strokeOpacity={ring.opacity}
            strokeDasharray={ring.dashed ? "3 7" : undefined}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      {pulse ? (
        <span className="absolute top-1/2 left-1/2 size-[22%] -translate-1/2 animate-ping rounded-full border border-brand/40 [animation-duration:4s] motion-reduce:hidden" />
      ) : null}
    </div>
  );
}

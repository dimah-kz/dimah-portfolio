import { Rings } from "@/components/rings";
import { cn } from "cn";
import type { ReactNode } from "react";

/**
 * A generated card cover: the hairline grid, a brand halo with rings, and
 * whatever it is about (logos, an avatar) in the middle. The share cards draw
 * the same picture, so a card and its link preview match.
 */
export function Cover({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative isolate flex items-center justify-center overflow-hidden bg-muted/40",
        className,
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-grid [--grid-origin:50%]" />
      <Rings className="size-[30rem] transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none" />
      {children}
    </div>
  );
}

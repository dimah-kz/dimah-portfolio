import { MagicCard } from "@/components/ui/magic-card";
import { cn } from "cn";
import type { ReactNode } from "react";

/**
 * Magic UI's `MagicCard` in the brand colors: the border lights up gold under
 * the pointer. Wrap a shadcn `Card` in it; the card keeps its own surface.
 */
export function SpotlightCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <MagicCard
      className={cn("h-full rounded-lg [&>div:last-child]:h-full", className)}
      gradientSize={260}
      gradientFrom="var(--brand)"
      gradientTo="color-mix(in oklch, var(--brand) 35%, transparent)"
      gradientColor="color-mix(in oklch, var(--brand) 10%, transparent)"
    >
      {children}
    </MagicCard>
  );
}

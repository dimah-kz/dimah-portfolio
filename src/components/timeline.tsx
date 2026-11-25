import type { Milestone } from "@/lib/site-config";
import { cn } from "cn";

/**
 * Milestones on a vertical line, oldest first. The last one, where things
 * stand now, gets the brand mark. Logical properties only, so the line moves
 * to the right in a right-to-left language.
 */
export function Timeline({ items }: { items: Milestone[] }) {
  if (items.length === 0) return null;

  return (
    <ol className="flex flex-col">
      {items.map((item, index) => {
        const last = index === items.length - 1;

        return (
          <li
            key={item.title}
            className="relative flex flex-col gap-1 ps-7 pb-8 last:pb-0"
          >
            {last ? null : (
              <span
                aria-hidden="true"
                className="absolute start-[4.5px] top-[0.4rem] -bottom-[0.4rem] w-px bg-border"
              />
            )}
            <span
              aria-hidden="true"
              className={cn(
                "absolute start-0 top-[0.4rem] size-2.5 rounded-full ring-4 ring-background",
                last ? "bg-brand" : "bg-muted-foreground/40",
              )}
            />
            {item.period ? (
              <p className="text-xs leading-5 text-muted-foreground tabular-nums">
                {item.period}
              </p>
            ) : null}
            <h3 className="text-[0.9375rem] font-medium">{item.title}</h3>
            {item.description ? (
              <p className="text-sm/relaxed text-pretty text-muted-foreground">
                {item.description}
              </p>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

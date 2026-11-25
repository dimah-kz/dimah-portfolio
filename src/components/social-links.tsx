import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type IconLink, isExternal, profiles } from "@/lib/links";
import { cn } from "cn";

/** Icon buttons with a tooltip on each. Every profile by default. */
export function SocialLinks({
  links = profiles,
  className,
}: {
  links?: IconLink[];
  className?: string;
}) {
  if (links.length === 0) return null;

  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {links.map(({ label, href, icon: Icon }) => (
        <li key={href}>
          <Tooltip>
            <TooltipTrigger
              render={
                <a
                  href={href}
                  aria-label={label}
                  {...(isExternal(href)
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className={buttonVariants({
                    variant: "ghost",
                    size: "icon-lg",
                  })}
                />
              }
            >
              <Icon />
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
}

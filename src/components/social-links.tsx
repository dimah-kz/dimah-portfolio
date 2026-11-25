import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type SocialLink, socialLinks } from "@/lib/links";
import { cn } from "cn";

/** Icon buttons for `socialLinks`, with a tooltip on each. */
export function SocialLinks({
  links = socialLinks,
  className,
}: {
  links?: SocialLink[];
  className?: string;
}) {
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
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className={buttonVariants({ variant: "ghost", size: "icon-lg" })}
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

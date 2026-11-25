import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  type IconLink,
  isExternal,
  type Profile,
  profiles as allProfiles,
} from "@/lib/links";
import { cn } from "cn";
import { useTranslations } from "next-intl";

/**
 * Icon buttons with a tooltip on each: `profiles` (every profile by default),
 * then any `extra` links, such as the feed.
 */
export function SocialLinks({
  profiles = allProfiles,
  extra = [],
  className,
}: {
  profiles?: Profile[];
  extra?: IconLink[];
  className?: string;
}) {
  const t = useTranslations("profiles");
  const links: IconLink[] = [
    ...profiles.map(({ id, href, icon }) => ({ label: t(id), href, icon })),
    ...extra,
  ];
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

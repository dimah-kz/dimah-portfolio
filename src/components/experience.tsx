import { InlineText } from "@/components/inline-text";
import { ProjectLogo } from "@/components/project-logo";
import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import type { Role } from "@/lib/experience";
import { useFormatter, useTranslations } from "next-intl";

function RoleDates({ role }: { role: Role }) {
  const t = useTranslations("experience");
  const format = useFormatter();

  return (
    <span className="text-sm text-muted-foreground tabular-nums">
      <time dateTime={role.start.toISOString().slice(0, 7)}>
        {format.dateTime(role.start, "month")}
      </time>
      {" – "}
      {role.end ? (
        <time dateTime={role.end.toISOString().slice(0, 7)}>
          {format.dateTime(role.end, "month")}
        </time>
      ) : (
        t("present")
      )}
    </span>
  );
}

/**
 * Roles from `content/experience`: the logo, the role and the company on one
 * line, the dates, then the summary and the stack. On a phone the dates move
 * above the role.
 */
export function ExperienceList({ roles }: { roles: Role[] }) {
  const t = useTranslations("project");

  return (
    <ul className="flex flex-col gap-3">
      {roles.map((role) => (
        <li key={role.slug}>
          <Item variant="outline" className="px-4 py-3.5">
            {role.logo ? (
              <ItemMedia>
                <ProjectLogo
                  project={{ name: role.company, logo: role.logo }}
                  className="size-8"
                />
              </ItemMedia>
            ) : null}
            <ItemContent>
              <ItemTitle className="flex-wrap gap-x-1.5 gap-y-0.5 text-[0.9375rem]">
                <span>{role.role}</span>
                <span aria-hidden="true" className="text-muted-foreground">
                  ·
                </span>
                {role.url ? (
                  <a
                    href={role.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {role.company}
                  </a>
                ) : (
                  <span className="text-muted-foreground">{role.company}</span>
                )}
              </ItemTitle>
              {role.location ? (
                <ItemDescription className="text-sm">
                  {role.location}
                </ItemDescription>
              ) : null}
            </ItemContent>
            <ItemActions className="order-first basis-full sm:order-none sm:basis-auto">
              <RoleDates role={role} />
            </ItemActions>
            {role.summary ? (
              <p className="basis-full text-sm/relaxed text-pretty text-muted-foreground">
                <InlineText text={role.summary} />
              </p>
            ) : null}
            {role.stack.length > 0 ? (
              <ItemFooter>
                <ul className="flex flex-wrap gap-1.5" aria-label={t("stack")}>
                  {role.stack.map((item) => (
                    <li key={item}>
                      <Badge variant="secondary" className="font-normal">
                        {item}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </ItemFooter>
            ) : null}
          </Item>
        </li>
      ))}
    </ul>
  );
}

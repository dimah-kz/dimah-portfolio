import { GitHubIcon } from "@/components/icons";
import { ProjectLogo } from "@/components/project-logo";
import { SpotlightCard } from "@/components/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/lib/projects";
import { cn } from "cn";
import { ArrowUpRightIcon, CheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

function ExternalLink({
  href,
  label,
  variant = "ghost",
  children,
}: {
  href: string;
  label: string;
  variant?: "ghost" | "outline";
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={cn(buttonVariants({ variant }), "h-8 px-2.5 text-xs")}
    >
      {children}
    </a>
  );
}

function ProjectStatus({ project }: { project: Project }) {
  const t = useTranslations("project.status");
  if (!project.status) return null;
  return (
    <Badge variant="outline" className="font-normal">
      {t(project.status)}
    </Badge>
  );
}

/**
 * A project: its logo, name, description, stack, and links. A featured
 * project (the main one) is larger and always lists its highlights, in two
 * columns; `detailed` lists them on the others, for `/projects`.
 */
export function ProjectCard({
  project,
  detailed = false,
}: {
  project: Project;
  detailed?: boolean;
}) {
  const t = useTranslations("project");
  const { featured } = project;
  const { live, repository } = project.links;
  const highlights = detailed || featured ? project.highlights : [];

  return (
    <SpotlightCard>
      <Card className="h-full gap-5">
        <CardHeader className="gap-3">
          <div className="flex items-center gap-3">
            <ProjectLogo
              project={project}
              className={featured ? "size-11" : "size-9"}
            />
            <div className="flex min-w-0 flex-col gap-0.5">
              <CardTitle
                className={cn(
                  "flex flex-wrap items-center gap-2 font-semibold",
                  featured ? "text-base" : "text-[0.9375rem]",
                )}
              >
                {project.name}
                <ProjectStatus project={project} />
              </CardTitle>
              {featured ? (
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-brand"
                  />
                  {t("featured")}
                </span>
              ) : null}
            </div>
          </div>
          <CardDescription
            className={cn(
              "text-pretty",
              featured ? "text-[0.9375rem]/relaxed" : "text-sm/relaxed",
            )}
          >
            {project.description}
          </CardDescription>
        </CardHeader>

        {highlights.length > 0 ? (
          <CardContent>
            <ul
              className={cn(
                "grid gap-2 text-sm",
                featured && "sm:grid-cols-2 sm:gap-x-6",
              )}
            >
              {highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2.5">
                  <CheckIcon
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-brand"
                  />
                  <span className="text-pretty">{highlight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        ) : null}

        {project.stack.length > 0 ? (
          <CardContent>
            <ul className="flex flex-wrap gap-1.5" aria-label={t("stack")}>
              {project.stack.map((item) => (
                <li key={item}>
                  <Badge variant="secondary" className="font-normal">
                    {item}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        ) : null}

        {live || repository ? (
          <CardFooter className="mt-auto flex-wrap gap-1.5 border-t">
            {live ? (
              <ExternalLink
                href={live}
                label={t("liveFor", { name: project.name })}
                variant="outline"
              >
                {t("live")}
                <ArrowUpRightIcon data-icon="inline-end" />
              </ExternalLink>
            ) : null}
            {repository ? (
              <ExternalLink
                href={repository}
                label={t("sourceFor", { name: project.name })}
              >
                <GitHubIcon data-icon="inline-start" />
                {t("source")}
              </ExternalLink>
            ) : null}
          </CardFooter>
        ) : null}
      </Card>
    </SpotlightCard>
  );
}

/** Projects as cards, two to a row from small screens up. A featured one takes the whole row. */
export function ProjectGrid({
  projects,
  detailed = false,
}: {
  projects: Project[];
  detailed?: boolean;
}) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {projects.map((project) => (
        <li
          key={project.slug}
          className={cn(project.featured && "sm:col-span-2")}
        >
          <ProjectCard project={project} detailed={detailed} />
        </li>
      ))}
    </ul>
  );
}

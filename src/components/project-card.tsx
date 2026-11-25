import { ProjectLogo } from "@/components/brand";
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
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { t } from "@/lib/i18n";
import type { Project } from "@/lib/projects";
import { ArrowUpRightIcon, BookOpenIcon, CheckIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Cover } from "./cover";
import { GitHubIcon } from "./icons";

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
      className={buttonVariants({ variant, size: "sm" })}
    >
      {children}
    </a>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const { docs, live, repository } = project.links;

  return (
    <>
      {docs ? (
        <Link
          href={docs}
          aria-label={t.project.docsFor(project.name)}
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <BookOpenIcon data-icon="inline-start" />
          {t.project.docs}
        </Link>
      ) : null}
      {live ? (
        <ExternalLink href={live} label={t.project.liveFor(project.name)}>
          {t.project.live}
          <ArrowUpRightIcon data-icon="inline-end" />
        </ExternalLink>
      ) : null}
      {repository ? (
        <ExternalLink
          href={repository}
          label={t.project.sourceFor(project.name)}
        >
          <GitHubIcon data-icon="inline-start" />
          {t.project.source}
        </ExternalLink>
      ) : null}
    </>
  );
}

/** Large card for a featured project: a cover, highlights, stack, and links. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group h-full gap-0 py-0 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none">
      <Cover className="h-44 border-b">
        <ProjectLogo
          mark={project.mark}
          name={project.name}
          className="size-16 drop-shadow-2xl"
        />
      </Cover>

      <CardHeader className="gap-1.5 pt-5">
        <CardTitle className="text-base">{project.name}</CardTitle>
        <CardDescription className="text-sm/relaxed text-pretty">
          {project.description}
        </CardDescription>
      </CardHeader>

      {project.highlights.length > 0 || project.stack.length > 0 ? (
        <CardContent className="flex flex-col gap-5 pt-5 pb-5">
          {project.highlights.length > 0 ? (
            <ul className="flex flex-col gap-2 text-sm">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2.5">
                  <CheckIcon
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-brand"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {project.stack.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
              {project.stack.map((item) => (
                <li key={item}>
                  <Badge variant="outline">{item}</Badge>
                </li>
              ))}
            </ul>
          ) : null}
        </CardContent>
      ) : null}

      <CardFooter className="mt-auto flex-wrap gap-1.5 border-t pb-4">
        <ProjectLinks project={project} />
      </CardFooter>
    </Card>
  );
}

/** Compact rows for the rest of the projects. */
export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ItemGroup className="grid gap-3 sm:grid-cols-2">
      {projects.map((project) => (
        <Item key={project.slug} variant="outline" role="listitem">
          <ItemMedia>
            <ProjectLogo mark={project.mark} name={project.name} className="size-9" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="text-sm">{project.name}</ItemTitle>
            <ItemDescription className="text-sm/relaxed">
              {project.description}
            </ItemDescription>
          </ItemContent>
          <ItemActions className="basis-full flex-wrap gap-1.5 ps-[2.875rem]">
            <ProjectLinks project={project} />
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  );
}

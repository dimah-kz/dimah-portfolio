import { ProjectLogo } from "@/components/brand";
import type { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/lib/projects";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

function OutboundLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={buttonVariants({ variant: "ghost", size: "sm" })}
    >
      {children}
      <ArrowUpRightIcon data-icon="inline-end" />
    </a>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2.5">
          <ProjectLogo id={project.id} />
          <CardTitle>{project.name}</CardTitle>
        </div>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex-wrap gap-2">
        {"docs" in project ? (
          <Link
            href={project.docs}
            aria-label={`Docs for ${project.name}`}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Docs
          </Link>
        ) : null}
        <OutboundLink
          href={project.live}
          label={`Live site for ${project.name}`}
        >
          Live
        </OutboundLink>
        <OutboundLink
          href={project.repository}
          label={`GitHub repository for ${project.name}`}
        >
          GitHub
        </OutboundLink>
      </CardFooter>
    </Card>
  );
}

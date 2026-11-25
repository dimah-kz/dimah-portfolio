import type { Project } from "@/lib/projects";
import { cn } from "cn";
import Image from "next/image";

/**
 * A project's `logo` in a square slot. A project without one gets its first
 * letter on a muted tile. Size it with `className`, such as `size-10`.
 */
export function ProjectLogo({
  project,
  className,
}: {
  project: Pick<Project, "name" | "logo">;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center",
        className,
      )}
    >
      {project.logo ? (
        <Image
          src={project.logo}
          alt=""
          width={64}
          height={64}
          className="size-full"
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex size-full items-center justify-center rounded-[22%] border bg-muted font-heading text-[0.6em] font-semibold text-muted-foreground uppercase"
        >
          {project.name.slice(0, 1)}
        </span>
      )}
    </span>
  );
}

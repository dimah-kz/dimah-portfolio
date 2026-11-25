import { cn } from "cn";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/** Page-width block. Lines up with the header through `--fd-layout-width`. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-(--fd-layout-width) px-4", className)}
      {...props}
    />
  );
}

export function Section({
  className,
  children,
  ...props
}: ComponentProps<"section">) {
  return (
    <section className={cn("py-20 sm:py-24", className)} {...props}>
      <Container className="flex flex-col gap-10">{children}</Container>
    </section>
  );
}

/** Small label over a heading, after a brand hairline. As on the share cards. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 text-xs font-medium text-brand-text ltr:tracking-wider ltr:uppercase">
      <span aria-hidden="true" className="h-px w-6 bg-brand" />
      {children}
    </p>
  );
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  action,
}: {
  /** `id` of the heading, for `aria-labelledby` and anchors. */
  id?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex max-w-xl flex-col gap-3">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2
          id={id}
          className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {title}
        </h2>
        {description ? (
          <p className="text-pretty text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

/** "See all" link at the end of a section header. */
export function SectionLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
      <ArrowRightIcon
        aria-hidden="true"
        className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
      />
    </Link>
  );
}

/**
 * Title block at the top of an inner page, such as `/projects` or `/blog`.
 * Like the home hero, it runs under the glass header (`-mt-14 pt-14`).
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative isolate -mt-14 overflow-hidden border-b pt-14">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid" />
      <div
        aria-hidden="true"
        className="absolute -top-56 left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
      />
      <Container className="flex flex-col gap-4 pt-16 pb-12 sm:pt-20">
        {eyebrow}
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
            {description}
          </p>
        ) : null}
        {children}
      </Container>
    </header>
  );
}

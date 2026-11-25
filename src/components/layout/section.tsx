import { cn } from "cn";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
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
    <section className={cn("py-10 sm:py-12", className)} {...props}>
      <Container className="flex flex-col gap-7">{children}</Container>
    </section>
  );
}

export function SectionHeader({
  id,
  title,
  description,
  action,
}: {
  /** `id` of the heading, for `aria-labelledby` and anchors. */
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="flex min-w-0 flex-col gap-1.5">
        <h2
          id={id}
          className="font-heading text-xl font-semibold ltr:tracking-tight rtl:leading-snug"
        >
          {title}
        </h2>
        {description ? (
          <p className="text-sm text-pretty text-muted-foreground">
            {description}
          </p>
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
      className="group inline-flex shrink-0 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
      <ArrowRightIcon
        aria-hidden="true"
        className="size-3.5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
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
  /** Above the title, such as a back link. */
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative isolate -mt-14 overflow-hidden pt-14">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-wash" />
      <Container className="flex flex-col gap-3 pt-14 pb-2 sm:pt-20">
        {eyebrow}
        <h1 className="font-heading text-3xl font-semibold text-balance sm:text-4xl ltr:tracking-tight rtl:leading-snug">
          {title}
        </h1>
        {description ? (
          <p className="max-w-xl text-base/relaxed text-pretty text-muted-foreground">
            {description}
          </p>
        ) : null}
        {children}
      </Container>
    </header>
  );
}

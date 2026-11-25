import { Rings } from "@/components/rings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import type { BlogPost } from "@/lib/blog";
import { t } from "@/lib/i18n";
import { site } from "@/lib/site";
import { cn } from "cn";
import { ArrowRightIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

/** Fades and lifts in on load. Each step waits a little longer. */
const enter =
  "animate-in fade-in slide-in-from-bottom-3 fill-mode-backwards duration-700 motion-reduce:animate-none";

export interface HeroStat {
  value: number;
  label: string;
  href: string;
}

/**
 * The first screen, header included: the hero runs under the glass header
 * (`-mt-14 pt-14`). The avatar sits in rings, then the newest post, the title
 * with its accent, the intro, two actions, and what is here in numbers.
 */
export function Hero({
  latest,
  stats,
}: {
  latest?: BlogPost;
  stats: HeroStat[];
}) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate -mt-14 flex min-h-[min(100svh,60rem)] flex-col overflow-hidden pt-14"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-grid" />

      <div className="mx-auto flex w-full max-w-(--fd-layout-width) flex-1 flex-col items-center justify-center px-4 pt-16 pb-10 text-center sm:pt-20 sm:pb-12">
        <div className={cn(enter, "relative mb-8")}>
          <Rings pulse className="size-[44rem] sm:size-[56rem]" />
          <Avatar className="size-24 shadow-2xl shadow-brand/20 ring-1 ring-brand/40">
            <AvatarImage src={site.author.avatarUrl} alt={site.author.name} />
            <AvatarFallback>{site.author.name.slice(0, 1)}</AvatarFallback>
          </Avatar>
        </div>

        {latest ? (
          <Link
            href={latest.url}
            className={cn(
              enter,
              "group mb-6 inline-flex max-w-full items-center gap-2 rounded-full border bg-background/60 py-1 ps-1 pe-3 text-xs backdrop-blur-sm transition-colors [animation-delay:75ms] hover:bg-muted/60",
            )}
          >
            <span className="rounded-full bg-brand/15 px-2 py-0.5 font-medium text-brand-text">
              {t.hero.latest}
            </span>
            <span className="truncate text-muted-foreground transition-colors group-hover:text-foreground">
              {latest.title}
            </span>
            <ChevronRightIcon
              aria-hidden="true"
              className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
            />
          </Link>
        ) : null}

        <h1
          id="hero-title"
          className={cn(
            enter,
            "max-w-4xl font-heading text-[clamp(2.5rem,4.5vw+1rem,4.75rem)] font-semibold text-balance delay-150 ltr:leading-[1.04] ltr:tracking-tight rtl:leading-[1.3]",
          )}
        >
          {site.home.headline}{" "}
          <span className="bg-linear-to-b from-brand-text to-brand bg-clip-text text-transparent">
            {site.home.headlineAccent}
          </span>
        </h1>

        <p
          className={cn(
            enter,
            "mt-6 max-w-2xl text-base/relaxed text-pretty text-muted-foreground delay-200 sm:text-lg/relaxed",
          )}
        >
          {site.home.intro}
        </p>

        <div
          className={cn(enter, "mt-9 flex flex-wrap items-center justify-center gap-3 delay-300")}
        >
          <Link
            href="/projects"
            className={cn(buttonVariants({ size: "lg" }), "h-10 px-4 text-sm")}
          >
            {t.hero.viewProjects}
            <ArrowRightIcon data-icon="inline-end" className="rtl:rotate-180" />
          </Link>
          <Link
            href="/blog"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-10 bg-background/60 px-4 text-sm backdrop-blur-sm",
            )}
          >
            {t.hero.readBlog}
          </Link>
        </div>

        {stats.length > 0 ? (
          <ul
            className={cn(
              enter,
              "mt-14 grid w-full max-w-2xl grid-cols-3 border-y delay-500 sm:mt-16",
            )}
          >
            {stats.map((stat) => (
              <li key={stat.href} className="border-s first:border-s-0">
                <Link
                  href={stat.href}
                  className="flex h-full flex-col items-center gap-1 px-2 py-5 transition-colors hover:bg-muted/40"
                >
                  <span className="font-heading text-2xl font-semibold tabular-nums sm:text-3xl">
                    {stat.value.toLocaleString(site.locale)}
                  </span>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

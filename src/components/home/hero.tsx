import { ContactButton } from "@/components/contact-button";
import { Container } from "@/components/layout/section";
import { SocialLinks } from "@/components/social-links";
import { SpotlightCard } from "@/components/spotlight-card";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import type { BlogPost } from "@/lib/blog";
import { primaryContact, profiles } from "@/lib/links";
import { Link } from "@/i18n/navigation";
import { site, siteCopy } from "@/lib/site";
import { cn } from "cn";
import { ArrowRightIcon, FileTextIcon, SparklesIcon } from "lucide-react";
import { useFormatter, useLocale, useTranslations } from "next-intl";

export interface HeroStat {
  value: number;
  label: string;
  href: string;
}

/**
 * Blur-fade entrance in CSS (tw-animate-css), so the hero shows before
 * hydration. Sections further down use Magic UI's `BlurFade` when in view.
 */
const enter =
  "animate-in fade-in blur-in-sm slide-in-from-bottom-2 fill-mode-backwards duration-700 ease-out motion-reduce:animate-none";

/**
 * The first screen: the newest post, the title with its accent, the intro and
 * the actions on one side; a profile card with live counts on the other. It
 * runs under the glass header (`-mt-14 pt-14`), on the brand wash.
 */
export function Hero({
  latest,
  stats,
}: {
  latest?: BlogPost;
  stats: HeroStat[];
}) {
  const t = useTranslations("hero");
  const { home } = siteCopy(useLocale());

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate -mt-14 overflow-hidden pt-14"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[40rem] bg-wash"
      />

      <Container className="grid gap-12 pt-16 pb-20 sm:pt-24 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-center lg:gap-16 lg:pt-28 lg:pb-28">
        <div className="flex flex-col items-start gap-6">
          {latest ? (
            <div className={cn(enter, "max-w-full")}>
              <Badge
                variant="outline"
                render={<Link href={latest.path} />}
                className="group h-7 max-w-full gap-1.5 bg-background/60 px-3 text-xs backdrop-blur-sm"
              >
                <SparklesIcon data-icon="inline-start" className="text-brand" />
                <AnimatedShinyText className="truncate">
                  {t("latest")} · {latest.title}
                </AnimatedShinyText>
                <ArrowRightIcon
                  data-icon="inline-end"
                  className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                />
              </Badge>
            </div>
          ) : null}

          <h1
            id="hero-title"
            className={cn(
              enter,
              "font-heading text-[clamp(2.5rem,4vw+1rem,4.25rem)] font-semibold text-balance delay-100 ltr:leading-[1.05] ltr:tracking-tight rtl:leading-[1.3]",
            )}
          >
            {home.headline}{" "}
            <span className="bg-linear-to-r from-brand-text to-brand bg-clip-text text-transparent">
              {home.headlineAccent}
            </span>
          </h1>

          <p
            className={cn(
              enter,
              "max-w-xl text-base/relaxed text-pretty text-muted-foreground delay-200 sm:text-lg/relaxed",
            )}
          >
            {home.intro}
          </p>

          <div
            className={cn(
              enter,
              "flex flex-wrap items-center gap-3 pt-2 delay-300",
            )}
          >
            <Link
              href="/projects"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-10 px-4 text-sm",
              )}
            >
              {t("viewProjects")}
              <ArrowRightIcon
                data-icon="inline-end"
                className="rtl:rotate-180"
              />
            </Link>
            {latest ? (
              <Link
                href="/blog"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-10 px-4 text-sm",
                )}
              >
                {t("readBlog")}
              </Link>
            ) : null}
          </div>
        </div>

        <div className={cn(enter, "w-full max-w-sm delay-500 lg:max-w-none")}>
          <ProfileCard stats={stats} />
        </div>
      </Container>
    </section>
  );
}

/** Who this is, what is here in numbers, and the quickest way to say hello. */
function ProfileCard({ stats }: { stats: HeroStat[] }) {
  const t = useTranslations("profile");
  const format = useFormatter();
  const { tagline, availability, resume } = siteCopy(useLocale());
  const others = profiles.filter((profile) => profile !== primaryContact);

  return (
    <SpotlightCard>
      <Card className="h-full">
        <CardHeader className="grid-cols-[auto_1fr] items-center gap-x-3">
          <Avatar className="row-span-2 size-12">
            <AvatarImage src={site.author.avatar} alt={site.author.name} />
            <AvatarFallback>{site.author.name.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-base">{site.author.name}</CardTitle>
          <CardDescription className="text-sm">{tagline}</CardDescription>
          {availability ? (
            <Badge variant="outline" className="col-span-2 mt-3 w-fit gap-1.5">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-brand"
              />
              {availability}
            </Badge>
          ) : null}
        </CardHeader>

        {stats.length > 0 ? (
          <CardContent>
            <ul className="grid auto-cols-fr grid-flow-col gap-2">
              {stats.map((stat) => (
                <li key={stat.href}>
                  <Link
                    href={stat.href}
                    className="flex h-full flex-col gap-0.5 rounded-md bg-muted/50 px-3 py-2.5 transition-colors hover:bg-muted"
                  >
                    <span className="font-heading text-2xl font-semibold tabular-nums">
                      {format.number(stat.value)}
                    </span>
                    <span className="text-xs leading-snug text-muted-foreground">
                      {stat.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        ) : null}

        <CardFooter className="flex-col items-stretch gap-3 border-t">
          {primaryContact ? <ContactButton profile={primaryContact} /> : null}
          {resume ? (
            <a
              href={resume}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-10 gap-2 px-4 text-sm",
              )}
            >
              <FileTextIcon data-icon="inline-start" />
              {t("resume")}
            </a>
          ) : null}
          <SocialLinks profiles={others} className="justify-center" />
        </CardFooter>
      </Card>
    </SpotlightCard>
  );
}

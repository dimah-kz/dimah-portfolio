import { ContactButton } from "@/components/contact-button";
import { Container } from "@/components/layout/section";
import { SocialLinks } from "@/components/social-links";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { heroContact, profiles } from "@/lib/links";
import { authorName, site, siteCopy } from "@/lib/site";
import { cn } from "cn";
import { FileTextIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

/**
 * Blur-fade entrance in CSS (tw-animate-css), so the hero shows before
 * hydration. Sections further down use Magic UI's `BlurFade` when in view.
 */
const enter =
  "animate-in fade-in blur-in-sm slide-in-from-bottom-2 fill-mode-backwards duration-700 ease-out motion-reduce:animate-none";

/**
 * The first screen: who this is, the title, the intro, and the quickest way
 * to say hello. It runs under the glass header (`-mt-14 pt-14`), on the wash.
 */
export function Hero() {
  const t = useTranslations("profile");
  const locale = useLocale();
  const { home, tagline, availability, resume } = siteCopy(locale);
  const name = authorName(locale);
  const others = profiles.filter((profile) => profile !== heroContact);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate -mt-14 overflow-hidden pt-14"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-wash"
      />

      <Container className="flex flex-col gap-8 pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className={cn(enter, "flex items-center gap-4")}>
          <Avatar className="size-14 sm:size-16">
            <Image
              src={site.author.avatar}
              alt={name}
              width={128}
              height={128}
              sizes="64px"
              priority
              className="size-full rounded-full object-cover"
            />
          </Avatar>
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-heading text-base font-semibold">
              {name}
              {availability ? (
                <Badge variant="outline" className="gap-1.5 font-normal">
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-brand"
                  />
                  {availability}
                </Badge>
              ) : null}
            </p>
            <p className="text-sm text-muted-foreground">{tagline}</p>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h1
            id="hero-title"
            className={cn(
              enter,
              "font-heading text-[clamp(2rem,3vw+1.25rem,2.75rem)] font-semibold text-balance delay-100 ltr:leading-[1.1] ltr:tracking-tight rtl:leading-[1.4]",
            )}
          >
            {home.headline}{" "}
            <span className="text-muted-foreground sm:block">
              {home.headlineAccent}
            </span>
          </h1>
          <p
            className={cn(
              enter,
              "max-w-xl text-base/relaxed text-pretty text-muted-foreground delay-200 sm:text-[1.0625rem]/relaxed",
            )}
          >
            {home.intro}
          </p>
        </div>

        <div
          className={cn(enter, "flex flex-wrap items-center gap-2 delay-300")}
        >
          {heroContact ? <ContactButton profile={heroContact} /> : null}
          {resume ? (
            <a
              href={resume}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-9 gap-2 px-3.5 text-sm",
              )}
            >
              <FileTextIcon data-icon="inline-start" />
              {t("resume")}
            </a>
          ) : null}
          <SocialLinks profiles={others} className="ms-1" />
        </div>
      </Container>
    </section>
  );
}

import { BlogCards } from "@/components/blog";
import { TelegramIcon } from "@/components/icons";
import { Eyebrow, Section, SectionHeader, SectionLink } from "@/components/layout/section";
import { ProjectCard, ProjectList } from "@/components/project-card";
import { Rings } from "@/components/rings";
import { SocialLinks } from "@/components/social-links";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { BlogPost } from "@/lib/blog";
import { t } from "@/lib/i18n";
import { socialLinks } from "@/lib/links";
import { featuredProjects, otherProjects } from "@/lib/projects";
import { site } from "@/lib/site";
import { cn } from "cn";
import { MailIcon } from "lucide-react";

export function WorkSection() {
  return (
    <Section id="work" aria-labelledby="work-title">
      <SectionHeader
        id="work-title"
        eyebrow={t.work.eyebrow}
        title={t.work.title}
        description={t.work.description}
        action={<SectionLink href="/projects">{t.work.all}</SectionLink>}
      />
      <div className="grid gap-5 md:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      {otherProjects.length > 0 ? (
        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-sm font-medium text-muted-foreground">
            {t.work.more}
          </h3>
          <ProjectList projects={otherProjects} />
        </div>
      ) : null}
    </Section>
  );
}

/** The three principles in one panel, split by hairlines. */
export function PrinciplesSection() {
  return (
    <Section aria-labelledby="principles-title">
      <SectionHeader
        id="principles-title"
        eyebrow={t.principles.eyebrow}
        title={t.principles.title}
        description={t.principles.description}
      />
      <Card className="gap-0 py-0">
        <ul className="grid md:grid-cols-3">
          {site.home.principles.map(({ icon: Icon, title, description }, index) => (
            <li
              key={title}
              className="flex flex-col gap-4 border-t p-6 first:border-t-0 sm:p-8 md:border-s md:border-t-0 md:first:border-s-0"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-lg border bg-background text-brand shadow-xs">
                  <Icon aria-hidden="true" className="size-4.5" />
                </span>
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {(index + 1).toLocaleString(site.locale, { minimumIntegerDigits: 2 })}
                </span>
              </div>
              <h3 className="pt-2 font-heading text-base font-semibold">{title}</h3>
              <p className="text-sm/relaxed text-pretty text-muted-foreground">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  );
}

export function WritingSection({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <Section aria-labelledby="writing-title">
      <SectionHeader
        id="writing-title"
        eyebrow={t.writing.eyebrow}
        title={t.writing.title}
        description={t.writing.description}
        action={<SectionLink href="/blog">{t.writing.all}</SectionLink>}
      />
      <BlogCards posts={posts} />
    </Section>
  );
}

/** Telegram first, then email and the other profiles. */
export function ContactSection() {
  const profiles = socialLinks.filter(
    (link) => link.href !== site.author.telegramUrl && !link.href.startsWith("mailto:"),
  );

  return (
    <Section aria-labelledby="contact-title">
      <Card className="relative isolate gap-0 py-0">
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-grid [--grid-origin:50%]" />
        <div aria-hidden="true" className="absolute inset-y-0 end-0 -z-10 w-1/3 max-lg:hidden">
          <Rings className="size-[40rem]" />
        </div>
        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 lg:p-12">
          <div className="flex max-w-xl flex-col gap-3">
            <Eyebrow>{t.contact.eyebrow}</Eyebrow>
            <h2
              id="contact-title"
              className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              {t.contact.title}
            </h2>
            <p className="text-sm/relaxed text-pretty text-muted-foreground sm:text-base/relaxed">
              {t.contact.description}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:flex-col lg:items-stretch">
            <a
              href={site.author.telegramUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 justify-start gap-2.5 px-4 text-sm",
              )}
            >
              <TelegramIcon data-icon="inline-start" />
              <span>{t.contact.telegram}</span>
              <span dir="ltr" className="ms-auto ps-4 text-xs opacity-60">
                @{site.author.telegram}
              </span>
            </a>
            <a
              href={`mailto:${site.author.email}`}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 justify-start gap-2.5 bg-background/70 px-4 text-sm backdrop-blur-sm",
              )}
            >
              <MailIcon data-icon="inline-start" />
              {t.contact.email}
            </a>
            <SocialLinks links={profiles} className="justify-center lg:justify-start" />
          </div>
        </div>
      </Card>
    </Section>
  );
}

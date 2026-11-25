import { BlogCards } from "@/components/blog";
import { TelegramIcon } from "@/components/icons";
import { Eyebrow, Section, SectionHeader, SectionLink } from "@/components/layout/section";
import { ProjectCard, ProjectList } from "@/components/project-card";
import { SocialLinks } from "@/components/social-links";
import { SpotlightCard } from "@/components/spotlight-card";
import { BlurFade } from "@/components/ui/blur-fade";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <BlurFade inView>
        <SectionHeader
          id="work-title"
          eyebrow={t.work.eyebrow}
          title={t.work.title}
          description={t.work.description}
          action={<SectionLink href="/projects">{t.work.all}</SectionLink>}
        />
      </BlurFade>
      <div className="grid gap-5 md:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <BlurFade key={project.slug} inView delay={index * 0.08}>
            <ProjectCard project={project} />
          </BlurFade>
        ))}
      </div>
      {otherProjects.length > 0 ? (
        <BlurFade inView className="flex flex-col gap-4">
          <h3 className="font-heading text-sm font-medium text-muted-foreground">
            {t.work.more}
          </h3>
          <ProjectList projects={otherProjects} />
        </BlurFade>
      ) : null}
    </Section>
  );
}

export function PrinciplesSection() {
  return (
    <Section aria-labelledby="principles-title">
      <BlurFade inView>
        <SectionHeader
          id="principles-title"
          eyebrow={t.principles.eyebrow}
          title={t.principles.title}
          description={t.principles.description}
        />
      </BlurFade>
      <ul className="grid gap-5 md:grid-cols-3">
        {site.home.principles.map(({ icon: Icon, title, description }, index) => (
          <li key={title}>
            <BlurFade inView delay={index * 0.08} className="h-full">
              <Card className="h-full">
                <CardHeader className="gap-2">
                  <span className="mb-2 flex size-10 items-center justify-center rounded-lg bg-brand/12 text-brand-text">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <CardTitle className="text-base">{title}</CardTitle>
                  <CardDescription className="text-sm/relaxed text-pretty">
                    {description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </BlurFade>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function WritingSection({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <Section aria-labelledby="writing-title">
      <BlurFade inView>
        <SectionHeader
          id="writing-title"
          eyebrow={t.writing.eyebrow}
          title={t.writing.title}
          description={t.writing.description}
          action={<SectionLink href="/blog">{t.writing.all}</SectionLink>}
        />
      </BlurFade>
      <BlurFade inView delay={0.08}>
        <BlogCards posts={posts} latestUrl={posts[0]?.url} />
      </BlurFade>
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
      <BlurFade inView>
        <SpotlightCard>
          <Card className="relative isolate">
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-wash" />
            <CardHeader className="gap-3 px-6 pt-6 sm:px-10 sm:pt-10">
              <Eyebrow>{t.contact.eyebrow}</Eyebrow>
              <CardTitle className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                <h2 id="contact-title">{t.contact.title}</h2>
              </CardTitle>
              <CardDescription className="max-w-xl text-sm/relaxed text-pretty sm:text-base/relaxed">
                {t.contact.description}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex-wrap gap-3 px-6 pb-6 sm:px-10 sm:pb-10">
              <a
                href={site.author.telegramUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ size: "lg" }), "h-10 gap-2 px-4 text-sm")}
              >
                <TelegramIcon data-icon="inline-start" />
                {t.contact.telegram}
                <span dir="ltr" className="text-xs opacity-60">
                  @{site.author.telegram}
                </span>
              </a>
              <a
                href={`mailto:${site.author.email}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-10 gap-2 px-4 text-sm",
                )}
              >
                <MailIcon data-icon="inline-start" />
                {t.contact.email}
              </a>
              <SocialLinks links={profiles} />
            </CardFooter>
          </Card>
        </SpotlightCard>
      </BlurFade>
    </Section>
  );
}

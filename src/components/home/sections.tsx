import { BlogCards } from "@/components/blog";
import { ContactButton } from "@/components/contact-button";
import {
  Eyebrow,
  Section,
  SectionHeader,
  SectionLink,
} from "@/components/layout/section";
import { ProjectCard, ProjectList } from "@/components/project-card";
import { SocialLinks } from "@/components/social-links";
import { SpotlightCard } from "@/components/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/ui/blur-fade";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
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
  ItemFooter,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import type { BlogPost } from "@/lib/blog";
import { getExperience, type Role } from "@/lib/experience";
import { findProfile, primaryContact, profiles } from "@/lib/links";
import { getProjects } from "@/lib/projects";
import { siteCopy } from "@/lib/site";
import { cn } from "cn";
import { useFormatter, useLocale, useTranslations } from "next-intl";

/** Featured projects as cards, the rest as rows. Hidden without projects. */
export function WorkSection() {
  const t = useTranslations("work");
  const projects = getProjects(useLocale());
  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);
  if (projects.length === 0) return null;

  return (
    <Section id="work" aria-labelledby="work-title">
      <BlurFade inView>
        <SectionHeader
          id="work-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          action={<SectionLink href="/projects">{t("all")}</SectionLink>}
        />
      </BlurFade>
      {featuredProjects.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <BlurFade key={project.slug} inView delay={index * 0.08}>
              <ProjectCard project={project} />
            </BlurFade>
          ))}
        </div>
      ) : null}
      {otherProjects.length > 0 ? (
        <BlurFade inView className="flex flex-col gap-4">
          {featuredProjects.length > 0 ? (
            <h3 className="font-heading text-sm font-medium text-muted-foreground">
              {t("more")}
            </h3>
          ) : null}
          <ProjectList projects={otherProjects} />
        </BlurFade>
      ) : null}
    </Section>
  );
}

function RoleDates({ role }: { role: Role }) {
  const t = useTranslations("experience");
  const format = useFormatter();

  return (
    <span className="text-sm text-muted-foreground tabular-nums">
      <time dateTime={role.start.toISOString().slice(0, 7)}>
        {format.dateTime(role.start, "month")}
      </time>
      {" – "}
      {role.end ? (
        <time dateTime={role.end.toISOString().slice(0, 7)}>
          {format.dateTime(role.end, "month")}
        </time>
      ) : (
        t("present")
      )}
    </span>
  );
}

/** Work history from `content/experience`. Hidden without roles. */
export function ExperienceSection() {
  const t = useTranslations();
  const experience = getExperience(useLocale());
  if (experience.length === 0) return null;

  return (
    <Section aria-labelledby="experience-title">
      <BlurFade inView>
        <SectionHeader
          id="experience-title"
          eyebrow={t("experience.eyebrow")}
          title={t("experience.title")}
          description={t("experience.description")}
        />
      </BlurFade>
      <BlurFade inView delay={0.08}>
        <ItemGroup className="gap-3">
          {experience.map((role) => (
            <Item
              key={role.slug}
              variant="outline"
              role="listitem"
              className="items-start"
            >
              <ItemContent>
                <ItemTitle className="text-base">{role.role}</ItemTitle>
                <ItemDescription>
                  {role.url ? (
                    <a
                      href={role.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-foreground underline-offset-4 hover:underline"
                    >
                      {role.company}
                    </a>
                  ) : (
                    <span className="font-medium text-foreground">
                      {role.company}
                    </span>
                  )}
                  {role.location ? ` · ${role.location}` : null}
                </ItemDescription>
                {role.summary ? (
                  <p className="pt-1 text-sm/relaxed text-pretty text-muted-foreground">
                    {role.summary}
                  </p>
                ) : null}
              </ItemContent>
              <ItemActions>
                <RoleDates role={role} />
              </ItemActions>
              {role.stack.length > 0 ? (
                <ItemFooter>
                  <ul
                    className="flex flex-wrap gap-1.5"
                    aria-label={t("project.stack")}
                  >
                    {role.stack.map((item) => (
                      <li key={item}>
                        <Badge variant="secondary">{item}</Badge>
                      </li>
                    ))}
                  </ul>
                </ItemFooter>
              ) : null}
            </Item>
          ))}
        </ItemGroup>
      </BlurFade>
    </Section>
  );
}

/** The language's `home.principles` as cards. Hidden when the list is empty. */
export function PrinciplesSection() {
  const t = useTranslations("principles");
  const { principles } = siteCopy(useLocale()).home;
  if (principles.length === 0) return null;

  return (
    <Section aria-labelledby="principles-title">
      <BlurFade inView>
        <SectionHeader
          id="principles-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
      </BlurFade>
      <ul className="grid gap-5 md:grid-cols-3">
        {principles.map(({ icon: Icon, title, description }, index) => (
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

/** The newest posts. Hidden without posts. */
export function WritingSection({ posts }: { posts: BlogPost[] }) {
  const t = useTranslations("writing");
  if (posts.length === 0) return null;

  return (
    <Section aria-labelledby="writing-title">
      <BlurFade inView>
        <SectionHeader
          id="writing-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          action={<SectionLink href="/blog">{t("all")}</SectionLink>}
        />
      </BlurFade>
      <BlurFade inView delay={0.08}>
        <BlogCards posts={posts} latestSlug={posts[0]?.slug} />
      </BlurFade>
    </Section>
  );
}

/** The main contact button, then email, then the other profiles as icons. */
export function ContactSection() {
  const t = useTranslations("contact");
  const copy = siteCopy(useLocale());
  if (!primaryContact) return null;

  const email = findProfile("email");
  const showEmail = email && email !== primaryContact;
  const others = profiles.filter(
    (profile) => profile !== primaryContact && profile !== email,
  );

  return (
    <Section aria-labelledby="contact-title">
      <BlurFade inView>
        <SpotlightCard>
          <Card className="relative isolate">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-wash"
            />
            <CardHeader className="gap-3 px-6 pt-6 sm:px-10 sm:pt-10">
              <Eyebrow>{t("eyebrow")}</Eyebrow>
              <CardTitle className="font-heading text-2xl font-semibold sm:text-3xl ltr:tracking-tight rtl:leading-snug">
                <h2 id="contact-title">{t("title")}</h2>
              </CardTitle>
              <CardDescription className="max-w-xl text-sm/relaxed text-pretty sm:text-base/relaxed">
                {copy.contact}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex-wrap gap-3 px-6 pb-6 sm:px-10 sm:pb-10">
              <ContactButton profile={primaryContact} showHandle />
              {showEmail ? (
                <a
                  href={email.href}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-10 gap-2 px-4 text-sm",
                  )}
                >
                  <email.icon data-icon="inline-start" />
                  {t("cta.email")}
                </a>
              ) : null}
              <SocialLinks profiles={others} />
            </CardFooter>
          </Card>
        </SpotlightCard>
      </BlurFade>
    </Section>
  );
}

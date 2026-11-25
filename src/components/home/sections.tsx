import { BlogList } from "@/components/blog";
import { ContactButton } from "@/components/contact-button";
import {
  Section,
  SectionHeader,
  SectionLink,
} from "@/components/layout/section";
import { ProjectGrid } from "@/components/project-card";
import { SocialLinks } from "@/components/social-links";
import { Timeline } from "@/components/timeline";
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
  ItemTitle,
} from "@/components/ui/item";
import type { BlogPost } from "@/lib/blog";
import { getExperience, type Role } from "@/lib/experience";
import { findProfile, primaryContact, profiles } from "@/lib/links";
import { getProjects } from "@/lib/projects";
import { site, siteCopy } from "@/lib/site";
import { cn } from "cn";
import { useFormatter, useLocale, useTranslations } from "next-intl";

/** Projects on the home page. All of them are on `/projects`. */
const homeProjectCount = 5;

/** The language's `about.paragraphs`, then `site.skills`. Hidden when both are empty. */
export function AboutSection() {
  const t = useTranslations("about");
  const { paragraphs } = siteCopy(useLocale()).about;
  const skills = site.skills ?? [];
  if (paragraphs.length === 0 && skills.length === 0) return null;

  return (
    <Section id="about" aria-labelledby="about-title">
      <BlurFade inView>
        <SectionHeader id="about-title" title={t("title")} />
      </BlurFade>
      {paragraphs.length > 0 ? (
        <BlurFade inView delay={0.06} className="flex flex-col gap-4">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[0.9375rem]/7 text-pretty text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
        </BlurFade>
      ) : null}
      {skills.length > 0 ? (
        <BlurFade inView delay={0.12} className="flex flex-col gap-3">
          <h3 className="text-sm font-medium">{t("skills")}</h3>
          <ul className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <li key={skill}>
                <Badge variant="outline" className="h-6 px-2.5 text-xs">
                  {skill}
                </Badge>
              </li>
            ))}
          </ul>
        </BlurFade>
      ) : null}
    </Section>
  );
}

/** The language's `about.journey` as a timeline. Hidden when the list is empty. */
export function JourneySection() {
  const t = useTranslations("about");
  const { journey } = siteCopy(useLocale()).about;
  if (journey.length === 0) return null;

  return (
    <Section aria-labelledby="journey-title">
      <BlurFade inView>
        <SectionHeader id="journey-title" title={t("journey")} />
      </BlurFade>
      <BlurFade inView delay={0.06}>
        <Timeline items={journey} />
      </BlurFade>
    </Section>
  );
}

/** The first projects, the main one on a card of its own. Hidden without projects. */
export function WorkSection() {
  const t = useTranslations("work");
  const projects = getProjects(useLocale());
  if (projects.length === 0) return null;

  const shown = projects.slice(0, homeProjectCount);

  return (
    <Section id="projects" aria-labelledby="work-title">
      <BlurFade inView>
        <SectionHeader
          id="work-title"
          title={t("title")}
          description={t("description")}
          action={<SectionLink href="/projects">{t("all")}</SectionLink>}
        />
      </BlurFade>
      <BlurFade inView delay={0.06}>
        <ProjectGrid projects={shown} />
      </BlurFade>
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
          title={t("experience.title")}
          description={t("experience.description")}
        />
      </BlurFade>
      <BlurFade inView delay={0.06}>
        <ul className="flex flex-col gap-3">
          {experience.map((role) => (
            <li key={role.slug}>
              <Item variant="outline" className="items-start px-4 py-3.5">
                <ItemContent>
                  <ItemTitle className="text-[0.9375rem]">
                    {role.role}
                  </ItemTitle>
                  <ItemDescription className="text-sm">
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
                          <Badge variant="secondary" className="font-normal">
                            {item}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </ItemFooter>
                ) : null}
              </Item>
            </li>
          ))}
        </ul>
      </BlurFade>
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
          title={t("title")}
          description={t("description")}
          action={<SectionLink href="/blog">{t("all")}</SectionLink>}
        />
      </BlurFade>
      <BlurFade inView delay={0.06}>
        <BlogList posts={posts} />
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
    <Section aria-labelledby="contact-title" className="pb-20 sm:pb-24">
      <BlurFade inView>
        <Card className="gap-6 [--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(8)]">
          <CardHeader className="gap-2">
            <CardTitle className="font-heading text-xl font-semibold ltr:tracking-tight rtl:leading-snug">
              <h2 id="contact-title">{t("title")}</h2>
            </CardTitle>
            <CardDescription className="max-w-lg text-[0.9375rem]/7 text-pretty">
              {copy.contact}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex-wrap gap-2">
            <ContactButton profile={primaryContact} />
            {showEmail ? (
              <a
                href={email.href}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-9 gap-2 px-3.5 text-sm",
                )}
              >
                <email.icon data-icon="inline-start" />
                {t("cta.email")}
              </a>
            ) : null}
            <SocialLinks profiles={others} className="ms-1" />
          </CardFooter>
        </Card>
      </BlurFade>
    </Section>
  );
}

import { ProjectLogo } from "@/components/project-logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Empty, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Link } from "@/i18n/navigation";
import { localizePath } from "@/i18n/paths";
import { feedPath } from "@/lib/links";
import { projectByTag, projectsForTags } from "@/lib/projects";
import { cn } from "cn";
import type { TOCItemType } from "fumadocs-core/toc";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import type { ComponentProps, ReactNode } from "react";
import type { BlogAuthor, BlogPost, BlogTag } from "@/lib/blog";
import { TOCProvider } from "@/components/toc";
import { BlogPanel } from "./panel";

/* -------------------------------------------------------------------------- */
/* Lists                                                                      */
/* -------------------------------------------------------------------------- */

/** Posts as rows, newest first: the date, the title, and the description. */
export function BlogList({
  posts,
  className,
}: {
  posts: BlogPost[];
  className?: string;
}) {
  const t = useTranslations("blog");

  if (posts.length === 0) {
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyTitle>{t("empty")}</EmptyTitle>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <ul className={cn("-mx-3 flex flex-col gap-1", className)}>
      {posts.map((post) => (
        <li key={post.slug}>
          <Item
            render={<Link href={post.path} />}
            className="group items-start px-3 py-3.5"
          >
            <ItemContent className="min-w-0 gap-1.5">
              <span className="flex items-center gap-2">
                <PostMarks tags={post.tags.map((tag) => tag.name)} />
                <PostMeta post={post} className="text-xs" />
              </span>
              <ItemTitle className="line-clamp-none text-[0.9375rem] font-medium text-balance">
                {post.title}
              </ItemTitle>
              {post.description ? (
                <ItemDescription className="text-sm/relaxed text-pretty">
                  {post.description}
                </ItemDescription>
              ) : null}
            </ItemContent>
            <ItemActions className="hidden self-center sm:flex">
              <ArrowRightIcon
                aria-hidden="true"
                className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
              />
            </ItemActions>
          </Item>
        </li>
      ))}
    </ul>
  );
}

/** Logos of the projects a post is about, from its tags. */
function PostMarks({ tags }: { tags: string[] }) {
  const projects = projectsForTags(useLocale(), tags).filter(
    (project) => project.logo,
  );
  if (projects.length === 0) return null;

  return (
    <span className="flex shrink-0 gap-1">
      {projects.map((project) => (
        <ProjectLogo key={project.slug} project={project} className="size-5" />
      ))}
    </span>
  );
}

function PostMeta({ post, className }: { post: BlogPost; className?: string }) {
  const t = useTranslations("blog");
  if (!post.date && !post.readingTime) return null;

  return (
    <span
      className={cn(
        "flex items-center gap-2 text-muted-foreground tabular-nums",
        className,
      )}
    >
      {post.date ? <BlogDate date={post.date} /> : null}
      {/* A hairline, not a dot: a dot reads as a Persian zero. */}
      {post.date && post.readingTime ? (
        <span aria-hidden="true" className="h-3 w-px bg-border" />
      ) : null}
      {post.readingTime ? (
        <span>{t("readingTime", { minutes: post.readingTime })}</span>
      ) : null}
    </span>
  );
}

/** Tags with their number of posts, see `getTags()`. */
export function BlogTagCloud({
  tags,
  active,
}: {
  tags: (BlogTag & { count: number })[];
  /** slug of the current tag */
  active?: string;
}) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag.slug}>
          <Badge
            variant={tag.slug === active ? "default" : "outline"}
            render={<Link href={tag.path} />}
            className="h-7 gap-1.5 px-2.5 text-xs"
          >
            <TagMark name={tag.name} />
            {tag.name}
            <span className="tabular-nums opacity-60">{tag.count}</span>
          </Badge>
        </li>
      ))}
    </ul>
  );
}

function TagMark({ name }: { name: string }) {
  const project = projectByTag(useLocale(), name);
  if (!project?.logo) return null;
  return <ProjectLogo project={project} className="size-3.5" />;
}

/* -------------------------------------------------------------------------- */
/* Post page                                                                  */
/* -------------------------------------------------------------------------- */

export interface BlogPageProps extends ComponentProps<"article"> {
  /** shows a floating panel with the table of contents */
  toc?: TOCItemType[];
}

export function BlogPage({ toc, className, ...props }: BlogPageProps) {
  const article = (
    <article
      {...props}
      className={cn(
        "mx-auto flex w-full max-w-(--fd-layout-width) flex-col gap-10 px-4 pt-12 sm:pt-16",
        // room for the floating panel
        toc ? "pb-32" : "pb-16",
        className,
      )}
    />
  );
  if (!toc) return article;

  return (
    <TOCProvider toc={toc}>
      {article}
      <BlogPanel />
    </TOCProvider>
  );
}

export function BlogHeader(props: ComponentProps<"header">) {
  return (
    <header
      {...props}
      className={cn("flex flex-col gap-5 border-b pb-8", props.className)}
    />
  );
}

export function BlogBackLink({
  href = "/blog",
  children,
}: {
  href?: string;
  children?: ReactNode;
}) {
  const t = useTranslations("blog");

  return (
    <Link
      href={href}
      className="group inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeftIcon
        aria-hidden="true"
        className="size-4 transition-transform group-hover:-translate-x-0.5 rtl:rotate-180 rtl:group-hover:translate-x-0.5"
      />
      {children ?? t("back")}
    </Link>
  );
}

export function BlogTitle(props: ComponentProps<"h1">) {
  return (
    <h1
      {...props}
      className={cn(
        "font-heading text-3xl font-semibold text-balance sm:text-4xl ltr:tracking-tight rtl:leading-snug",
        props.className,
      )}
    />
  );
}

export function BlogDescription(props: ComponentProps<"p">) {
  return (
    <p
      {...props}
      className={cn(
        "text-lg text-pretty text-muted-foreground empty:hidden",
        props.className,
      )}
    />
  );
}

/** Authors, date, and reading time under the title. */
export function BlogByline({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-sm">
      {post.authors.map((author) => (
        <BlogAuthorLink key={author.name} author={author} />
      ))}
      <PostMeta post={post} className="text-sm" />
    </div>
  );
}

function BlogAuthorLink({ author }: { author: BlogAuthor }) {
  const content = (
    <>
      <Avatar size="sm">
        {author.image ? <AvatarImage src={author.image} alt="" /> : null}
        <AvatarFallback>{author.name.slice(0, 1)}</AvatarFallback>
      </Avatar>
      <span className="font-medium">{author.name}</span>
    </>
  );

  return author.url ? (
    <a
      href={author.url}
      className="inline-flex items-center gap-2 transition-colors hover:text-muted-foreground"
    >
      {content}
    </a>
  ) : (
    <span className="inline-flex items-center gap-2">{content}</span>
  );
}

export function BlogTags({ tags }: { tags: BlogTag[] }) {
  const t = useTranslations("blog");
  if (tags.length === 0) return null;

  return (
    <ul aria-label={t("tags")} className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <li key={tag.slug}>
          <Badge variant="outline" render={<Link href={tag.path} />}>
            <TagMark name={tag.name} />
            {tag.name}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

export function BlogDate({
  date,
  ...props
}: Omit<ComponentProps<"time">, "children"> & { date: Date }) {
  const format = useFormatter();

  return (
    <time dateTime={date.toISOString()} {...props}>
      {format.dateTime(date, "date")}
    </time>
  );
}

/** Typography for the MDX body. */
export function BlogBody(props: ComponentProps<"div">) {
  return <div {...props} className={cn("prose min-w-0", props.className)} />;
}

/** Links to the newer and older posts. */
export function BlogPostNav({
  newer,
  older,
}: {
  newer?: BlogPost;
  older?: BlogPost;
}) {
  const t = useTranslations("blog");
  if (!newer && !older) return null;

  return (
    <nav className="grid gap-3 border-t pt-10 sm:grid-cols-2">
      {newer ? (
        <PostNavLink post={newer} label={t("newer")} direction="previous" />
      ) : null}
      {older ? (
        <PostNavLink
          post={older}
          label={t("older")}
          direction="next"
          className="sm:col-start-2"
        />
      ) : null}
    </nav>
  );
}

function PostNavLink({
  post,
  label,
  direction,
  className,
}: {
  post: BlogPost;
  label: string;
  direction: "previous" | "next";
  className?: string;
}) {
  const Arrow = direction === "previous" ? ArrowLeftIcon : ArrowRightIcon;

  return (
    <Link
      href={post.path}
      className={cn(
        "group flex flex-col gap-1.5 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50",
        direction === "next" && "sm:items-end sm:text-end",
        className,
      )}
    >
      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        {direction === "previous" ? (
          <Arrow aria-hidden="true" className="size-3.5 rtl:rotate-180" />
        ) : null}
        {label}
        {direction === "next" ? (
          <Arrow aria-hidden="true" className="size-3.5 rtl:rotate-180" />
        ) : null}
      </span>
      <span className="font-heading text-sm font-medium text-balance">
        {post.title}
      </span>
    </Link>
  );
}

/** RSS link for the blog header. */
export function BlogFeedLink() {
  const t = useTranslations("blog");

  return (
    <a
      href={localizePath(feedPath, useLocale())}
      className="group inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      {t("rss")}
      <ArrowUpRightIcon aria-hidden="true" className="size-3.5" />
    </a>
  );
}

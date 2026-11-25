import { ProjectMark, isMarkId } from "@/components/brand";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Cover } from "@/components/cover";
import { formatDate, t } from "@/lib/i18n";
import { projectByTag, projectsForTags } from "@/lib/projects";
import { site } from "@/lib/site";
import { cn } from "cn";
import type { TOCItemType } from "fumadocs-core/toc";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { BlogAuthor, BlogPost, BlogTag } from "../../lib/blog";
import { TOCProvider } from "../toc";
import { BlogPanel } from "./panel";

/* -------------------------------------------------------------------------- */
/* Lists                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Posts as cards, newest first. With `featured`, the newest one spans the
 * row with its cover beside the text.
 */
export function BlogCards({
  posts,
  featured = false,
  className,
}: {
  posts: BlogPost[];
  featured?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {posts.map((post, index) => {
        const wide = featured && index === 0;
        return (
          <li key={post.url} className={cn(wide && "sm:col-span-2 lg:col-span-3")}>
            <BlogCard post={post} wide={wide} />
          </li>
        );
      })}
    </ul>
  );
}

export function BlogCard({ post, wide = false }: { post: BlogPost; wide?: boolean }) {
  return (
    <Link href={post.url} className="group block h-full rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <Card
        className={cn(
          "h-full gap-0 py-0 transition-[translate,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:shadow-xl motion-reduce:transition-none",
          wide && "lg:flex-row",
        )}
      >
        <PostCover
          post={post}
          className={cn(
            "aspect-[2/1] border-b",
            wide && "lg:aspect-auto lg:min-h-80 lg:w-1/2 lg:border-e lg:border-b-0",
          )}
        />
        <div
          className={cn(
            "flex flex-1 flex-col gap-3 p-5 sm:p-6",
            wide && "lg:justify-center lg:gap-4 lg:p-10",
          )}
        >
          {wide ? (
            <span className="w-fit rounded-full bg-brand/15 px-2 py-0.5 text-xs font-medium text-brand-text">
              {t.blog.latest}
            </span>
          ) : null}
          <PostMeta post={post} className="text-xs" />
          <h3
            className={cn(
              "font-heading text-lg/snug font-semibold tracking-tight text-balance",
              wide && "lg:text-3xl/tight",
            )}
          >
            {post.title}
          </h3>
          {post.description ? (
            <p
              className={cn(
                "line-clamp-3 text-sm/relaxed text-pretty text-muted-foreground",
                wide && "lg:text-base/relaxed",
              )}
            >
              {post.description}
            </p>
          ) : null}
          <div className="mt-auto flex flex-col gap-4 pt-2">
            {post.tags.length > 0 ? (
              <span className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Badge key={tag.slug} variant="outline">
                    <TagMark name={tag.name} />
                    {tag.name}
                  </Badge>
                ))}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1 border-t pt-4 text-sm font-medium">
              {t.blog.read}
              <ArrowRightIcon
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
              />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

/** The post's projects in the middle of a generated cover, or the author without one. */
function PostCover({ post, className }: { post: BlogPost; className?: string }) {
  const marks = projectsForTags(post.tags.map((tag) => tag.name))
    .map((project) => project.mark)
    .filter(isMarkId);
  const author = post.authors[0];

  return (
    <Cover className={className}>
      {marks.length > 0 ? (
        <span className="flex items-center gap-4">
          {marks.map((mark) => (
            <ProjectMark key={mark} id={mark} className="size-14 drop-shadow-2xl" />
          ))}
        </span>
      ) : (
        <Avatar className="size-16 ring-1 ring-brand/40">
          {author?.image ? <AvatarImage src={author.image} alt="" /> : null}
          <AvatarFallback>{(author?.name ?? site.name).slice(0, 1)}</AvatarFallback>
        </Avatar>
      )}
    </Cover>
  );
}

function PostMeta({ post, className }: { post: BlogPost; className?: string }) {
  if (!post.date && !post.readingTime) return null;

  return (
    <span
      className={cn(
        "flex items-center gap-2 text-muted-foreground tabular-nums",
        className,
      )}
    >
      {post.date ? <BlogDate date={post.date} /> : null}
      {post.date && post.readingTime ? <span aria-hidden="true">·</span> : null}
      {post.readingTime ? (
        <span>{t.blog.readingTime(post.readingTime)}</span>
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
            render={<Link href={tag.url} />}
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
  const mark = projectByTag(name)?.mark;
  if (!isMarkId(mark)) return null;
  return <ProjectMark id={mark} className="size-3.5" />;
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
        "mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 pt-12 sm:pt-16",
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
  children = t.blog.back,
}: {
  href?: string;
  children?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeftIcon
        aria-hidden="true"
        className="size-4 transition-transform group-hover:-translate-x-0.5 rtl:rotate-180 rtl:group-hover:translate-x-0.5"
      />
      {children}
    </Link>
  );
}

export function BlogTitle(props: ComponentProps<"h1">) {
  return (
    <h1
      {...props}
      className={cn(
        "font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl",
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
  if (tags.length === 0) return null;

  return (
    <ul aria-label={t.blog.tags} className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <li key={tag.slug}>
          <Badge variant="outline" render={<Link href={tag.url} />}>
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
  return (
    <time dateTime={date.toISOString()} {...props}>
      {formatDate(date)}
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
  if (!newer && !older) return null;

  return (
    <nav className="grid gap-3 border-t pt-10 sm:grid-cols-2">
      {newer ? (
        <PostNavLink post={newer} label={t.blog.newer} direction="previous" />
      ) : null}
      {older ? (
        <PostNavLink
          post={older}
          label={t.blog.older}
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
      href={post.url}
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
  return (
    <a
      href="/feed.xml"
      className="group inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      {t.blog.rss}
      <ArrowUpRightIcon aria-hidden="true" className="size-3.5" />
    </a>
  );
}

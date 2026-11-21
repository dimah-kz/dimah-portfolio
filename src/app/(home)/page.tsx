import { ProjectMark } from "@/components/brand";
import { ProjectCard } from "@/components/project-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { getPosts } from "@/lib/blog";
import { projectsForTags, projectsIn } from "@/lib/projects";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { blogAuthors, blogSource } from "@/lib/source";
import { ArrowUpRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = pageMeta("/");

const dateFormat = new Intl.DateTimeFormat(site.locale, {
  dateStyle: "medium",
  timeZone: "UTC",
});

export default function HomePage() {
  const posts = getPosts(blogSource.getPages(), blogAuthors);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-16 px-6 py-16 sm:py-24">
      <section className="flex max-w-xl flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarImage src={site.author.avatarUrl} alt={site.author.name} />
              <AvatarFallback>{site.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <p className="text-sm text-muted-foreground">
              {site.author.github}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="font-heading text-4xl font-medium tracking-tight text-balance">
              {site.name}
            </h1>
            <p className="text-muted-foreground">{site.description}</p>
            <p className="text-sm/6 text-muted-foreground">
              I publish server-first tools for React and Next.js. Most of that
              work is dimah-starter and dimah-s3.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={site.author.githubUrl} className={buttonVariants()}>
            GitHub
            <ArrowUpRightIcon data-icon="inline-end" />
          </Link>
          <Link href="/docs" className={buttonVariants({ variant: "outline" })}>
            Docs
          </Link>
          <Link href="/blog" className={buttonVariants({ variant: "outline" })}>
            Blog
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-heading text-sm font-medium">Work</h2>
          <Link
            href="/docs"
            className="text-xs text-muted-foreground underline-offset-4 hover:underline"
          >
            Documentation
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {projectsIn("primary").map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-sm font-medium">Also published</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {projectsIn("other").map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-heading text-sm font-medium">Notes</h2>
          <Link
            href="/blog"
            className="text-xs text-muted-foreground underline-offset-4 hover:underline"
          >
            All notes
          </Link>
        </div>
        <ItemGroup>
          {posts.map((post) => (
            <Item
              key={post.url}
              variant="outline"
              render={<Link href={post.url} />}
            >
              <PostMarks tags={post.tags.map((tag) => tag.name)} />
              <ItemContent>
                <ItemHeader>
                  <ItemTitle>{post.title}</ItemTitle>
                  {post.date ? (
                    <time
                      dateTime={post.date.toISOString()}
                      className="shrink-0 text-xs text-muted-foreground"
                    >
                      {dateFormat.format(post.date)}
                    </time>
                  ) : null}
                </ItemHeader>
                {post.description ? (
                  <ItemDescription>{post.description}</ItemDescription>
                ) : null}
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </section>

      <footer className="flex flex-wrap gap-x-4 gap-y-2 border-t pt-6 text-sm text-muted-foreground">
        <a
          href={site.author.xUrl}
          className="underline-offset-4 hover:text-foreground hover:underline"
        >
          X
        </a>
        <a
          href={`mailto:${site.author.email}`}
          className="underline-offset-4 hover:text-foreground hover:underline"
        >
          Email
        </a>
      </footer>
    </main>
  );
}

function PostMarks({ tags }: { tags: string[] }) {
  const matched = projectsForTags(tags);
  if (matched.length === 0) return null;

  return (
    <ItemMedia variant="icon">
      {matched.map((project) => (
        <ProjectMark key={project.id} id={project.id} />
      ))}
    </ItemMedia>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { getPosts } from "@/lib/blog";
import { blogAuthors, blogSource } from "@/lib/source";
import { site } from "@/lib/site";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

const work = [
  {
    name: "dimah-starter",
    description:
      "Server-first Next.js 16 starter for multi-tenant SaaS. Organizations, roles, and an admin panel, with writes as Server Actions.",
    docs: "/docs/starter",
    live: "https://starter.dimah.dev",
  },
  {
    name: "dimah-s3",
    description:
      "Full-stack S3 toolkit for React. The server signs the upload, the browser talks to the bucket, and credentials stay on the backend.",
    docs: "/docs/s3",
    live: "https://s3.dimah.dev",
  },
] as const;

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
              <AvatarImage src={site.author.avatarUrl} alt="" />
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
          {work.map((project) => (
            <Card key={project.name} className="h-full">
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto gap-2">
                <Link
                  href={project.docs}
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  Docs
                </Link>
                <Link
                  href={project.live}
                  className={buttonVariants({ variant: "ghost", size: "sm" })}
                >
                  Live
                  <ArrowUpRightIcon data-icon="inline-end" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <p className="text-xs/relaxed text-muted-foreground">
          Also{" "}
          <a
            href="https://form.dimah.dev"
            className="text-foreground underline-offset-4 hover:underline"
          >
            dimah-form
          </a>{" "}
          and{" "}
          <a
            href="https://survey.dimah.dev"
            className="text-foreground underline-offset-4 hover:underline"
          >
            dimah-survey
          </a>
          .
        </p>
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
    </main>
  );
}

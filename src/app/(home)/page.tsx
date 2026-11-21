import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-6 px-6 py-16">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">{site.author.github}</p>
        <h1 className="font-heading text-3xl font-medium tracking-tight">
          {site.name}
        </h1>
        <p className="max-w-xl text-muted-foreground">{site.description}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link href={site.author.githubUrl} className={buttonVariants()}>
          GitHub
          <ArrowUpRightIcon data-icon="inline-end" />
        </Link>
        <Link href="/docs" className={buttonVariants({ variant: "outline" })}>
          Notes
        </Link>
      </div>
    </main>
  );
}

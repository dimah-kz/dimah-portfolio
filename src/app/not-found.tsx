import { SiteLayout } from "@/components/layout/site-layout";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { t } from "@/lib/i18n";
import { navLinks } from "@/lib/links";
import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: t.notFound.title,
  robots: { index: false },
};

export default function NotFound() {
  return (
    <SiteLayout>
      <main id="main" className="flex flex-1 flex-col px-4 py-24">
        <Empty>
          <EmptyHeader>
            <p className="font-heading text-6xl font-semibold tracking-tight text-muted-foreground/40 tabular-nums">
              404
            </p>
            <EmptyTitle className="text-xl">{t.notFound.title}</EmptyTitle>
            <EmptyDescription className="text-sm">
              {t.notFound.description}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row flex-wrap justify-center gap-2">
            <Link href="/" className={buttonVariants()}>
              <ArrowLeftIcon data-icon="inline-start" className="rtl:rotate-180" />
              {t.notFound.home}
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={buttonVariants({ variant: "ghost" })}
              >
                {link.label}
              </Link>
            ))}
          </EmptyContent>
        </Empty>
      </main>
    </SiteLayout>
  );
}

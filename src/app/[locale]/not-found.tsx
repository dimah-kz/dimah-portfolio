import { SiteLayout } from "@/components/layout/site-layout";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Link } from "@/i18n/navigation";
import { navLinks } from "@/lib/links";
import { ArrowLeftIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

/** The 404 of a language, with the header and footer. */
export default function NotFound() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <SiteLayout>
      <title>{t("notFound.title")}</title>
      <meta name="robots" content="noindex" />
      <main id="main" className="flex flex-1 flex-col px-4 py-24">
        <Empty>
          <EmptyHeader>
            <p className="font-heading text-6xl font-semibold tracking-tight text-muted-foreground/40 tabular-nums">
              404
            </p>
            <EmptyTitle className="text-xl">{t("notFound.title")}</EmptyTitle>
            <EmptyDescription className="text-sm">
              {t("notFound.description")}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row flex-wrap justify-center gap-2">
            <Link href="/" className={buttonVariants()}>
              <ArrowLeftIcon
                data-icon="inline-start"
                className="rtl:rotate-180"
              />
              {t("notFound.home")}
            </Link>
            {navLinks(locale).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={buttonVariants({ variant: "ghost" })}
              >
                {t(`nav.${link.key}`)}
              </Link>
            ))}
          </EmptyContent>
        </Empty>
      </main>
    </SiteLayout>
  );
}

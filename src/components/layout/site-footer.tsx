import { Container } from "@/components/layout/section";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { SocialLinks } from "@/components/social-links";
import { Link } from "@/i18n/navigation";
import { localizePath } from "@/i18n/paths";
import { feedPath, llmsPath, navLinks } from "@/lib/links";
import { authorName, site, siteCopy } from "@/lib/site";
import { RssIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

const linkClass = "transition-colors hover:text-foreground";

/** The name and the description, the profiles, then the credits, the pages, and the language switcher. */
export function SiteFooter() {
  const t = useTranslations();
  const locale = useLocale();
  const year = new Date().getUTCFullYear();
  const feed = localizePath(feedPath, locale);

  return (
    <footer className="mt-auto border-t">
      <Container className="flex flex-col gap-8 py-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="shrink-0">
              <Image
                src={site.author.avatar}
                alt={site.name}
                width={36}
                height={36}
                sizes="36px"
                className="size-9 rounded-full ring-1 ring-border"
              />
            </Link>
            <p className="max-w-xs text-sm text-pretty text-muted-foreground">
              {siteCopy(locale).description}
            </p>
          </div>
          <SocialLinks
            extra={[{ label: t("blog.rss"), href: feed, icon: RssIcon }]}
            className="-ms-2 sm:ms-0 sm:-me-2"
          />
        </div>

        <div className="flex flex-col-reverse gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {authorName(locale)}.
            {site.repository ? (
              <>
                {" "}
                <a
                  href={site.repository}
                  className="underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  {t("footer.source")}
                </a>
              </>
            ) : null}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <nav aria-label={t("footer.pages")}>
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {[{ key: "home" as const, href: "/" }, ...navLinks(locale)].map(
                  (link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={linkClass}>
                        {t(`nav.${link.key}`)}
                      </Link>
                    </li>
                  ),
                )}
                <li>
                  <a
                    href={localizePath(llmsPath, locale)}
                    className={linkClass}
                  >
                    llms.txt
                  </a>
                </li>
              </ul>
            </nav>
            <LocaleSwitcher />
          </div>
        </div>
      </Container>
    </footer>
  );
}

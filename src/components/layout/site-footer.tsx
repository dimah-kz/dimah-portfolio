import { Container } from "@/components/layout/section";
import { SocialLinks } from "@/components/social-links";
import { Link } from "@/i18n/navigation";
import { localizePath } from "@/i18n/paths";
import { feedPath, llmsPath, navLinks, profiles } from "@/lib/links";
import { site, siteCopy } from "@/lib/site";
import { RssIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import type { ReactNode } from "react";

const linkClass =
  "text-sm text-muted-foreground transition-colors hover:text-foreground";

function FooterNav({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <nav aria-label={title} className="flex flex-col gap-3">
      <h2 className="text-xs font-medium tracking-wide text-muted-foreground/80 uppercase">
        {title}
      </h2>
      <ul className="flex flex-col gap-2">{children}</ul>
    </nav>
  );
}

export function SiteFooter() {
  const t = useTranslations();
  const locale = useLocale();
  const year = new Date().getUTCFullYear();
  const feed = localizePath(feedPath, locale);

  return (
    <footer className="mt-auto border-t">
      <Container className="grid gap-10 py-12 sm:grid-cols-[1fr_auto_auto_auto] sm:gap-16">
        <div className="flex max-w-xs flex-col gap-4">
          <Link href="/" className="inline-flex w-fit items-center gap-2.5">
            <Image
              src={site.author.avatar}
              alt=""
              width={28}
              height={28}
              sizes="28px"
              className="size-7 rounded-full ring-1 ring-border"
            />
            <span className="font-heading font-semibold tracking-tight">
              {site.name}
            </span>
          </Link>
          <p className="text-sm text-pretty text-muted-foreground">
            {siteCopy(locale).description}
          </p>
          <SocialLinks
            extra={[{ label: t("blog.rss"), href: feed, icon: RssIcon }]}
            className="-ms-2"
          />
        </div>

        <FooterNav title={t("footer.pages")}>
          {[{ key: "home" as const, href: "/" }, ...navLinks(locale)].map(
            (link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {t(`nav.${link.key}`)}
                </Link>
              </li>
            ),
          )}
        </FooterNav>

        {profiles.length > 0 ? (
          <FooterNav title={t("footer.social")}>
            {profiles.map((profile) => (
              <li key={profile.id}>
                <a href={profile.href} className={linkClass}>
                  {t(`profiles.${profile.id}`)}
                </a>
              </li>
            ))}
          </FooterNav>
        ) : null}

        <FooterNav title={t("footer.feeds")}>
          <li>
            <a href={feed} className={linkClass}>
              {t("blog.rss")}
            </a>
          </li>
          <li>
            <a href={localizePath(llmsPath, locale)} className={linkClass}>
              llms.txt
            </a>
          </li>
        </FooterNav>
      </Container>

      <div className="border-t">
        <Container className="flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.author.name}
          </p>
          <p>
            {t("footer.builtWith")}
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
        </Container>
      </div>
    </footer>
  );
}

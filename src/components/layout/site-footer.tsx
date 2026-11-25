import { Container } from "@/components/layout/section";
import { SocialLinks } from "@/components/social-links";
import { t } from "@/lib/i18n";
import { feedLink, navLinks, socialLinks } from "@/lib/links";
import { site } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

const linkClass =
  "text-sm text-muted-foreground transition-colors hover:text-foreground";

export function SiteFooter() {
  const year = new Date().getUTCFullYear();

  return (
    <footer className="mt-auto border-t">
      <Container className="grid gap-10 py-12 sm:grid-cols-[1fr_auto_auto] sm:gap-16">
        <div className="flex max-w-xs flex-col gap-4">
          <Link href="/" className="inline-flex w-fit items-center gap-2.5">
            <Image
              src={site.author.avatarUrl}
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
            {site.description}
          </p>
          <SocialLinks links={[...socialLinks, feedLink]} className="-ms-2" />
        </div>

        <nav aria-label={t.footer.pages} className="flex flex-col gap-3">
          <h2 className="text-xs font-medium tracking-wide text-muted-foreground/80 uppercase">
            {t.footer.pages}
          </h2>
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="/" className={linkClass}>
                {t.nav.home}
              </Link>
            </li>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.footer.social} className="flex flex-col gap-3">
          <h2 className="text-xs font-medium tracking-wide text-muted-foreground/80 uppercase">
            {t.footer.social}
          </h2>
          <ul className="flex flex-col gap-2">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href={feedLink.href} className={linkClass}>
                {t.footer.rss}
              </a>
            </li>
          </ul>
        </nav>
      </Container>

      <div className="border-t">
        <Container className="flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.author.name}
          </p>
          <p>
            {t.footer.builtWith}{" "}
            <a
              href={site.repository.url}
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              {t.footer.source}
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}

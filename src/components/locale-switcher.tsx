"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Locale, localeConfig, locales } from "@/i18n/locales";
import { localizePath, splitLocalePath } from "@/i18n/paths";
import { cn } from "cn";
import { CheckIcon, LanguagesIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

/** Up to this many languages show side by side; more open a menu. */
const inlineLimit = 3;

/** The same pill as the Fumadocs theme switch next to it. */
const pill = "inline-flex items-center rounded-full border p-1";
const segment =
  "inline-flex h-6.5 min-w-8 items-center justify-center gap-1.5 rounded-full px-2 text-[0.8125rem] leading-none font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50";

/**
 * The page's URL in another language. A page names its translations with
 * `<link rel="alternate" hreflang>` (see `pageMeta`), so a post without one
 * leads to that language's home instead of a 404.
 */
function translatedPath(locale: Locale): string {
  const link = document.head.querySelector<HTMLLinkElement>(
    `link[rel="alternate"][hreflang="${locale}"]`,
  );
  return link ? new URL(link.href).pathname : localizePath("/", locale);
}

/**
 * Without JavaScript a language is a plain link to the same path. With it,
 * the click goes to the page's translation, in a full load: a new language
 * changes `<html lang dir>` and the whole tree.
 */
function useLanguageLink(active: Locale) {
  const pathname = usePathname();

  return (locale: Locale) => ({
    href: localizePath(splitLocalePath(pathname).path, locale),
    hrefLang: locale,
    lang: locale,
    "aria-current": locale === active ? ("true" as const) : undefined,
    onClick: (event: MouseEvent) => {
      event.preventDefault();
      if (locale !== active) window.location.assign(translatedPath(locale));
    },
  });
}

/** Each language by its own short name, the current one filled. */
export function LocaleSwitcher() {
  const t = useTranslations("locale");
  const active = useLocale();
  const linkProps = useLanguageLink(active);

  if (locales.length < 2) return null;
  if (locales.length > inlineLimit) return <LocaleMenu />;

  return (
    <nav aria-label={t("label")} className={pill}>
      {locales.map((locale) => (
        <a
          key={locale}
          {...linkProps(locale)}
          title={localeConfig[locale].label}
          className={cn(
            segment,
            locale === active
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {localeConfig[locale].short}
        </a>
      ))}
    </nav>
  );
}

/** For more languages: the current one in the pill, the rest in a menu. */
function LocaleMenu() {
  const t = useTranslations("locale");
  const active = useLocale();
  const linkProps = useLanguageLink(active);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label={t("label")} className={pill}>
        <span className={cn(segment, "text-muted-foreground")}>
          <LanguagesIcon aria-hidden="true" className="size-3.5" />
          {localeConfig[active].short}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t("label")}</DropdownMenuLabel>
          {locales.map((locale) => (
            <DropdownMenuItem
              key={locale}
              render={<a {...linkProps(locale)} />}
            >
              <span className="flex-1">{localeConfig[locale].label}</span>
              {locale === active ? (
                <CheckIcon
                  data-icon="inline-end"
                  className="text-muted-foreground"
                />
              ) : null}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

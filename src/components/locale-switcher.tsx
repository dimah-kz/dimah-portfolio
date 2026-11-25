"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { flags } from "@/i18n/flags";
import { type Locale, localeConfig, locales } from "@/i18n/locales";
import { localizePath, splitLocalePath } from "@/i18n/paths";
import { cn } from "cn";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

function LocaleFlag({ locale }: { locale: Locale }) {
  const Flag = flags[locale];
  return (
    <Flag
      aria-hidden="true"
      data-icon="inline-start"
      className="h-3 w-4.5 shrink-0 overflow-hidden rounded-[2px] ring-1 ring-foreground/10"
    />
  );
}

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
 * The current language's flag and short name, in the same pill as the
 * Fumadocs theme switch; it opens the list of languages. Without JavaScript
 * each item is a plain link to the same path in that language. With it, the
 * click goes to the page's translation, in a full load: a new language
 * changes `<html lang dir>` and the whole tree.
 */
export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("locale");
  const active = useLocale();
  const pathname = usePathname();

  if (locales.length < 2) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("label")}
        className={cn(
          "group inline-flex items-center rounded-full border p-1 outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
          className,
        )}
      >
        <span className="inline-flex h-6.5 items-center gap-1.5 rounded-full ps-1.5 pe-1 text-[0.8125rem] leading-none font-medium text-muted-foreground transition-colors group-hover:text-foreground group-aria-expanded:bg-accent group-aria-expanded:text-accent-foreground">
          <LocaleFlag locale={active} />
          {localeConfig[active].short}
          <ChevronDownIcon
            aria-hidden="true"
            className="size-3.5 opacity-60 transition-transform group-aria-expanded:rotate-180"
          />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        <DropdownMenuGroup>
          {locales.map((locale) => {
            const isActive = locale === active;

            return (
              <DropdownMenuItem
                key={locale}
                render={
                  <a
                    href={localizePath(splitLocalePath(pathname).path, locale)}
                    hrefLang={locale}
                    lang={locale}
                  />
                }
                aria-current={isActive ? "true" : undefined}
                onClick={(event: MouseEvent) => {
                  event.preventDefault();
                  if (!isActive) window.location.assign(translatedPath(locale));
                }}
              >
                <LocaleFlag locale={locale} />
                <span className="flex-1">{localeConfig[locale].label}</span>
                {isActive ? (
                  <CheckIcon
                    data-icon="inline-end"
                    className="text-muted-foreground"
                  />
                ) : null}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * The switcher in the Fumadocs header's language slot (`root`), which sits
 * right next to the theme switch on desktop and in the mobile menu. The slot's
 * own children (an icon and a chevron) are not used.
 */
export function HeaderLocaleSwitcher() {
  return <LocaleSwitcher />;
}

/** The slot's `text`: the switcher already names the language. */
export function HeaderLocaleText() {
  return null;
}

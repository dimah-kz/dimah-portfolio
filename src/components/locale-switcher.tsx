"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { flags } from "@/i18n/flags";
import { type Locale, localeConfig, locales } from "@/i18n/locales";
import { localizePath, splitLocalePath } from "@/i18n/paths";
import { cn } from "cn";
import { CheckIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

function LocaleFlag({ locale }: { locale: Locale }) {
  const Flag = flags[locale];
  return (
    <Flag
      aria-hidden="true"
      data-icon="inline-start"
      className="h-3 w-4.5 shrink-0 overflow-hidden rounded-[2px] ring-1 ring-border"
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

/** A flag and the language's short name; opens the list of languages. */
export function LocaleSwitcher() {
  const t = useTranslations("locale");
  const active = useLocale();
  const pathname = usePathname();

  if (locales.length < 2) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("label")}
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "gap-1.5 px-2 text-xs font-medium",
        )}
      >
        <LocaleFlag locale={active} />
        <span dir="ltr">{localeConfig[active].short}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t("label")}</DropdownMenuLabel>
          {locales.map((locale) => {
            const isActive = locale === active;
            // Without JavaScript the item is a plain link to the same page.
            const href = localizePath(splitLocalePath(pathname).path, locale);

            return (
              <DropdownMenuItem
                key={locale}
                render={<a href={href} hrefLang={locale} lang={locale} />}
                aria-current={isActive ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  // A full load: the new language changes `<html lang dir>` and the whole tree.
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

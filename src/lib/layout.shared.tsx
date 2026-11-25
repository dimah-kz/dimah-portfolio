import { LocaleSwitcher } from "@/components/locale-switcher";
import type { Locale } from "@/i18n/locales";
import { localizePath } from "@/i18n/paths";
import { site } from "@/lib/site";
import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import { headerProfiles, type NavLink, navLinks } from "./links";
import type { ProfileId } from "./site-config";

/** Labels the header reads: `t` from `useTranslations()`. */
type HeaderLabels = (
  key: `nav.${NavLink["key"]}` | `profiles.${ProfileId}`,
) => string;

/** Avatar and name, linked to the language's home by the layout. */
function BrandTitle() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src={site.author.avatar}
        alt=""
        width={28}
        height={28}
        sizes="28px"
        priority
        className="size-7 rounded-full ring-1 ring-border"
      />
      <span className="font-heading text-[0.9375rem] font-semibold tracking-tight">
        {site.name}
      </span>
    </span>
  );
}

/**
 * The header in a language: the name, the pages in `navLinks`, the language
 * switcher, then `headerProfiles` as icons.
 */
export function baseOptions(locale: Locale, t: HeaderLabels): BaseLayoutProps {
  return {
    nav: {
      title: <BrandTitle />,
      url: localizePath("/", locale),
      // Glass: the hero runs under the header. Tint and blur are in `global.css`.
      transparentMode: "always",
    },
    links: [
      ...navLinks(locale).map((link): LinkItemType => ({
        text: t(`nav.${link.key}`),
        url: localizePath(link.href, locale),
        active: "nested-url",
      })),
      { type: "custom", secondary: true, children: <LocaleSwitcher /> },
      ...headerProfiles.map(({ id, href, icon: Icon }): LinkItemType => {
        const label = t(`profiles.${id}`);
        return {
          type: "icon",
          text: label,
          label,
          url: href,
          icon: <Icon />,
          external: true,
        };
      }),
    ],
  };
}

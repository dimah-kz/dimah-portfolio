import { HomeShell } from "@/components/layout/home-shell";
import { SiteFooter } from "@/components/layout/site-footer";
import { baseOptions } from "@/lib/layout.shared";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { useLocale, useTranslations } from "next-intl";
import type { ReactNode } from "react";

/** Header, page, footer, in the page's language. Used by `(home)` and the 404 page. */
export function SiteLayout({ children }: { children: ReactNode }) {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <HomeLayout
      {...baseOptions(locale, t)}
      // The flag switcher in `baseOptions` replaces Fumadocs' language menu.
      slots={{ container: HomeShell, languageSelect: false }}
    >
      {children}
      <SiteFooter />
    </HomeLayout>
  );
}

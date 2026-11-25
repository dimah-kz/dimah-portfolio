import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { defaultLocale, localeConfig } from "@/i18n/locales";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { fontVariables } from "./fonts";
import "./global.css";

export const metadata: Metadata = {
  robots: { index: false },
};

/**
 * The 404 for a URL no route matches, such as a missing file
 * (`experimental.globalNotFound`). It renders outside the `[locale]` layout,
 * so it brings its own document, styles, and fonts, in the default language.
 * A missing page inside a language uses `[locale]/not-found.tsx` instead, with
 * the header and footer.
 */
export default async function GlobalNotFound() {
  const t = await getTranslations({
    locale: defaultLocale,
    namespace: "notFound",
  });

  return (
    <html
      lang={defaultLocale}
      dir={localeConfig[defaultLocale].dir}
      className={fontVariables}
      suppressHydrationWarning
    >
      <body className="flex min-h-svh flex-col bg-background text-foreground antialiased">
        <title>{t("title")}</title>
        <main
          id="main"
          className="flex flex-1 flex-col justify-center px-4 py-24"
        >
          <Empty>
            <EmptyHeader>
              <p className="font-heading text-6xl font-semibold tracking-tight text-muted-foreground/40 tabular-nums">
                404
              </p>
              <EmptyTitle className="text-xl">{t("title")}</EmptyTitle>
              <EmptyDescription className="text-sm">
                {t("description")}
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Link href="/" className={buttonVariants()}>
                {t("home")}
              </Link>
            </EmptyContent>
          </Empty>
        </main>
      </body>
    </html>
  );
}

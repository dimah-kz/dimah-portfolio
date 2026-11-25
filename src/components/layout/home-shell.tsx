"use client";

import { useTranslations } from "next-intl";
import type { ComponentProps } from "react";

/**
 * Container slot for the Fumadocs `HomeLayout`.
 *
 * The default slot is a `<main>` that also wraps the header. This one is a
 * plain wrapper, so each page renders its own `<main id="main">` and the
 * footer stays outside it. `--fd-layout-width` lines the header up with the
 * page content.
 */
export function HomeShell({ children }: ComponentProps<"main">) {
  const t = useTranslations("nav");

  return (
    <div
      id="nd-home-layout"
      className="flex flex-1 flex-col [--fd-layout-width:44rem]"
    >
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-background px-3 py-2 text-sm font-medium ring-2 ring-ring focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        {t("skipToContent")}
      </a>
      {children}
    </div>
  );
}

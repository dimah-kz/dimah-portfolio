import { HomeShell } from "@/components/layout/home-shell";
import { SiteFooter } from "@/components/layout/site-footer";
import { baseOptions } from "@/lib/layout.shared";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import type { ReactNode } from "react";

/** Header, page, footer. Used by `(home)` and by the root 404 page. */
export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout {...baseOptions()} slots={{ container: HomeShell }}>
      {children}
      <SiteFooter />
    </HomeLayout>
  );
}

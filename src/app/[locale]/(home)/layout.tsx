import { localeParam } from "@/i18n/params";
import { SiteLayout } from "@/components/layout/site-layout";
import { setRequestLocale } from "next-intl/server";

export default async function Layout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  setRequestLocale(await localeParam(params));
  return <SiteLayout>{children}</SiteLayout>;
}

import { SiteLayout } from "@/components/layout/site-layout";

export default function Layout({ children }: LayoutProps<"/">) {
  return <SiteLayout>{children}</SiteLayout>;
}

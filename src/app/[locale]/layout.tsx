import { fontVariables } from "@/app/fonts";
import { JsonLd } from "@/components/json-ld";
import { MotionProvider } from "@/components/motion-provider";
import { DirectionProvider } from "@/components/ui/direction";
import { Toaster } from "@/components/ui/toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { fumadocsI18n } from "@/i18n/fumadocs";
import { localeConfig } from "@/i18n/locales";
import { localeParam } from "@/i18n/params";
import { routing } from "@/i18n/routing";
import { findProfile } from "@/lib/links";
import {
  defaultTitle,
  isPreviewDeploy,
  pageMeta,
  siteJsonLd,
  siteKeywords,
} from "@/lib/seo";
import { site, siteCopy } from "@/lib/site";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import "../global.css";

const indexable = !isPreviewDeploy();
const xHandle = findProfile("x")?.handle;

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

/** Every language is built ahead of time; any other first segment is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: LayoutProps<"/[locale]">,
): Promise<Metadata> {
  const locale = await localeParam(props.params);

  return {
    ...pageMeta(locale, "/"),
    metadataBase: new URL(site.url),
    title: {
      default: defaultTitle(locale),
      template: `%s · ${site.name}`,
    },
    description: siteCopy(locale).description,
    applicationName: site.name,
    authors: [{ name: site.author.name, url: site.url }],
    creator: site.author.name,
    publisher: site.name,
    category: "technology",
    keywords: siteKeywords(locale),
    twitter: {
      card: "summary_large_image",
      ...(xHandle ? { site: `@${xHandle}`, creator: `@${xHandle}` } : {}),
    },
    robots: indexable
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : { index: false, follow: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const locale = await localeParam(params);

  // Static rendering: tells next-intl the language without reading headers.
  setRequestLocale(locale);
  const { dir } = localeConfig[locale];

  return (
    <html
      lang={locale}
      dir={dir}
      className={fontVariables}
      suppressHydrationWarning
    >
      <body className="flex min-h-svh flex-col antialiased">
        <JsonLd data={siteJsonLd(locale)} />
        <NextIntlClientProvider>
          <DirectionProvider direction={dir}>
            <TooltipProvider>
              <RootProvider
                dir={dir}
                i18n={fumadocsI18n(locale)}
                search={{ enabled: false }}
              >
                <MotionProvider>
                  {children}
                  <Toaster />
                </MotionProvider>
              </RootProvider>
            </TooltipProvider>
          </DirectionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

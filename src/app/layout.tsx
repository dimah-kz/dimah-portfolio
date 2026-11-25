import { JsonLd } from "@/components/json-ld";
import { fumadocsI18n } from "@/lib/i18n";
import { DirectionProvider } from "@/components/ui/direction";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toast";
import {
  defaultTitle,
  isPreviewDeploy,
  ogImage,
  ogImages,
  ogLocale,
  siteJsonLd,
  siteKeywords,
} from "@/lib/seo";
import { site } from "@/lib/site";
import { cn } from "cn";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import "./global.css";

const fontLatin = Inter({
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap",
});

const fontArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

const indexable = !isPreviewDeploy();

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author.name, url: site.author.githubUrl }],
  creator: `@${site.author.x}`,
  publisher: site.name,
  category: "technology",
  keywords: [...siteKeywords],
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: ogLocale,
    url: "/",
    siteName: site.name,
    title: defaultTitle,
    description: site.description,
    images: ogImages(ogImage.page("home"), defaultTitle),
  },
  twitter: {
    card: "summary_large_image",
    site: `@${site.author.x}`,
    creator: `@${site.author.x}`,
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

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={site.locale}
      dir={site.direction}
      className={cn(fontLatin.variable, fontArabic.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-svh flex-col antialiased">
        <JsonLd data={siteJsonLd()} />
        <DirectionProvider direction={site.direction}>
          <TooltipProvider>
            <RootProvider dir={site.direction} i18n={fumadocsI18n}>
              {children}
              <Toaster />
            </RootProvider>
          </TooltipProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}

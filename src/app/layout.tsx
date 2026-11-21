import { JsonLd } from "@/components/json-ld";
import { DirectionProvider } from "@/components/ui/direction";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toast";
import {
  defaultTitle,
  isPreviewDeploy,
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
});

const fontArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
});

const indexable = !isPreviewDeploy();

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#171717" },
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
    images: {
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: defaultTitle,
    },
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
      <body className="flex min-h-screen flex-col">
        <JsonLd data={siteJsonLd()} />
        <DirectionProvider direction={site.direction}>
          <TooltipProvider>
            <RootProvider dir={site.direction}>
              {children}
              <Toaster />
            </RootProvider>
          </TooltipProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}

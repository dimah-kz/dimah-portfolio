import { DirectionProvider } from '@/components/ui/direction';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toast';
import { site } from '@/lib/site';
import { cn } from 'cn';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import { Inter, Noto_Sans_Arabic } from 'next/font/google';
import './global.css';

const fontLatin = Inter({
  subsets: ['latin'],
  variable: '--font-latin',
});

const fontArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang={site.locale}
      dir={site.direction}
      className={cn(fontLatin.variable, fontArabic.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
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

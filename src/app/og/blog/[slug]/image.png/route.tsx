import { siteOgImage } from '@/lib/og';
import { blogSource } from '@/lib/source';
import { notFound } from 'next/navigation';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/og/blog/[slug]/image.png'>) {
  const { slug } = await params;
  const page = blogSource.getPage([slug]);
  if (!page) notFound();

  return siteOgImage(page.data.title, page.data.description);
}

export function generateStaticParams() {
  return blogSource.getPages().flatMap((page) => {
    const slug = page.slugs[0];
    return slug ? [{ slug }] : [];
  });
}

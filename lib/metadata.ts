import type { Metadata } from 'next';
import { site } from '@/content/site';

export function pageMetadata({ title, description, path, image }: { title: string; description: string; path: string; image?: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      type: 'website',
      ...(image ? { images: [{ url: image, width: 1200, height: 800, alt: '' }] } : {}),
    },
  };
}

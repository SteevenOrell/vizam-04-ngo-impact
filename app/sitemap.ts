import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { campaigns } from '@/content/campaigns';
import { newsItems } from '@/content/news';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, '');
  const staticRoutes = ['', '/about', '/mission', '/programs', '/campaigns', '/impact', '/news', '/volunteer', '/contact'];
  return [
    ...staticRoutes.map((r) => ({ url: `${base}${r}`, changeFrequency: 'monthly' as const, priority: r === '' ? 1 : 0.7 })),
    ...campaigns.map((c) => ({ url: `${base}/campaigns/${c.slug}`, changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...newsItems.map((n) => ({ url: `${base}/news/${n.slug}`, lastModified: n.date, changeFrequency: 'yearly' as const, priority: 0.4 })),
  ];
}

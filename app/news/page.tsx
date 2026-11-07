import Link from 'next/link';
import { Container } from '@/components/ui/primitives';
import { PageHero } from '@/components/sections/PageHero';
import { NewsCard } from '@/components/news/NewsCard';
import { Pagination } from '@/components/ui/Pagination';
import { newsItems } from '@/content/news';
import { NEWS_TYPES } from '@/content/types';
import { buildQuery, filterNews, NEWS_PER_PAGE, paginate, parseNewsQuery, type SearchParams } from '@/lib/filters';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'News & Events',
  description: 'News, field stories and upcoming events from Weftline Collective, a fictional organization (VIZAM concept project).',
  path: '/news',
});

const tabLabels = { all: 'All', news: 'News', event: 'Events', story: 'Field stories' } as const;

export default async function NewsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const query = parseNewsQuery(await searchParams);
  const filtered = filterNews(newsItems, query);
  const { items, page, totalPages, total } = paginate(filtered, query.page, NEWS_PER_PAGE);

  return (
    <>
      <PageHero
        eyebrow="News & events"
        title="Notes from"
        titleMuted="the loom."
        lede={<p>Updates, field stories and events you can join, in person or online. All fictional, for a concept site.</p>}
      />

      <Container className="pb-24 md:pb-32">
        <nav aria-label="Filter by type">
          <ul className="flex flex-wrap gap-2">
            {(['all', ...NEWS_TYPES] as const).map((t) => {
              const active = (t === 'all' && !query.type) || t === query.type;
              return (
                <li key={t}>
                  <Link
                    href={`/news${buildQuery({ type: t === 'all' ? undefined : t })}`}
                    aria-current={active ? 'page' : undefined}
                    scroll={false}
                    className={`inline-flex min-h-11 items-center rounded-full border px-5 font-medium ${
                      active ? 'border-accent bg-accent text-white' : 'border-rule hover:border-ink'
                    }`}
                  >
                    {tabLabels[t]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <p aria-live="polite" role="status" className="mt-8 font-medium">
          {total === 0 ? 'Nothing here yet.' : `Showing ${items.length} of ${total} item${total === 1 ? '' : 's'}${totalPages > 1 ? `, page ${page} of ${totalPages}` : ''}.`}
        </p>

        <ul className="mt-6 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" data-testid="news-grid">
          {items.map((n) => (
            <li key={n.slug} className="h-full">
              <NewsCard item={n} headingLevel="h2" />
            </li>
          ))}
        </ul>

        <Pagination basePath="/news" page={page} totalPages={totalPages} params={{ type: query.type }} label="News pages" />
      </Container>
    </>
  );
}

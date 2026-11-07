import { Container, IllustrativeNote } from '@/components/ui/primitives';
import { PageHero } from '@/components/sections/PageHero';
import { CampaignCard } from '@/components/campaigns/CampaignCard';
import { CampaignFilters } from '@/components/campaigns/CampaignFilters';
import { Pagination } from '@/components/ui/Pagination';
import { campaigns } from '@/content/campaigns';
import { CAMPAIGNS_PER_PAGE, filterCampaigns, paginate, parseCampaignQuery, type SearchParams } from '@/lib/filters';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Campaigns',
  description: 'Browse Weftline campaigns by theme, region and status. All figures are illustrative for a fictional organization.',
  path: '/campaigns',
});

export default async function CampaignsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const query = parseCampaignQuery(await searchParams);
  const filtered = filterCampaigns(campaigns, query);
  const { items, page, totalPages, total } = paginate(filtered, query.page, CAMPAIGNS_PER_PAGE);
  const params = { theme: query.theme, region: query.region, status: query.status, q: query.q };

  return (
    <>
      <PageHero
        eyebrow="Campaigns"
        title="Every campaign was asked for"
        titleMuted="by the people who run it."
        lede={
          <>
            <p>Filter by theme, region or status. Each page shows the plan, the open tool behind it and progress so far.</p>
            <IllustrativeNote className="mt-5" />
          </>
        }
      />

      <Container className="pb-24 md:pb-32">
        <CampaignFilters values={params} />

        <p aria-live="polite" role="status" className="mt-8 font-medium" id="campaign-count">
          {total === 0
            ? 'No campaigns match these filters.'
            : `Showing ${items.length} of ${total} campaign${total === 1 ? '' : 's'}${totalPages > 1 ? `, page ${page} of ${totalPages}` : ''}.`}
        </p>

        {items.length > 0 ? (
          <ul className="mt-6 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" data-testid="campaign-grid">
            {items.map((c) => (
              <li key={c.slug} className="h-full">
                <CampaignCard campaign={c} headingLevel="h2" />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 rounded-[var(--radius-card)] bg-band p-10 text-center">
            <p className="font-display text-2xl">Nothing on this thread yet.</p>
            <p className="mt-2 text-ink-soft">Try another theme or region, or clear the filters.</p>
          </div>
        )}

        <Pagination basePath="/campaigns" page={page} totalPages={totalPages} params={params} label="Campaign pages" />
      </Container>
    </>
  );
}

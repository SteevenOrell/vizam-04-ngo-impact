import { describe, expect, it } from 'vitest';
import { buildQuery, filterCampaigns, filterNews, paginate, parseCampaignQuery, parseNewsQuery } from '@/lib/filters';
import { campaigns, fundedPercent } from '@/content/campaigns';
import { newsItems } from '@/content/news';

describe('parseCampaignQuery', () => {
  it('keeps only known values and defaults the page to 1', () => {
    expect(parseCampaignQuery({ theme: 'water', region: 'mars', status: 'active', page: 'abc' })).toEqual({
      theme: 'water',
      region: undefined,
      status: 'active',
      q: undefined,
      page: 1,
    });
  });

  it('takes the first value of repeated params and trims/limits the search text', () => {
    const q = parseCampaignQuery({ theme: ['climate', 'water'], q: `  ${'a'.repeat(200)}  `, page: '2' });
    expect(q.theme).toBe('climate');
    expect(q.q).toHaveLength(80);
    expect(q.page).toBe(2);
  });
});

describe('filterCampaigns', () => {
  it('filters by theme, region and status together', () => {
    const r = filterCampaigns(campaigns, { theme: 'digital', region: 'tamsin-delta', status: 'active' });
    expect(r.map((c) => c.slug)).toEqual(['tamsin-community-flood-maps']);
  });

  it('searches title, summary and tool case-insensitively', () => {
    expect(filterCampaigns(campaigns, { q: 'MANGROVE' }).map((c) => c.slug)).toContain('kestrel-coast-mangrove-belt');
    expect(filterCampaigns(campaigns, { q: 'no-such-thing' })).toHaveLength(0);
  });

  it('lists active campaigns before upcoming and completed ones', () => {
    const order = filterCampaigns(campaigns, {}).map((c) => c.status);
    const rank = { active: 0, upcoming: 1, completed: 2 };
    expect(order.map((s) => rank[s])).toEqual([...order.map((s) => rank[s])].sort());
  });
});

describe('news', () => {
  it('filters by type and sorts newest first', () => {
    const events = filterNews(newsItems, parseNewsQuery({ type: 'event' }));
    expect(events.every((n) => n.type === 'event')).toBe(true);
    expect(events.map((e) => e.date)).toEqual([...events.map((e) => e.date)].sort().reverse());
  });
});

describe('paginate', () => {
  const list = Array.from({ length: 10 }, (_, i) => i);
  it('splits into pages and clamps out-of-range pages', () => {
    expect(paginate(list, 1, 6)).toMatchObject({ items: [0, 1, 2, 3, 4, 5], page: 1, totalPages: 2, total: 10 });
    expect(paginate(list, 9, 6)).toMatchObject({ items: [6, 7, 8, 9], page: 2 });
    expect(paginate([], 3, 6)).toMatchObject({ items: [], page: 1, totalPages: 1 });
  });
});

describe('buildQuery', () => {
  it('drops empty values and page 1', () => {
    expect(buildQuery({ theme: 'water', q: '', page: 1 })).toBe('?theme=water');
    expect(buildQuery({ page: 2, q: 'solar light' })).toBe('?page=2&q=solar+light');
    expect(buildQuery({})).toBe('');
  });
});

describe('content integrity', () => {
  it('has unique slugs and sane illustrative amounts', () => {
    expect(new Set(campaigns.map((c) => c.slug)).size).toBe(campaigns.length);
    expect(new Set(newsItems.map((n) => n.slug)).size).toBe(newsItems.length);
    for (const c of campaigns) {
      expect(c.raised).toBeLessThanOrEqual(c.goal);
      expect(fundedPercent(c)).toBeGreaterThanOrEqual(0);
      expect(fundedPercent(c)).toBeLessThanOrEqual(100);
      if (c.status === 'completed') expect(fundedPercent(c)).toBe(100);
    }
  });
});

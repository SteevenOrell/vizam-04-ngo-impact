import { CAMPAIGN_STATUSES, NEWS_TYPES, REGIONS, THEMES } from '@/content/types';
import type { Campaign, CampaignStatus, NewsItem, NewsType, Region, Theme } from '@/content/types';

export type SearchParams = Record<string, string | string[] | undefined>;

export const CAMPAIGNS_PER_PAGE = 6;
export const NEWS_PER_PAGE = 6;

function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

function pick<T extends string>(allowed: readonly T[], v: string | undefined): T | undefined {
  return v && (allowed as readonly string[]).includes(v) ? (v as T) : undefined;
}

function parsePage(v: string | undefined) {
  const n = Number.parseInt(v ?? '', 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

export type CampaignQuery = { theme?: Theme; region?: Region; status?: CampaignStatus; q?: string; page: number };

export function parseCampaignQuery(sp: SearchParams): CampaignQuery {
  const q = first(sp.q)?.trim().slice(0, 80);
  return {
    theme: pick(THEMES, first(sp.theme)),
    region: pick(REGIONS, first(sp.region)),
    status: pick(CAMPAIGN_STATUSES, first(sp.status)),
    q: q ? q : undefined,
    page: parsePage(first(sp.page)),
  };
}

const statusOrder: Record<CampaignStatus, number> = { active: 0, upcoming: 1, completed: 2 };

export function filterCampaigns(list: Campaign[], query: Omit<CampaignQuery, 'page'>) {
  const needle = query.q?.toLowerCase();
  return list
    .filter((c) => !query.theme || c.theme === query.theme)
    .filter((c) => !query.region || c.region === query.region)
    .filter((c) => !query.status || c.status === query.status)
    .filter((c) => !needle || `${c.title} ${c.summary} ${c.digitalTool}`.toLowerCase().includes(needle))
    .sort((a, b) => statusOrder[a.status] - statusOrder[b.status] || b.startDate.localeCompare(a.startDate));
}

export type NewsQuery = { type?: NewsType; page: number };

export function parseNewsQuery(sp: SearchParams): NewsQuery {
  return { type: pick(NEWS_TYPES, first(sp.type)), page: parsePage(first(sp.page)) };
}

export function filterNews(list: NewsItem[], query: Omit<NewsQuery, 'page'>) {
  return list.filter((n) => !query.type || n.type === query.type).sort((a, b) => b.date.localeCompare(a.date));
}

export function paginate<T>(items: T[], page: number, perPage: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * perPage;
  return { items: items.slice(start, start + perPage), page: current, totalPages, total: items.length };
}

/** Builds a query string from defined values, dropping empties and page=1. */
export function buildQuery(params: Record<string, string | number | undefined>) {
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === '' || (k === 'page' && Number(v) === 1)) continue;
    usp.set(k, String(v));
  }
  const s = usp.toString();
  return s ? `?${s}` : '';
}

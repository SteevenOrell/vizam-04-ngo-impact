'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { CAMPAIGN_STATUSES, REGIONS, THEMES } from '@/content/types';
import { regionLabels, statusLabels, themeLabels } from '@/content/site';
import { buildQuery } from '@/lib/filters';

type Values = { theme?: string; region?: string; status?: string; q?: string };

/**
 * Progressive enhancement: a plain GET form that works without JavaScript; with JavaScript, selects apply
 * immediately and the search box applies after a short pause.
 */
export function CampaignFilters({ values }: { values: Values }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [q, setQ] = useState(values.q ?? '');
  const [theme, setTheme] = useState(values.theme ?? '');
  const [region, setRegion] = useState(values.region ?? '');
  const [status, setStatus] = useState(values.status ?? '');
  const serialised = JSON.stringify(values);
  const [prev, setPrev] = useState(serialised);
  // Keep the controls in sync when the URL changes (back/forward, "clear all").
  if (prev !== serialised) {
    setPrev(serialised);
    setTheme(values.theme ?? '');
    setRegion(values.region ?? '');
    setStatus(values.status ?? '');
    // Do not overwrite what someone is still typing in the search box.
    const typing = typeof document !== 'undefined' && document.activeElement?.id === 'filter-q';
    if (!typing && (values.q ?? '') !== q.trim()) setQ(values.q ?? '');
  }
  const formRef = useRef<HTMLFormElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function apply(overrides: Values = {}) {
    const form = formRef.current;
    if (!form) return;
    const data = new FormData(form);
    const next = {
      theme: (data.get('theme') as string) || undefined,
      region: (data.get('region') as string) || undefined,
      status: (data.get('status') as string) || undefined,
      q: ((data.get('q') as string) || '').trim() || undefined,
      ...overrides,
    };
    startTransition(() => router.replace(`/campaigns${buildQuery(next)}`, { scroll: false }));
  }

  useEffect(() => () => clearTimeout(timer.current), []);

  const hasFilters = Boolean(values.theme || values.region || values.status || values.q);
  const select =
    'min-h-12 w-full appearance-none rounded-[var(--radius-md)] border-2 border-ink/70 bg-white bg-[length:16px] bg-[right_0.75rem_center] bg-no-repeat px-3 pr-9 font-bold';
  const chevron = {
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2316193a' stroke-width='2.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
  };

  return (
    <form
      ref={formRef}
      method="get"
      action="/campaigns"
      role="search"
      aria-label="Filter campaigns"
      className="rounded-[var(--radius-md)] border border-rule bg-loom-deep/60 p-4 sm:p-5"
      onSubmit={(e) => {
        e.preventDefault();
        clearTimeout(timer.current);
        apply();
      }}
    >
      <p className="mb-4 flex items-center gap-2 font-bold">
        <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
        Filter campaigns
        {pending && <span className="text-sm font-normal text-ink-soft">Updating…</span>}
      </p>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <label htmlFor="filter-q" className="mb-1.5 block text-sm font-bold">
            Search
          </label>
          <div className="relative">
            <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
            <input
              id="filter-q"
              name="q"
              type="search"
              value={q}
              maxLength={80}
              autoComplete="off"
              placeholder="e.g. mangrove, ledger"
              onChange={(e) => {
                const v = e.target.value;
                setQ(v);
                clearTimeout(timer.current);
                timer.current = setTimeout(() => apply({ q: v.trim() || undefined }), 400);
              }}
              className="min-h-12 w-full rounded-[var(--radius-md)] border-2 border-ink/70 bg-white pl-9 pr-3 placeholder:text-ink-soft"
            />
          </div>
        </div>
        <div>
          <label htmlFor="filter-theme" className="mb-1.5 block text-sm font-bold">
            Theme
          </label>
          <select id="filter-theme" name="theme" value={theme} onChange={(e) => { setTheme(e.target.value); apply({ theme: e.target.value || undefined }); }} className={select} style={chevron}>
            <option value="">All themes</option>
            {THEMES.map((t) => (
              <option key={t} value={t}>
                {themeLabels[t]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filter-region" className="mb-1.5 block text-sm font-bold">
            Region
          </label>
          <select id="filter-region" name="region" value={region} onChange={(e) => { setRegion(e.target.value); apply({ region: e.target.value || undefined }); }} className={select} style={chevron}>
            <option value="">All regions</option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {regionLabels[r]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filter-status" className="mb-1.5 block text-sm font-bold">
            Status
          </label>
          <select id="filter-status" name="status" value={status} onChange={(e) => { setStatus(e.target.value); apply({ status: e.target.value || undefined }); }} className={select} style={chevron}>
            <option value="">Any status</option>
            {CAMPAIGN_STATUSES.map((s) => (
              <option key={s} value={s}>
                {statusLabels[s]}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="submit" className="inline-flex min-h-11 items-center rounded-[var(--radius-md)] bg-ink px-4 font-bold text-loom hover:bg-indigo">
          Apply filters
        </button>
        {hasFilters && (
          <Link
            href="/campaigns"
            scroll={false}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-[var(--radius-md)] px-2 font-bold underline decoration-madder decoration-2 underline-offset-4"
          >
            <X aria-hidden="true" className="h-4 w-4" />
            Clear all filters
          </Link>
        )}
      </div>
    </form>
  );
}

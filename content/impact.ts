import type { ImpactStat, Theme } from './types';

// Every figure in this file is an illustrative figure for a fictional organization.

export const headlineStats: ImpactStat[] = [
  { id: 'communities', value: '146', label: 'communities working with us', note: 'Communities with an active partnership agreement in 2026.' },
  { id: 'water', value: '38,000', label: 'people with a closer safe water point', note: 'Estimated from household counts kept by water committees.', theme: 'water' },
  { id: 'handover', value: '81%', label: 'projects run fully by communities after three years', note: 'Share of projects started 2019–2023 with no Weftline staff role today.' },
  { id: 'open-tools', value: '4', label: 'open-source tools maintained locally', note: 'Tapline, Shelf, Open Market Ledger and Tideline Maps.', theme: 'digital' },
];

export const themeResults: { theme: Theme; value: string; label: string }[] = [
  { theme: 'water', value: '212', label: 'water points built and still working' },
  { theme: 'learning', value: '27', label: 'reading rooms open after funding ended' },
  { theme: 'livelihoods', value: '64', label: 'cooperatives with shared, open books' },
  { theme: 'climate', value: '410k', label: 'mangrove and native trees surviving at 24 months' },
  { theme: 'digital', value: '93', label: 'local maintainers trained' },
];

/** Where each dollar went (illustrative). Percentages sum to 100. */
export const spending = [
  { id: 'programmes', label: 'Community programmes', percent: 82 },
  { id: 'tools', label: 'Open digital tools', percent: 6 },
  { id: 'fundraising', label: 'Fundraising', percent: 7 },
  { id: 'admin', label: 'Administration and audit', percent: 5 },
] as const;

export const yearlyHandover = [
  { year: '2021', percent: 64 },
  { year: '2022', percent: 70 },
  { year: '2023', percent: 74 },
  { year: '2024', percent: 78 },
  { year: '2025', percent: 81 },
] as const;

export const measurementPrinciples = [
  { title: 'Counted by communities', text: 'Water committees, cooperatives and nursery teams keep the records; we audit samples rather than replace them.' },
  { title: 'Counted late', text: 'Trees are counted at 24 months, not at planting. Water points are counted only if they still work.' },
  { title: 'Failures published', text: 'Projects that stall are listed with the reason, next to those that succeed.' },
];

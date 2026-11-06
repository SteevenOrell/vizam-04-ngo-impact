import type { Region, Theme } from './types';

export const site = {
  name: 'Weftline Collective',
  shortName: 'Weftline',
  tagline: 'We are the crossing thread.',
  description:
    'Weftline Collective is a fictional community-led nonprofit (a VIZAM concept project) working on water, learning, livelihoods and climate resilience, woven together with practical digital tools.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://weftline.example',
  email: 'hello@weftline.example',
  press: 'press@weftline.example',
  /** Fictional address; the .example domain and the place are not real. */
  address: ['Weftline Collective (fictional)', '14 Loom Yard, Saren Valley'],
  conceptNotice: 'VIZAM concept project — fictional organization.',
  illustrativeNotice: 'Illustrative figures for a fictional organization.',
  demoDonationNotice: 'Demo — no money is taken.',
} as const;

export const navItems = [
  { href: '/about', label: 'About' },
  { href: '/mission', label: 'Our Mission' },
  { href: '/programs', label: 'Programs' },
  { href: '/campaigns', label: 'Campaigns' },
  { href: '/impact', label: 'Impact' },
  { href: '/news', label: 'News & Events' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/contact', label: 'Contact' },
] as const;

export const themeLabels: Record<Theme, string> = {
  water: 'Water',
  learning: 'Learning',
  livelihoods: 'Livelihoods',
  climate: 'Climate resilience',
  digital: 'Digital commons',
};

export const regionLabels: Record<Region, string> = {
  'saren-valley': 'Saren Valley',
  'kestrel-coast': 'Kestrel Coast',
  'ombra-highlands': 'Ombra Highlands',
  'tamsin-delta': 'Tamsin Delta',
  'lowmere-plains': 'Lowmere Plains',
};

export const statusLabels = {
  active: 'Active',
  upcoming: 'Upcoming',
  completed: 'Completed',
} as const;

export const newsTypeLabels = {
  news: 'News',
  event: 'Event',
  story: 'Field story',
} as const;

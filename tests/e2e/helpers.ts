import type { Page } from '@playwright/test';

export const ROUTES = [
  '/',
  '/about',
  '/mission',
  '/programs',
  '/campaigns',
  '/campaigns/twelve-taps-saren-valley',
  '/impact',
  '/news',
  '/news/mangrove-planting-weekend',
  '/volunteer',
  '/donate',
  '/contact',
];

/** Gives each test its own client IP so the in-memory rate limit never makes reruns flaky. */
export async function freshClient(page: Page) {
  const octet = () => Math.floor(Math.random() * 254) + 1;
  await page.setExtraHTTPHeaders({ 'x-forwarded-for': `198.51.${octet()}.${octet()}` });
}

/** Navigate and wait until the page is hydrated (no pending network), so interactions reach React handlers. */
export async function gotoReady(page: Page, url: string) {
  await page.goto(url, { waitUntil: 'networkidle' });
}

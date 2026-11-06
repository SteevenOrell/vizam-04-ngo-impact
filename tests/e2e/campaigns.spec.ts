import { expect, test } from '@playwright/test';
import { gotoReady } from './helpers';

test('campaign directory filters by theme and updates the URL', async ({ page }) => {
  await gotoReady(page, '/campaigns');
  const grid = page.getByTestId('campaign-grid');
  await expect(grid.locator(':scope > li')).toHaveCount(6);
  await expect(page.locator('#campaign-count')).toContainText('of 10 campaigns, page 1 of 2');

  await page.getByLabel('Theme').selectOption('digital');
  await expect(page).toHaveURL(/theme=digital/);
  await expect(page.locator('#campaign-count')).toContainText('Showing 3 of 3 campaigns');
  await expect(grid.getByRole('heading', { name: 'Community Flood Maps' })).toBeVisible();

  await page.getByLabel('Status').selectOption('upcoming');
  await expect(page).toHaveURL(/status=upcoming/);
  await expect(page.locator('#campaign-count')).toContainText('Showing 1 of 1 campaign');

  await page.getByRole('link', { name: 'Clear all filters' }).click();
  await expect(page).toHaveURL(/\/campaigns$/);
  await expect(page.getByLabel('Theme')).toHaveValue('');
});

test('campaign search and empty state', async ({ page }) => {
  await gotoReady(page, '/campaigns');
  await page.getByLabel('Search').fill('mangrove');
  await expect(page).toHaveURL(/q=mangrove/);
  await expect(page.getByTestId('campaign-grid').locator(':scope > li')).toHaveCount(1);
  await gotoReady(page, '/campaigns?q=zzzz');
  await expect(page.getByText('No campaigns match these filters.')).toBeVisible();
});

test('filters work without JavaScript (plain GET form)', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await gotoReady(page, '/campaigns');
  await page.getByLabel('Region').selectOption('kestrel-coast');
  await page.getByRole('button', { name: 'Apply filters' }).click();
  await expect(page).toHaveURL(/region=kestrel-coast/);
  await expect(page.getByTestId('campaign-grid').locator(':scope > li')).toHaveCount(2);
  await context.close();
});

test('pagination moves between pages and marks the current page', async ({ page }) => {
  await gotoReady(page, '/campaigns');
  const pager = page.getByRole('navigation', { name: 'Campaign pages' });
  await pager.getByRole('link', { name: 'Next page' }).click();
  await expect(page).toHaveURL(/page=2/);
  await expect(page.getByTestId('campaign-grid').locator(':scope > li')).toHaveCount(4);
  await expect(pager.getByRole('link', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page');

  await gotoReady(page, '/news');
  const newsPager = page.getByRole('navigation', { name: 'News pages' });
  await newsPager.getByRole('link', { name: 'Page 2' }).click();
  await expect(page).toHaveURL(/news\?page=2/);
  await expect(page.getByTestId('news-grid').locator(':scope > li')).toHaveCount(6);
});

test('campaign detail page shows progress, milestones and a demo donate link', async ({ page }) => {
  await gotoReady(page, '/campaigns');
  await page.getByRole('link', { name: 'Twelve Taps for the Saren Valley' }).click();
  await expect(page).toHaveURL(/\/campaigns\/twelve-taps-saren-valley$/);
  await expect(page.getByRole('progressbar').first()).toHaveAttribute('aria-valuenow', '65');
  await expect(page.getByRole('heading', { name: 'Milestones' })).toBeVisible();
  await page.getByRole('link', { name: 'Give to this campaign (demo)' }).click();
  await expect(page).toHaveURL(/donate\?campaign=twelve-taps-saren-valley/);
  await expect(page.getByLabel('3. Where should it go?')).toHaveValue('twelve-taps-saren-valley');
});

test('news filter tabs', async ({ page }) => {
  await gotoReady(page, '/news');
  await page.getByRole('navigation', { name: 'Filter by type' }).getByRole('link', { name: 'Events' }).click();
  await expect(page).toHaveURL(/type=event/);
  const items = page.getByTestId('news-grid').locator(':scope > li');
  await expect(items).toHaveCount(4);
  await expect(items.first()).toContainText('Event');
});

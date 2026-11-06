import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { ROUTES } from './helpers';

test.use({ contextOptions: { reducedMotion: 'reduce' } });

for (const route of ROUTES) {
  test(`page ${route} renders with one h1, labels and no axe violations`, async ({ page }) => {
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page).toHaveTitle(/Weftline/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('footer')).toContainText('VIZAM concept project — fictional organization');

    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(' ')).slice(0, 5).join(' | ')}`);
    expect(summary, summary.join('\n')).toEqual([]);
  });
}

test('404 page is shown for unknown routes and campaigns', async ({ page }) => {
  for (const url of ['/no-such-page', '/campaigns/no-such-campaign']) {
    const res = await page.goto(url);
    expect(res?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/does not lead anywhere/);
  }
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
});

test('impact figures are labelled illustrative', async ({ page }) => {
  for (const route of ['/', '/impact', '/campaigns', '/campaigns/kestrel-coast-mangrove-belt']) {
    await page.goto(route);
    await expect(page.getByText('Illustrative figures for a fictional organization.').first()).toBeVisible();
  }
});

test('security headers are sent', async ({ request }) => {
  const res = await request.get('/');
  const h = res.headers();
  expect(h['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(h['x-content-type-options']).toBe('nosniff');
  expect(h['referrer-policy']).toBe('strict-origin-when-cross-origin');
  expect(h['x-powered-by']).toBeUndefined();
});

test('sitemap and robots are served', async ({ request }) => {
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain('/campaigns/twelve-taps-saren-valley');
  const robots = await request.get('/robots.txt');
  expect(await robots.text()).toContain('Disallow: /donate');
});

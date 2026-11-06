import { expect, test } from '@playwright/test';
import { ROUTES, gotoReady } from './helpers';

test('no horizontal scroll from 300 px up', async ({ page }) => {
  test.setTimeout(240_000); // 5 widths x every route
  for (const width of [300, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ROUTES) {
      await gotoReady(page, route);
      const { sw, cw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
      expect(sw, `${route} at ${width}px`).toBeLessThanOrEqual(cw);
    }
  }
});

test('below 250 px the layout locks at 500 px and pans horizontally', async ({ page }) => {
  await page.setViewportSize({ width: 240, height: 800 });
  await gotoReady(page, '/');
  const m = await page.evaluate(() => ({
    root: document.getElementById('root')!.getBoundingClientRect().width,
    sw: document.documentElement.scrollWidth,
    overflowX: getComputedStyle(document.documentElement).overflowX,
  }));
  expect(m.root).toBe(500);
  expect(m.sw).toBe(500);
  expect(m.overflowX).toBe('auto');

  await page.getByRole('button', { name: 'Menu' }).click();
  const menu = await page.locator('#mobile-menu').evaluate((el) => {
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return { width: r.width, left: r.left, position: s.position, contentWidth: el.scrollWidth, innerWidth: el.querySelector('.menu-inner')!.getBoundingClientRect().width };
  });
  // The overlay stays viewport-wide and pans inside: its 500 px content keeps the Close button reachable.
  expect(menu).toMatchObject({ width: 240, left: 0, position: 'fixed', contentWidth: 500, innerWidth: 500 });

  // Panning works: the page can scroll sideways.
  await page.keyboard.press('Escape');
  await page.evaluate(() => window.scrollTo(200, 0));
  expect(await page.evaluate(() => window.scrollX)).toBeGreaterThan(0);
});

test('cards in a grid row have equal heights', async ({ page }) => {
  for (const [route, testId] of [
    ['/campaigns', 'campaign-grid'],
    ['/news', 'news-grid'],
  ] as const) {
    for (const width of [768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await gotoReady(page, route);
      const rows = await page.getByTestId(testId).evaluate((ul) => {
        const map = new Map<number, number[]>();
        for (const li of Array.from(ul.children)) {
          const card = li.firstElementChild!.getBoundingClientRect();
          const top = Math.round(li.getBoundingClientRect().top);
          map.set(top, [...(map.get(top) ?? []), Math.round(card.height)]);
        }
        return [...map.values()];
      });
      for (const heights of rows) expect(Math.max(...heights) - Math.min(...heights), `${route} ${width}px ${heights}`).toBeLessThanOrEqual(1);
    }
  }
});

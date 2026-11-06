// Full-page screenshots at 240 / 390 / 768 / 1440 px plus layout checks, against a running server.
// Usage: BASE_URL=http://127.0.0.1:3104 node scripts/screenshots.mjs [--out screenshots-raw] [--routes /,/about]
import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};

const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:3104';
const OUT = opt('out', 'screenshots-raw');
const WIDTHS = [240, 390, 768, 1440];
const ROUTES = opt('routes', '/,/about,/mission,/programs,/campaigns,/campaigns/twelve-taps-saren-valley,/impact,/news,/volunteer,/donate,/contact,/this-page-does-not-exist').split(',');

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const report = [];

function slug(route) {
  return route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '_');
}

for (const width of WIDTHS) {
  const context = await browser.newContext({ viewport: { width, height: width < 768 ? 844 : 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    // Scroll through so scroll-triggered reveals and lazy images run, then return to the top.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.7;
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(900);
    const metrics = await page.evaluate(() => {
      const de = document.documentElement;
      const root = document.getElementById('root');
      // Equal-size cards: within each grid list, compare card heights.
      const grids = Array.from(document.querySelectorAll('ul.grid, ol.grid'));
      const unequal = [];
      for (const g of grids) {
        const items = Array.from(g.children).filter((c) => c.getBoundingClientRect().height > 0);
        const rows = new Map();
        for (const it of items) {
          const r = it.getBoundingClientRect();
          const key = Math.round(r.top);
          rows.set(key, [...(rows.get(key) ?? []), Math.round(r.height)]);
        }
        for (const hs of rows.values()) if (hs.length > 1 && Math.max(...hs) - Math.min(...hs) > 2) unequal.push(hs);
      }
      return {
        scrollWidth: de.scrollWidth,
        clientWidth: de.clientWidth,
        rootWidth: root ? Math.round(root.getBoundingClientRect().width) : null,
        unequalRows: unequal.length,
        htmlOverflowX: getComputedStyle(de).overflowX,
        fixedBad: Array.from(document.querySelectorAll('*')).filter((e) => getComputedStyle(e).position === 'fixed' && Math.round(e.getBoundingClientRect().width) !== 500).length,
      };
    });
    if (width < 250) {
      await page.evaluate(() => window.scrollTo(200, 0));
      metrics.panned = await page.evaluate(() => window.scrollX);
      await page.evaluate(() => window.scrollTo(0, 0));
    }
    const file = join(OUT, `${slug(route)}-${width}.png`);
    await page.screenshot({ path: file, fullPage: true });
    report.push({ route, width, ...metrics, horizontalScroll: metrics.scrollWidth > metrics.clientWidth });
  }

  // Mobile menu overlay (only visible below the xl breakpoint).
  if (width < 1280) {
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: join(OUT, `menu-open-${width}.png`) });
    const menu = await page.evaluate(() => {
      const el = document.getElementById('mobile-menu');
      const r = el?.getBoundingClientRect();
      return { menuWidth: r ? Math.round(r.width) : null, menuScrollW: el?.scrollWidth, menuClientW: el?.clientWidth, scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth };
    });
    report.push({ route: '/ (menu open)', width, ...menu });
    await page.keyboard.press('Escape');
  }
  await context.close();
}

await browser.close();
writeFileSync(join(OUT, 'report.json'), JSON.stringify(report, null, 2));
for (const r of report) {
  const flag = r.horizontalScroll && r.width >= 300 ? '  <-- HORIZONTAL SCROLL' : '';
  const cards = r.unequalRows ? `  unequal rows: ${r.unequalRows}` : '';
  console.log(`${String(r.width).padStart(4)} ${r.route.padEnd(40)} sw=${r.scrollWidth} cw=${r.clientWidth} root=${r.rootWidth ?? '-'}${r.menuWidth ? ` menu=${r.menuWidth} (scrollW ${r.menuScrollW}/${r.menuClientW})` : ''}${r.width < 250 && r.htmlOverflowX ? ` ox=${r.htmlOverflowX} fixedNot500=${r.fixedBad} panX=${r.panned}` : ''}${cards}${flag}`);
}

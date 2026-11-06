// Compress key raw PNGs from screenshots-raw/ into docs/screenshots/*.webp (quality 70, height capped at 3000 px).
import sharp from 'sharp';
import { mkdirSync, existsSync } from 'node:fs';
mkdirSync('docs/screenshots', { recursive: true });
const pages = ['home', 'campaigns', 'campaigns_twelve-taps-saren-valley', 'donate', 'volunteer'];
const files = [];
for (const w of [240, 390, 768, 1440]) {
  for (const p of pages) files.push(`${p}-${w}`);
  if (w < 1280) files.push(`menu-open-${w}`);
}
for (const f of files) {
  const src = `screenshots-raw/${f}.png`;
  if (!existsSync(src)) continue;
  const meta = await sharp(src).metadata();
  await sharp(src).extract({ left: 0, top: 0, width: meta.width, height: Math.min(meta.height, 3000) }).webp({ quality: 70 }).toFile(`docs/screenshots/${f}.webp`);
}

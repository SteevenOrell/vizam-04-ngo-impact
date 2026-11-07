# Agent handoff — vizam-04-ngo-impact (Weftline Collective)

_Last updated: 2026-11-06 after redesign Slice 1 (Claude Sonnet)_

## Objective
VIZAM portfolio concept: a modern nonprofit website for the fictional NGO **Weftline Collective**, showing campaigns,
fundraising (demo only), volunteering and public engagement. Fictional brand, clearly labelled
"VIZAM concept project — fictional organization". Not a real client.

## Repository
- Path (this worktree): `vizam-04-ngo-impact/.claude/worktrees/agent-acc6d7b95be2d9852`
- Main checkout: `vizam-04-ngo-impact` on branch `vizam/initial-build`. Remote: `origin` (GitHub, PUBLIC, `main` holds only the empty initial commit).
- Branch: `worktree-agent-acc6d7b95be2d9852` (see `git log -1` for the head commit)
- `.claude/` must never be committed: it is in `.gitignore` here and in `.git/info/exclude` of the main checkout.

## Approved decisions
- Brief: `C:\Users\SteevenWemin\Documents\Projects\vizam-concepts-brief.md` (Project 04, orchestrator decisions, global rules). Implementation and "follow the brief" visual direction are pre-approved.
- Stack: Next.js App Router + TypeScript + Tailwind + GSAP + Motion + Lucide + React Hook Form/Zod + next/image + Metadata API; local structured content in `content/`, no CMS.
- Design: `docs/design-direction.md`; plan: `docs/plan.md`.
- Media: Unsplash/Pixabay only (public repo, no Envato files), WebP only, credits in `content/credits.ts`. No video, voice or AI images.
- Forms: server-side Zod, honeypot, in-memory rate limit, labelled demo submission, nothing stored or logged. Donation: demo flow, "Demo — no money is taken", no real-looking card fields.
- Dev server port 3104. Use headless Playwright from the terminal, not the shared browser pane.

## Done
- Design direction, plan, scaffold (`67fb742`).
- Unsplash photography as compressed WebP with credits (`17c20f1`).
- Content model, all 11 pages incl. `app/campaigns/[slug]` and `app/news/[slug]`, forms, donation demo, error/404 pages, sitemap, robots, OG image, footer label (`bd45498`).
- This handoff file, `scripts/screenshots.mjs`, `.gitattributes` (`0f68fd4`).
- Slice A (2026-11-06): committed the form, loading, playwright-core override and e2e work (`a352356`..`7f02298`). Fixed a real bug: the mobile menu (`position: fixed`) sat inside the `backdrop-blur` header, which became its containing block, so the <250 px lock misplaced it; it now renders as a sibling of the header. Raised the timeout of the 55-navigation layout e2e test.
- Vitest unit tests in `tests/unit/` (filters, schemas, submissions); base CSS layered; hero thread revealed with clip-path (`799e845`).
- Slice B (2026-11-06): ran `scripts/screenshots.mjs` (12 routes x 240/390/768/1440 + menu overlay) against a fresh build. No horizontal scroll from 300 px up, no unequal card rows, <250 px lock verified (root and fixed elements 500 px, html overflow-x auto, pannable). One real bug fixed: at 240 px the 500 px menu overlay hid its Close button with no way to pan; the overlay is now viewport-wide with 500 px inner content that pans (`#mobile-menu`/`.menu-inner` in `app/globals.css`); e2e assertion updated. Fixed SiteHeader indentation. Added 23 WebP screenshots (~2.5 MB) in `docs/screenshots/` via `scripts/compress-screenshots.mjs` (raw PNGs in git-ignored `screenshots-raw/`).

## Docs slice (2026-11-06)
- Added `README.md`, `docs/report.md` (pending rows marked for Slice C), `docs/handoff.md`. No code changes.

## Slice C, QA and security sign-off (2026-11-06, Opus)
- `scripts/secret-scan.mjs` (no deps) scans tracked files and every blob in the full history for keys and tokens, and fails on `.env*`, `.secrets/`, `.claude/`, CLAUDE.md, key files or non-WebP raster images. Tested on a scratch repo with planted fake values (all caught). Result here: no findings.
- `npm audit`: 8 moderate findings (dev-only `minimatch` 10.2.6 under typescript-eslint, GHSA-g3hv-75wg-m249). Fixed with a scoped `overrides` entry (`@typescript-eslint/typescript-estree` > `minimatch ^11.0.5`). Audit now reports 0.
- `/mission` panX=0 was a measurement race: `scroll-behavior: smooth` animates `scrollTo`. Every route pans to 200. The screenshot script and the e2e test now use `behavior: 'instant'`.
- Security review confirmed:
  - forms: Zod on the server, honeypot, rate limit, no `console.*`;
  - headers checked with `curl -I` against `next start`;
  - the `?campaign=` value is escaped;
  - Donate shows the demo label and has no card fields;
  - credit links use `rel="noopener noreferrer"`.
- Accessibility probe passed: skip link, focus ring, menu focus trap and Escape, focus on the first invalid field, reduced motion.
- Local LCP was 0.61–0.76 s with CLS 0.
- Open items (low/info), documented in `docs/report.md`:
  - the rate limiter trusts the first X-Forwarded-For value;
  - CSP keeps `'unsafe-inline'` for scripts;
  - the limiter is in-memory.
- Verdict: signed off for preview and PR (not for a real-money or real-data launch).

## Redesign Slice 1 (2026-11-06, Sonnet) — branch `vizam/initial-build`
Direction: closer to higherlifefoundation.org (see `docs/REFERENCE_ANALYSIS.md`), brown accent kept. Rewritten `docs/design-direction.md` sections 1-4.
- Tokens in `app/globals.css`: white page, near-black ink, warm-grey band, one brown accent. Legacy token names kept, values remapped (`loom`=white, `loom-deep`=grey band, `turmeric`=light brown tint for dark backgrounds, `indigo`/`moss` = dark neutrals), so inner pages already inherit the palette. Fonts: Outfit (display, light) + Inter. Unlayered `.font-display { font-weight: 400 }` tames legacy `font-bold` headings.
- Shared UI: `Eyebrow` (brown square bullet, `as` prop), `SectionHeading titleMuted`, `ArrowLink`, new `components/ui/{FeatureCard,ImagePair,PhotoBand}.tsx`; `CampaignCard`, `StatLedger`, `CtaBand`, `PageHero` restyled; `.warp` removed from shared components (kept only on /about avatar).
- Header (`components/layout/SiteHeader.tsx`): transparent on `/` until 24 px scroll (zero-height sticky wrapper so the concept notice still scrolls away), solid white elsewhere with a 72 px spacer; grouped nav from `navGroups` in `content/site.ts` with disclosure dropdowns; Donate (demo) link; brown "Get Involved" to /volunteer; mobile modal menu unchanged in behaviour. Footer restyled, still shows the fictional label.
- Home rebuilt (`app/page.tsx`): photo hero (`community-circle.webp`), About + image pair, featured campaign card (Ombra Reading Rooms), photo band, four commitments, programmes, impact (illustrative label kept), news, join CTA.
- `eslint.config.mjs` now ignores `.claude/**` (a worktree under it made lint scan thousands of foreign files).
- Test change: `tests/e2e/navigation.spec.ts` opens the "What We Do" dropdown before clicking Campaigns.

### Checks (Slice 1)
`npm run lint` pass; `npm run typecheck` pass; `npm test` 28/28; `npm run build` pass; `npm run test:e2e` 34/34 (incl. axe on all 12 routes); home at 240/390/768/1440 px via headless Playwright screenshots: no horizontal scroll at 390/768/1440, 240 px locks at 500 px (scrollWidth 500), mobile menu opens with Close, Get Involved and Donate (demo). Not run this slice: `npm audit`, `npm run secret-scan`, `scripts/screenshots.mjs`, portfolio screenshot refresh.

### Known gaps / Slice 2 input
- Photos are still the old set: the reading-room photo appears twice on home (featured card and latest news); hero text sits on a gradient over a fairly dark crop. Slice 2: find brighter, sharper photos (hero, band, pairs, programme images), update `content/credits.ts`/README.
- Inner pages only inherit tokens and shared components; they are not yet re-laid out (PageHero is still a split layout, programmes/mission/about/impact/news/volunteer/donate/contact pages use legacy `font-bold`, `text-turmeric`, `display-*` classes; rename legacy tokens).
- Axe cannot measure text contrast over photographs: hero/band/feature-card text was checked by eye only.
- `docs/screenshots/` and the README screenshots are from the old design.

## Next step
Slice 2: inner pages (About, Mission, Programs, Campaigns list/detail, Impact, News list/detail, Volunteer, Donate, Contact) in the new style plus clearer photos (site-media skill; Unsplash/Pixabay only). Then re-run all checks, refresh `docs/screenshots/`.

## Pending (pre-redesign sections below are historical)
- Nothing in the build or QA scope. The coordinator still has to re-verify, fast-forward, push and open the PR (see Next step).

## Last verified checks (final tree, Slice C)
| Check | Command | Result | When |
|---|---|---|---|
| Lint | `npm run lint` | pass (no output) | 2026-11-06 |
| Typecheck | `npm run typecheck` | pass | 2026-11-06 |
| Unit tests | `npm test` | pass: 3 files, 28 tests | 2026-11-06 |
| Build | `npm run build` | pass, 38 pages | 2026-11-06 |
| E2E + axe | `npm run test:e2e` (next start, port 3104) | pass: 34/34 | 2026-11-06 |
| Screenshots/layout | `node scripts/screenshots.mjs` | no h-scroll >=300 px, no unequal rows; 240 px lock OK and panX=200 on every route | 2026-11-06 |
| Audit | `npm audit` | 0 vulnerabilities | 2026-11-06 |
| Secret scan | `npm run secret-scan` | no findings (129 files, 16 commits, 108 text blobs) | 2026-11-06 |
| Headers | `curl -I` on `next start` | CSP, nosniff, DENY, Referrer, Permissions, HSTS, COOP; no X-Powered-By | 2026-11-06 |

## Known issues and risks
- `.claude/` must never be committed.
- Public repo: run `npm run secret-scan` again before every push.
- Rate limiting is per instance and keyed on the first X-Forwarded-For value. This is fine for the demo; real use would need a shared store and a trusted proxy.

## Setup
- `npm ci`, `npm run dev` (http://localhost:3104).
- Env var names: none required.

## Earlier next step (done, PR #1 open)
Coordinator:
1. Re-verify on this branch: `npm ci && npm run lint && npm run typecheck && npm test && npm run build && npm run test:e2e && npm run secret-scan && npm audit`.
2. Fast-forward `vizam/initial-build` to this branch.
3. Push `vizam/initial-build`.
4. Open the PR into `main`. Do not merge without Steeven's approval.

If Playwright's webServer times out, start `npx next start -p 3104 -H 127.0.0.1` first.

## Waiting for approval
- Vercel preview: not linked (Steeven). No production deploy.
- PR merge into `main`: Steeven.

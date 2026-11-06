# Agent handoff — vizam-04-ngo-impact (Weftline Collective)

_Last updated: 2026-11-06 after docs slice (Claude)_

## Objective
VIZAM portfolio concept: a modern nonprofit website for the fictional NGO **Weftline Collective**, showing campaigns,
fundraising (demo only), volunteering and public engagement. Fictional brand, clearly labelled
"VIZAM concept project — fictional organization". Not a real client.

## Repository
- Path (this worktree): `vizam-04-ngo-impact/.claude/worktrees/agent-acc6d7b95be2d9852`
- Main checkout: `vizam-04-ngo-impact` on branch `vizam/initial-build`. Remote: `origin` (GitHub, PUBLIC, `main` holds only the empty initial commit).
- Branch: `worktree-agent-acc6d7b95be2d9852`   Commit: `bd45498` (Build Weftline Collective site: content model, 11 pages, demo forms and donation flow)
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

## Pending (one slice per agent run)
1. Slice C (QA/security, Opus): write and run `scripts/secret-scan.mjs` over the working tree and full git history, `npm audit`, security + accessibility review, investigate `/mission` panX=0 in the <250 px pan test, then finalise the pending rows in `docs/report.md` and the README `secret-scan` line.
- Commit in small steps. No push, no deploy (the coordinating session pushes after review).

## Last verified checks
| Check | Command | Result | When |
|---|---|---|---|
| Lint | `npm run lint` | pass (no output) | 2026-11-06 |
| Typecheck | `npm run typecheck` | pass | 2026-11-06 |
| Unit tests | `npm test` | pass: 3 files, 28 tests | 2026-11-06 |
| Screenshots/layout | `node scripts/screenshots.mjs` | no h-scroll >=300 px, no unequal rows, lock OK at 240 px | 2026-11-06 |
| E2E + axe | `npm run test:e2e` (next start, port 3104) | pass: 34/34 after Slice B fix (first run: 1 failure, the lock test, updated for the new menu design) | 2026-11-06 |
| Build | `npm run build` | pass, 38 static pages | 2026-11-06 |
| Audit | `npm audit` | not run (Slice C) | - |
| Secret scan | `npm run secret-scan` | not run, script missing (Slice C) | - |

## Known issues and risks
- Build agent stopped twice on the usage limit (2026-11-05/06); work now continues in short slices, one fresh agent per slice.
- `.claude/` must never be committed.
- Public repo: run a secret scan over the full git history before any push.

## Setup
- `npm ci`, `npm run dev` (http://localhost:3104).
- Env var names: none required.

## Next step
Slice C (Opus): write and run `scripts/secret-scan.mjs` (working tree + full history), `npm audit`, security and accessibility review, investigate /mission panX=0, finalise the report. Note: `npm run test:e2e` needs a fresh `npm run build`; if Playwright webServer times out, start `npx next start -p 3104 -H 127.0.0.1` first.

## Waiting for approval
- Vercel preview: not linked (Steeven). No production deploy.

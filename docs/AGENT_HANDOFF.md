# Agent handoff — vizam-04-ngo-impact (Weftline Collective)

_Last updated: 2026-11-06 by the Project 04 coordinating session (Claude)_

## Objective
VIZAM portfolio concept: a modern nonprofit website for the fictional NGO **Weftline Collective**, showing campaigns,
fundraising (demo only), volunteering and public engagement. Fictional brand, clearly labelled
"VIZAM concept project — fictional organization". Not a real client.

## Repository
- Path (this worktree): `vizam-04-ngo-impact/.claude/worktrees/agent-acc6d7b95be2d9852`
- Main checkout: `vizam-04-ngo-impact` on branch `vizam/initial-build`. Remote: `origin` (GitHub, PUBLIC, `main` holds only the empty initial commit).
- Branch: `worktree-agent-acc6d7b95be2d9852`   Commit: `bd45498` (Build Weftline Collective site: content model, 11 pages, demo forms and donation flow)
- Uncommitted: `scripts/screenshots.mjs` (keep it).
- `.claude/` must never be committed: it is in `.gitignore` here and in `.git/info/exclude` of the main checkout.

## Approved decisions
- Brief: `C:\Users\SteevenWemin\Documents\Projects\vizam-concepts-brief.md` (Project 04, orchestrator decisions, global rules). Implementation and "follow the brief" visual direction are pre-approved.
- Stack: Next.js App Router + TypeScript + Tailwind + GSAP + Motion + Lucide + React Hook Form/Zod + next/image + Metadata API; local structured content in `content/`, no CMS.
- Design: `docs/design-direction.md`; plan: `docs/plan.md`.
- Media: Unsplash/Pixabay only (public repo, no Envato files), WebP only, credits in `content/credits.ts`. No video, voice or AI images.
- Forms: server-side Zod, honeypot, in-memory rate limit, labelled demo submission, nothing stored or logged. Donation: demo flow, "Demo — no money is taken", no real-looking card fields.
- Dev server port 3104. Use headless Playwright from the terminal, not the shared browser pane.

## Done
- Design direction, plan, scaffold (commit `67fb742`).
- Unsplash photography as compressed WebP with credits (`17c20f1`).
- Content model, all 11 pages incl. `app/campaigns/[slug]` and `app/news/[slug]`, volunteer/contact forms, donation demo, error/404/loading pages, sitemap, robots, OG image, footer label (`bd45498`).

## Pending (priority order)
1. Vitest unit tests (schemas, filters, rate limit, format, submissions action).
2. Playwright e2e + axe across all pages and forms; confirm the <250 px 500 px lock (`#root` and fixed elements) and no horizontal scroll from 300 px.
3. Screenshots at 240/390/768/1440 px → compact WebP set in `docs/screenshots/` (`scripts/screenshots.mjs`).
4. `npm audit`, secret scan script (`npm run secret-scan`, referenced in package.json but `scripts/secret-scan.mjs` does not exist yet).
5. `README.md` (incl. "VIZAM concept project — fictional organization" and photo credits), `docs/report.md`, `docs/handoff.md` (or point it to this file).
6. Commit in small steps. No push, no deploy (the coordinating session pushes after review).

## Last verified checks
| Check | Command | Result | When |
|---|---|---|---|
| Lint | `npm run lint` | not run (by coordinator) | — |
| Typecheck | `npm run typecheck` | not run (by coordinator) | — |
| Unit tests | `npm test` | not run — no tests yet | — |
| E2E + axe | `npm run test:e2e` | not run — no specs yet | — |
| Build | `npm run build` | not run (by coordinator) | — |
| Audit | `npm audit` | not run | — |
| Secret scan | `npm run secret-scan` | not run — script missing | — |

## Known issues and risks
- Build agent stopped mid-task on 2026-11-05 (usage limit), last note "Now About and Mission pages" — page files exist, but verify they are complete.
- Public repo: run a secret scan over the full git history before any push.

## Setup
- `npm ci`, `npm run dev` (http://localhost:3104).
- Env var names: none required.

## Next step
Run `npm run lint && npm run typecheck && npm run build` to confirm the current state, fix anything broken, then write the Vitest unit tests.

## Waiting for approval
- Vercel preview: not linked (Steeven). No production deploy.

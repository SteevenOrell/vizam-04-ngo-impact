# Report — Weftline Collective (VIZAM concept 04)

Fictional organization, built by VIZAM as a portfolio concept (not a client commission). Figures, places and stories are
illustrative. Donations are a demo: no money is taken.

## Architecture and design summary

- Next.js App Router, TypeScript, Tailwind 4. Pages are static (38 static pages in the production build).
- Content lives in typed local modules in `content/` (CMS-ready, no CMS). Photo credits are in `content/credits.ts`.
- Forms (contact, volunteer, donate) are server actions in `app/actions/forms.ts`. A pure pipeline in
  `lib/submissions.ts` runs rate limit, honeypot, then Zod validation (`lib/schemas.ts`) and builds a labelled demo reply.
- Motion: GSAP for the hero thread (clip-path reveal) and Motion/`Reveal` for section reveals, both honouring
  `prefers-reduced-motion`.
- Design direction (`docs/design-direction.md`): indigo ink and loom cream with madder red and turmeric accents,
  editorial "ledger" layouts, photography of hands, tools and landscapes rather than pity imagery. Brand name check done
  2026-11-05 (no existing nonprofit found).
- Layout rule: below 250 px the layout locks at 500 px and the visitor pans; the mobile menu overlay pans internally.

## Status

All 11 page types are built (home, mission, about, programs, campaigns + detail, impact, news + detail, volunteer,
donate, contact) with 404/error pages, sitemap, robots and OG image. Build-phase work and the docs are complete. QA and
security sign-off is pending (Slice C, Opus). Not deployed, not pushed.

## Checks (as recorded in `docs/AGENT_HANDOFF.md`, 2026-11-06)

| Check | Command | Result |
|---|---|---|
| Lint | `npm run lint` | pass |
| Typecheck | `npm run typecheck` | pass |
| Unit tests | `npm test` | pass: 3 files, 28 tests |
| Layout and screenshots | `node scripts/screenshots.mjs` | no horizontal scroll at 300 px and up, no unequal card rows, lock verified at 240 px |
| E2E + axe | `npm run test:e2e` | pass: 34/34 (first run 1 failure, the lock test, updated after a menu fix) |
| Build | `npm run build` | pass, 38 static pages |
| Dependency audit | `npm audit` | pending — Opus QA slice |
| Secret scan | `npm run secret-scan` | pending — Opus QA slice (script not yet written) |
| Security review | manual | pending — Opus QA slice |

Browser checks used headless Playwright (Chromium) at 240, 390, 768 and 1440 px.

## Security (to be confirmed by QA sign-off)

- Forms: server-side Zod validation, honeypot, in-memory rate limit, no storage, no logging of personal data, demo labelling.
- Headers in `next.config.ts`: CSP (`script-src` keeps `'unsafe-inline'` for Next.js bootstrap scripts), `X-Content-Type-Options`,
  `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, HSTS, COOP; `X-Powered-By` removed.
- No secrets or environment variables are required. The repo is public, so a secret scan over the full git history is
  required before any push.
- `.claude/` is git-ignored and must never be committed.
- Not an independent security review. None of the above counts as confirmed until the QA slice signs off.

## Performance and accessibility

- Photography is compressed WebP served through `next/image` (AVIF/WebP formats enabled); pages are statically generated.
- axe-core runs in the Playwright suite across pages (passing as of the last e2e run). Skip link, focus states, reduced-motion handling and
  keyboard menu are implemented.
- No Lighthouse or Core Web Vitals measurement has been recorded yet; to be done in the QA slice.

## Known limitations

- No email provider: form submissions are demo only and are not delivered.
- Donations are a demo; no payment provider, no money is taken.
- The rate limiter is in-memory, so it resets per server instance (a speed bump on serverless, not a guarantee).
- No CMS; content is edited in `content/`.
- Not deployed; no Vercel project is linked.
- `/mission` reported `panX=0` in the screenshot script's below-250 px pan test. Under review in the QA slice; not yet
  explained.
- Brand-name check is a web search only, not a trademark clearance.

## Portfolio case-study blurb

Weftline Collective is a VIZAM concept project: a website for a fictional NGO working on water, learning, livelihoods
and climate resilience. The brief was to avoid the generic charity template. We built an editorial identity around one
metaphor, the weft thread that binds a community's warp, with indigo and cream tones, honest photography of people at work
and a ledger-style layout. The site covers campaigns, impact figures, news, volunteering and a clearly labelled demo
donation flow, with server-validated forms and a layout that stays usable down to 240 px. Built with Next.js, TypeScript,
Tailwind, GSAP and Motion. Fictional organization; no real donations.

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
- Design direction (`docs/design-direction.md`, revised 2026-11-06): a light, photograph-led layout closer to the
  editorial feel of one reference nonprofit site. White page, near-black text, a warm-grey band and one brown accent
  (tokens `page`, `band`, `accent`, `accent-dark`, `accent-tint`, `graphite`, `title-grey` in `app/globals.css`); Outfit
  light for display and Inter for text. Full-viewport photo hero with a transparent header that turns solid on scroll,
  grouped navigation with dropdowns, a "Get Involved" button and a Donate (demo) link, two-tone headings, arrow links,
  a rounded feature card, photo bands and image pairs. Shared pieces: `Section`/`Split`/`Eyebrow`/`SectionHeading`/
  `ArrowLink` in `components/ui/primitives.tsx`, plus `FeatureCard`, `ImagePair`, `PhotoBand`, and a light `PageHero`.
  22 Unsplash/Pixabay WebP photos, each list (campaigns, news, programmes) with distinct images. Brand name check done
  2026-11-05 (no existing nonprofit found).
- Reference analysis (`docs/REFERENCE_ANALYSIS.md`): only the reference site's home page was inspected (layout, type,
  spacing and interaction characteristics); its inner pages were not. Nothing was copied (no code, text, images, logo or
  compositions). The inner pages here are original layouts in the same style.
- Layout rule: below 250 px the layout locks at 500 px and the visitor pans; the mobile menu overlay pans internally.

## Status

All 11 page types are built and re-laid out in the new design (home, mission, about, programs, campaigns + detail,
impact, news + detail, volunteer, donate, contact) with 404/error pages, sitemap, robots and OG image. Redesign Slices
1 to 3 are done (tokens and shared UI, photos and inner pages, docs and screenshots). Not deployed. PR #1 is open; this
branch is not pushed after the redesign. Security and QA sign-off: **pending re-run after redesign (Opus)**.

## Checks (2026-11-06, after the redesign, Slice 3)

| Check | Command | Result |
|---|---|---|
| Lint | `npm run lint` | pass (no output) |
| Typecheck | `npm run typecheck` | pass |
| Unit tests | `npm test` | pass: 3 files, 28 tests |
| Build | `npm run build` | pass |
| E2E + axe | `npm run test:e2e` | pass: 34/34 (axe on every route, headers, forms, menu, 240 px lock and pan, no horizontal scroll from 300 px) |
| Layout and screenshots | `node scripts/screenshots.mjs` | 12 routes x 4 widths: no horizontal scroll at 300 px and up, no unequal card rows; at 240 px on every route: root and fixed elements 500 px, `html` overflow-x auto, panX=200; menu overlay opens at 240, 390 and 768 px |
| Dependency audit | `npm audit` | 0 vulnerabilities |
| Secret scan | `npm run secret-scan` | no findings: 111 tracked files, 23 commits, 150 history paths, 180 text blobs |
| Security headers, keyboard, reduced motion | not re-run | pending Opus re-run (results below are from before the redesign) |

Browser checks used headless Playwright (Chromium) from the terminal at 240, 390, 768 and 1440 px.

## Security review (Slice C, before the redesign; re-run pending)

The findings below were confirmed on the pre-redesign tree. The redesign did not change the forms, server actions,
headers or dependencies, but it has not been re-reviewed.

Scope: source review plus live requests against a production build. This is not an independent security review or
penetration test, and automated scans do not prove the site is secure.

- **Forms** (`app/actions/forms.ts`, `lib/submissions.ts`, `lib/schemas.ts`): every server action runs the rate limit,
  then the honeypot, then server-side Zod `safeParse`. The schemas enforce:
  - length limits, enums and email format;
  - a donation amount between 5 and 10,000 with at most two decimals;
  - an allocation that must be a known open campaign.

  Nothing is stored, sent or logged: there is no `console.*` call in `app/`, `components/`, `lib/` or `content/`. React
  renders the replies, so they are escaped. The client IP is used only as a truncated SHA-256 key held in memory.
- **No PII in URLs**: forms submit through server actions (POST). The only GET forms and query strings are the
  campaign/news filters and `/donate?campaign=`. That value is JSON-escaped in the RSC payload (a `<script>` probe is not
  reflected as markup) and only pre-selects a known allocation.
- **Donate**: "Demo — no money is taken." is visible in the page hero and on the form. There are no card, CVV, expiry or
  bank fields, and the success screen states that no money was taken. Permissions-Policy disables `payment`.
- **Headers** (verified with `curl -I` against `next start`):
  - CSP: `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; form-action 'self'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests`;
  - `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`;
  - `Permissions-Policy`, HSTS (2 years, includeSubDomains), COOP `same-origin`;
  - no `X-Powered-By`.
- **External links**: only the photo-credit links on /about leave the site. They carry `rel="noopener noreferrer"` and
  open in the same tab.
- **Secrets and repo hygiene**: `scripts/secret-scan.mjs` has no dependencies. It scans tracked files and every blob
  reachable from any ref.
  - It looks for keys from AWS, GitHub, Stripe, Google, OpenAI, Anthropic, Slack, Vercel and ElevenLabs-style
    services, plus JWTs, private keys, service-account JSON and high-entropy values assigned to
    `*KEY`/`*SECRET`/`*TOKEN`/`*PASSWORD` names.
  - It fails if any of these appear in the tree or in history: `.env*`, `.secrets/`, `.claude/`, `CLAUDE.md`, key
    files, raw screenshots or any non-WebP raster image.
  - It was tested on a scratch repo with planted fake values: all were detected and it exited with code 1.
  - On this repo it reports no findings. No environment variables are required.

| Severity | Finding | Status |
|---|---|---|
| Moderate (dev only) | `minimatch` 10.2.6 under `@typescript-eslint/typescript-estree` (ESLint tooling) allows ReDoS through glob parts (GHSA-g3hv-75wg-m249). It produced 8 moderate entries through the typescript-eslint chain. `npm audit fix --force` would have downgraded `eslint-config-next` to 15.x. | Fixed: a scoped `overrides` entry pins `minimatch ^11.0.5` (same named-export API). Lint passes and audit reports 0. |
| Low (test only) | `/mission` reported `panX=0` below 250 px. Cause: `html { scroll-behavior: smooth }` animates `scrollTo`, so reading `scrollX` straight away raced the animation. Every route actually pans to 200. | Fixed: the screenshot script and the e2e test now scroll with `behavior: 'instant'`. |
| Low | The rate-limit key uses the first `X-Forwarded-For` value. On Vercel the platform sets this header. On a self-hosted server with no trusted proxy, a client could rotate the header to get around the limit. | Open, documented. Impact is low because the forms are demo-only. |
| Info | CSP keeps `script-src 'unsafe-inline'`: Next.js injects inline bootstrap scripts, and a nonce would make every page dynamic. | Accepted trade-off for a static concept site. |
| Info | The rate limiter is in-memory and per instance. | Documented. Real use needs a shared store (for example Redis or KV). |

## Performance and accessibility

- Photography is compressed WebP served through `next/image` (AVIF/WebP). Pages are statically generated except
  `/campaigns`, `/news` and `/donate`, which depend on query strings.
- Local measurement (Playwright, production build, no throttling, not Lighthouse) on `/`, `/campaigns` and `/impact` at
  390 and 1440 px:
  - LCP 0.61–0.76 s and CLS 0.000;
  - total transfer 362–566 KB, of which JS is 238–310 KB.

  Field Core Web Vitals need a deployed preview.
- WCAG 2.2 AA review:
  - axe-core reports no violations on all 12 pages (contrast included).
  - The skip link is the first Tab stop, is visible on focus and moves focus to `<main>`.
  - Focus ring: 3 px solid outline on `:focus-visible`, with a variant for dark backgrounds.
  - Mobile menu: it has `aria-expanded`/`aria-controls`, `role="dialog"` and `aria-modal`. Opening it moves focus to
    Close, Tab stays inside the menu (tested over 25 presses), and Escape closes it and returns focus to the Menu button.
  - Forms: submitting empty fields focuses the first invalid field. Each invalid field has `aria-invalid` and
    `aria-describedby` pointing at its error text, and status regions use `aria-live`.
  - Reduced motion: GSAP and Motion only animate under `prefers-reduced-motion: no-preference`. With `reduce`, no
    content stays hidden and `scroll-behavior` is `auto`.
- Labelling:
  - Every impact and campaign figure carries "Illustrative figures for a fictional organization." as a visible note,
    plus "(illustrative)" for screen readers.
  - The footer says "VIZAM concept project — fictional organization."

## QA sign-off

**Status: pending re-run after redesign (Opus).**

- The earlier sign-off (2026-11-06, Slice C) applied to the pre-redesign tree and is not carried over.
- Automated gates pass on the redesigned tree (table above); the manual review (headers, keyboard, focus, reduced
  motion, contrast over photos, forms) still has to be repeated.
- The open items from the earlier review are low or informational and documented above.

Any sign-off will not cover a production launch with real donations or personal data. That would need a payment
provider, an email provider, a shared rate-limit store and an independent security and privacy review.

## Known limitations

- No email provider: form submissions are demo only and are not delivered.
- Donations are a demo; no payment provider, no money is taken.
- The rate limiter is in-memory, so it resets per server instance (a speed bump on serverless, not a guarantee). It
  also trusts the first `X-Forwarded-For` value (see Security).
- No CMS; content is edited in `content/`.
- Not deployed; no Vercel project is linked, so there is no field performance data.
- Brand-name check is a web search only, not a trademark clearance.
- Reference analysis covers the reference site's home page only.
- Transparent header over the hero: at 240 px the grey "Weftline" wordmark and Menu label sit on a pale sky and look
  faint in the screenshot (axe passes; the header turns solid on scroll). Worth a look in the QA pass.
- The water-carriers photo shows people from behind on purpose (no faces of vulnerable people). Photos are stock and
  illustrate a fictional organization.
- Wide screens leave empty space under the About heading on the home page and beside the campaign detail text column
  under the funding card (layout choice, not a bug).
- Screenshots in `docs/screenshots/` are cropped at 2600 px and compressed (quality 60).

## Portfolio case-study blurb


Weftline Collective is a VIZAM concept project: a website for a fictional NGO working on water, learning, livelihoods and climate resilience. The brief was to move away from the generic charity template toward an editorial, photograph-led look. We built a light layout with a full-viewport photo hero, a single brown accent, Outfit and Inter type, clear photography of people at work and a rounded feature card for the lead campaign. The site covers campaigns, impact figures, news, volunteering and a clearly labelled demo donation flow, with server-validated forms and a layout that stays usable down to 240 px. Built with Next.js, TypeScript, Tailwind, GSAP and Motion. Fictional organization; no real donations.

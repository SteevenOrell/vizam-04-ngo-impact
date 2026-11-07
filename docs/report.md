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
1 to 3 are done (tokens and shared UI, photos and inner pages, docs and screenshots), followed by the Opus QA and
security pass on the redesigned tree (2026-11-06). Not deployed. PR #1 is open; the redesign commits are not pushed yet.

## Checks (2026-11-06, final QA pass on the redesigned tree, Opus)

| Check | Command | Result |
|---|---|---|
| Clean install | `npm ci` | pass, 0 vulnerabilities reported |
| Lint | `npm run lint` | pass (no output) |
| Typecheck | `npm run typecheck` | pass |
| Unit tests | `npm test` | pass: 3 files, 28 tests |
| Build | `npm run build` | pass, 38 static pages |
| E2E + axe | `npm run test:e2e` | pass: 36/36 (axe on all 12 routes, headers, forms, desktop dropdown keyboard + Escape, mobile menu trap + Escape, transparent header at 240 px, 240 px lock and pan, no horizontal scroll from 300 px, equal cards). The first full run had 1 failure: `campaigns.spec.ts` "campaign detail page shows progress, milestones and a demo donate link", `expect(page).toHaveURL(/donate\?campaign=twelve-taps-saren-valley/)` timed out at 5 s (received the campaign URL). The cold on-demand render of `/donate` was slow on a loaded machine; the test passed 3/3 with `--repeat-each=3` and its timeout is now 15 s. Two later full runs: 36/36. |
| Layout and screenshots | `node scripts/screenshots.mjs` (13 routes incl. a news article and the 404) | no horizontal scroll at 390/768/1440, no unequal card rows; at 240 px on every route: scrollWidth 500, root 500, fixed elements 500 px, `html` overflow-x auto, panX=200; menu overlay opens at 240/390/768 and pans inside at 240 |
| Dependency audit | `npm audit` | 0 vulnerabilities |
| Secret scan | `npm run secret-scan` | no findings: 138 tracked files, 30 commits, 155 history paths, 198 text blobs |
| Security headers | `curl -I` on `next start` (`/` and `/donate`) | CSP, nosniff, DENY, Referrer-Policy, Permissions-Policy, HSTS, COOP; no X-Powered-By |
| Text over photos | Playwright probe: hide text, sample the pixels behind each text element over a photo, 95th-percentile background vs text colour | after the scrim fix, every text over a photo passes AA on `/`, `/about`, `/mission`, `/impact`, `/volunteer`, `/programs` and a campaign detail page at 240/390/768/1440 px |
| Keyboard, reduced motion, forms | Playwright probes | see the accessibility section |

Browser checks used headless Playwright (Chromium) from the terminal at 240, 390, 768 and 1440 px.

## Security review (re-run on the redesigned tree, 2026-11-06, Opus)

The redesign did not change the server actions, schemas, headers or dependencies; all of this was re-checked on the
final tree.

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
- **External links**: only the 44 photo-credit links on /about leave the site. All carry `rel="noopener noreferrer"`
  and open in the same tab. No `dangerouslySetInnerHTML` and no `target="_blank"` in `app/`, `components/` or `lib/`.
- **Fonts and images**: fonts come from `next/font` (self-hosted at build, `font-src 'self'`); every photo is a local
  WebP in `public/images` served through `next/image`, so `img-src 'self' data: blob:` needs no external host.
- **Photos and licensing**: 22 WebP files, each with a matching entry in `content/credits.ts`,
  `public/images/CREDITS.md` and the README (21 Unsplash, 1 Pixabay, no Envato). No originals or other raster formats
  are tracked or in history.
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
| Medium (a11y, WCAG 1.4.3) | Small eyebrow labels on the home feature card and photo bands sat over bright parts of the photo (classroom wall, light shirts, terraces): 95th-percentile background contrast 2.7–3.9:1. | Fixed (`6fcac5f`): darker scrims in `FeatureCard` (via 60 %, top 35 %) and `PhotoBand` (via 55 %, top 40 %). All text over photos now passes 4.5:1. |
| Medium (licensing/brand) | `mangrove-planting.webp` showed a clearly visible energy-drink logo and lettering on the subject's sleeve. `code-club.webp` kept a faint, half-hidden monitor logo at its left edge. | Fixed (`c6daf40`): replaced by `seedling-planting.webp` (Unsplash, E. Diop; hands planting a seedling, no faces, no logos) with new alt text and credits; code-club cropped 130 px on the left. |
| Low (a11y, WCAG 3.3.1) | Donate: submitting an empty "Other amount" showed the error but left focus on the button, because the custom amount is a controlled input React Hook Form cannot focus. The allocation select did not reference its error. | Fixed (`f173a67`): focus moves to the amount field (`aria-invalid`, `aria-describedby` → error); the select gets `aria-describedby`. Covered by e2e. |
| Info (QA artefact) | The faint grey wordmark and Menu label over the pale sky at 240 px (noted in Slice 3) were a screenshot timing artefact: `scripts/screenshots.mjs` returned to the top with a smooth scroll, so the full-page capture caught the header mid colour transition. Live, the transparent header has white text on the dark scrim at >= 7.4:1 at 240 px (>= 11:1 at 390 px). | Fixed (`34deb10`): the script scrolls instantly; an e2e test asserts white header text over the scrim at 240 px and a solid white header after scrolling. |
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
  - Desktop dropdowns ("What We Do" etc.): disclosure buttons with `aria-expanded`/`aria-controls`; Enter opens and
    closes, Tab moves into the panel, Escape closes it and returns focus to the trigger, and leaving the group closes it.
  - Focus is visible on every Tab stop checked (first 25 stops per route); cards show their ring on the whole card via
    `focus-within`.
  - Mobile menu: it has `aria-expanded`/`aria-controls`, `role="dialog"` and `aria-modal`. Opening it moves focus to
    Close, Tab stays inside the menu, and Escape closes it and returns focus to the Menu button.
  - Forms: submitting empty fields focuses the first invalid field (contact, volunteer, and the donate custom amount).
    Each invalid field has `aria-invalid` and `aria-describedby` pointing at its error text, and status regions use
    `aria-live`.
  - Text over photos: hero, feature card, photo bands and the transparent header pass AA at all four widths (probe in
    the checks table). Decorative card photos use empty `alt` (the card title is the link text); content photos have
    descriptive alt text.
  - Reduced motion: GSAP and Motion only animate under `prefers-reduced-motion: no-preference`. With `reduce`, no
    content stays hidden and `scroll-behavior` is `auto`.
- Labelling:
  - Every impact and campaign figure carries "Illustrative figures for a fictional organization." as a visible note,
    plus "(illustrative)" for screen readers.
  - The footer says "VIZAM concept project — fictional organization."

## QA sign-off

**Status: signed off for Vercel preview and PR #1 (2026-11-06, Opus, redesigned tree).**

- Every gate in the checks table passes on the final tree, and the manual review (headers, keyboard, focus, reduced
  motion, contrast over photos, forms, photos and licensing, honesty labels) was repeated.
- Four issues were found and fixed (table above). What remains open is low or informational: the
  `X-Forwarded-For` trust, the in-memory limiter, and `'unsafe-inline'` scripts in the CSP.

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
- While the header switches between transparent and solid (300 ms colour transition on scroll), the text is briefly
  mid-grey; at rest it is always white on the scrim or dark on white.
- `cold-store.webp` shows generic "YM" initials on fish crates (not a recognisable brand); kept.
- The water-carriers photo shows people from behind on purpose (no faces of vulnerable people). Photos are stock and
  illustrate a fictional organization.
- Wide screens leave empty space under the About heading on the home page and beside the campaign detail text column
  under the funding card (layout choice, not a bug).
- Screenshots in `docs/screenshots/` are cropped at 2600 px and compressed (quality 60).

## Portfolio case-study blurb


Weftline Collective is a VIZAM concept project: a website for a fictional NGO working on water, learning, livelihoods and climate resilience. The brief was to move away from the generic charity template toward an editorial, photograph-led look. We built a light layout with a full-viewport photo hero, a single brown accent, Outfit and Inter type, clear photography of people at work and a rounded feature card for the lead campaign. The site covers campaigns, impact figures, news, volunteering and a clearly labelled demo donation flow, with server-validated forms and a layout that stays usable down to 240 px. Built with Next.js, TypeScript, Tailwind, GSAP and Motion. Fictional organization; no real donations.

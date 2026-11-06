# Development plan — Weftline Collective (VIZAM concept 04)

## 1. Requirements summary

Modern nonprofit site showing how digital solutions support communities, campaigns, fundraising and public
engagement. Feel: human-centred, inspiring, trustworthy, contemporary, accessible, emotionally engaging.

Functional scope:
- 11 pages: Home, About, Our Mission, Programs & Initiatives, Campaigns (filterable directory), Campaign Details
  (one static page per campaign), Impact & Results, News & Events, Volunteer (registration form), Donate (demo), Contact.
- Campaign directory with filters (theme, region, status, text search) reflected in the URL, plus pagination.
- News & Events listing with type filter and pagination; events show date and place.
- Volunteer and contact forms: client (React Hook Form + Zod) and server (Server Action + same Zod schema)
  validation, honeypot, basic rate limit, demo submission (nothing delivered, stored or logged).
- Donation interface: amount presets/custom amount, frequency, allocation to a campaign; result is a demo
  confirmation. No payment provider, no card fields. "Demo — no money is taken" visible on the page and in the result.
- Every impact figure labelled "illustrative figures for a fictional organization".
- WCAG 2.2 AA, keyboard navigation, skip link, reduced motion, loading / error / 404 states, SEO metadata, sitemap,
  robots, Open Graph.
- Below 250 px: layout locked at 500 px with horizontal pan.

Out of scope: real payments, CMS, email delivery, analytics, i18n.

## 2. Sitemap

```
/                       Home
/about                  About
/mission                Our Mission
/programs               Programs & Initiatives (anchors per programme)
/campaigns              Campaigns directory (?theme=&region=&status=&q=&page=)
/campaigns/[slug]       Campaign details (generateStaticParams)
/impact                 Impact & Results
/news                   News & Events (?type=&page=)
/volunteer              Volunteer registration
/donate                 Donate (demo)   (?campaign=slug preselects allocation)
/contact                Contact
/sitemap.xml /robots.txt /opengraph-image (generated) + not-found, error, loading
```

## 3. Technology

Next.js 16 App Router, React 19, TypeScript (strict), Tailwind CSS v4, GSAP 3 + ScrollTrigger, Motion, Lucide React,
React Hook Form + Zod 4 (`@hookform/resolvers`), next/image, Metadata API, next/font. Vitest for unit tests, Playwright
+ @axe-core/playwright for e2e and accessibility. Vercel-compatible, no environment variables required.

## 4. Component architecture

```
app/
  layout.tsx            fonts, metadata base, <div id="root">, SkipLink, SiteHeader, <main>, SiteFooter
  page.tsx …            one folder per route; server components by default
  actions/              server actions: volunteer.ts, contact.ts, donate.ts
  not-found.tsx error.tsx loading.tsx global-error.tsx sitemap.ts robots.ts
components/
  layout/               SiteHeader (desktop nav + MobileMenu dialog), SiteFooter, SkipLink, Container
  ui/                   Button/ButtonLink, Tag (dye tag), SectionHeading, Field components, Pagination,
                        IllustrativeNote, DemoBanner, WovenProgress
  motion/               ThreadLine (GSAP scroll-drawn SVG), Reveal (GSAP), useReducedMotion helpers
  campaigns/            CampaignCard, CampaignFilters (client, URL-synced), CampaignGrid
  news/                 NewsCard, NewsFilters
  forms/                VolunteerForm, ContactForm, DonateForm (client), FormStatus
  sections/             PageHero, StatLedger, ProgrammeRow, StoryBlock, CtaBand
content/                typed local data (CMS-ready): site.ts, programs.ts, campaigns.ts, news.ts, impact.ts,
                        team.ts, images.ts
lib/                    schemas.ts (Zod), filters.ts (campaign/news filtering + pagination), rate-limit.ts,
                        format.ts, honeypot.ts, request.ts
tests/unit/             Vitest
tests/e2e/              Playwright specs (navigation, filters, forms, donate, a11y, layout, screenshots)
```

## 5. Content and data structure

Content lives in typed TypeScript modules under `content/`, shaped like CMS documents (id/slug, title, summary,
body blocks, references by slug, image reference with alt text). Swapping to a headless CMS means replacing the
module exports with fetchers that return the same types (`content/types.ts`).

- `Campaign { slug, title, theme, region, status: 'active'|'upcoming'|'completed', summary, goal, raised,
  supporters, startDate, endDate, image, story: Block[], milestones[], partners[], programmeSlug }`
- `Programme { slug, name, theme, lede, approach[], digitalTool, image }`
- `NewsItem { slug, type: 'news'|'event'|'story', title, date, location?, summary, image }`
- `ImpactStat { value, unit, label, note }` — rendered only through `StatLedger`, which always prints the
  illustrative label.

## 6. Design system

See `docs/design-direction.md`. Implemented as Tailwind v4 `@theme` tokens in `app/globals.css` (colours, fonts,
spacing, radii) plus a few component classes (`.warp`, `.ledger-rule`, `.dye-tag`).

## 7. Security plan

- Server Actions validate every field with Zod (`lib/schemas.ts`) regardless of client validation.
- Honeypot field (visually hidden, `tabindex=-1`, `autocomplete=off`): filled → silently accept and discard.
- Rate limit: in-memory sliding window per client IP (5 submissions / 10 min / form). IP is used only as a map key in
  memory and never logged. Documented limitation: per-instance on serverless; production would use a shared store.
- No personal data is stored, logged, emailed or returned beyond the first name echoed in the success message.
- Security headers in `next.config.ts`: Content-Security-Policy, X-Content-Type-Options, Referrer-Policy,
  Permissions-Policy, X-Frame-Options / frame-ancestors, Strict-Transport-Security. `poweredByHeader: false`.
- No secrets required. `.gitignore` covers `.env*`. Secret scan before each commit series; `npm audit`.
- Donations: no payment fields at all; amounts validated server-side and only echoed back.

## 8. Testing plan

- Unit (Vitest): Zod schemas (valid/invalid/edge), campaign + news filtering and pagination, rate limiter,
  currency/percentage formatting, honeypot handling, donation action logic.
- E2E (Playwright, Chromium, production build on port 3104): every page loads with one h1 and correct title;
  mobile menu opens/closes/traps focus/Escape; campaign filters + pagination update URL and results; campaign detail
  pages render; forms show errors and demo success; donate demo flow; 404 page; skip link.
- Accessibility: axe (WCAG 2.0/2.1/2.2 A+AA tags) on all 11 routes + 404.
- Layout: no horizontal scroll at 300/390/768/1440; 500 px lock under 250 px; equal card heights in grids.
- Screenshots at 240/390/768/1440 (full page) → compressed WebP subset in `docs/screenshots/`.
- Static checks: `npm run lint`, `npm run typecheck`, `npm run build`, `npm audit`, secret scan (grep for key
  patterns and `.env` files).

## 9. Deployment plan

- Vercel, framework preset Next.js, no env vars. Node 20+.
- Steeven links the GitHub repo `vizam-04-ngo-impact` (public) and the Vercel project; previews per branch.
- No production deployment without approval. Before going live as a real site: real payment provider (Stripe
  Checkout), email delivery, shared rate-limit store, privacy policy, independent security and compliance review.

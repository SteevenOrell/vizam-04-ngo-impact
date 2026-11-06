# Design direction — Weftline Collective

VIZAM concept project 04 (NGO and social impact). **Fictional organization.** No external design reference was
supplied, so this direction is original and was written before any code.

## 1. Brand

**Name:** Weftline Collective (short form: Weftline).

**Idea:** in weaving, the *weft* is the thread that passes across the fixed warp and binds it into cloth. Communities
are the warp: they were there first and they hold the structure. Weftline's job is to be the crossing thread:
funding, tools, training and digital services that tie local efforts together without replacing them.

**Positioning line:** "We are the crossing thread." Supporting line: "Community-led programmes in water, learning,
livelihoods and climate resilience, woven together with practical digital tools."

**Voice:** plain, specific, warm, never pitying. Communities are the subject of sentences ("Farmers in the Saren
Valley mapped…"), not objects of rescue. No "help them", no "save lives in one click", no guilt.

**Geography:** an invented regional network of places (Saren Valley, Kestrel Coast, Ombra Highlands, Tamsin Delta,
Lowmere Plains). Using fictional places avoids implying work in real communities that did not happen.

### Name check (done 2026-11-05)

Web searches for `"Weftline"`, `"Weftline Collective"` and `"Weftline" nonprofit OR charity OR foundation OR NGO`
returned no organization of that name, in the nonprofit field or elsewhere. The nearest results were unrelated:
the WEFT women entrepreneurs' foundation (different name, India), the Worldline corporate foundation
(payments company), Weave Foundation (UK charity), "Weft" textile labels and a "GL Weft Linea" hair-extension
product. A web search cannot rule out a tiny local group; the site is labelled fictional everywhere.

## 2. Why this is not a generic charity template

Generic charity templates share a recognisable kit: orange or red "heart" palette, full-bleed photo of a sad child
with "Donate now" in a pill button, three icon boxes, a counter strip, a testimonial carousel. Weftline avoids each:

| Template habit | Weftline instead |
|---|---|
| Pity photography, close-ups of children | Hands, tools, landscapes, groups at work; people photographed as agents, faces never the "need" |
| Red heart palette | Indigo ink + loom cream, with madder red and turmeric as dye accents |
| Icon trio | Editorial "ledger" layouts: numbered rows, rules, captions, marginal notes |
| Animated counters | Static, labelled figures ("illustrative figures for a fictional organization") with a short method note |
| Donate button everywhere | One quiet persistent donate link; donating is presented as joining a thread, with transparency on allocation |
| Generic sans | Characterful grotesque display + a typeface designed for legibility |

## 3. Signature elements

1. **The thread.** A single SVG line that weaves across key sections (home hero, mission, campaign detail) and is
   drawn as the visitor scrolls (GSAP ScrollTrigger). With reduced motion the line is simply shown complete.
2. **Warp texture.** Fine vertical "warp" rules (CSS repeating gradients) behind section headings and the footer;
   weft accents in dye colours cross them. Pure CSS, no images.
3. **Ledger typography.** Numbers, dates and regions set in tabular figures on hairline rules, like a field notebook
   or an annual report. Makes the organization feel accountable rather than salesy.
4. **Woven progress bar.** Campaign funding progress drawn as interlaced segments rather than a plain pill.
5. **Dye-tag labels.** Small rectangular tags (theme, status, "Demo", "Illustrative") in dye colours, used
   consistently for honesty labels so they read as part of the design, not as disclaimers bolted on.

## 4. Typography

- **Display:** Bricolage Grotesque (variable, Google Fonts). Slightly irregular, humane grotesque; confident at large
  sizes without corporate coldness. Weights 500–800, tight tracking at display sizes.
- **Text and UI:** Atkinson Hyperlegible (Braille Institute, Google Fonts). Designed for low-vision readers, which
  fits an organization that claims to care about access. 400 and 700.
- **Scale (fluid, clamp):** display 3.0→6.5 rem; h1 2.4→4.5 rem; h2 1.9→3.0 rem; h3 1.3→1.6 rem; body 1.0625 rem
  (17 px) line-height 1.6; small 0.875 rem. Measure capped at ~68ch for prose.
- Tabular numerals for figures, dates and money.

## 5. Colour

| Token | Hex | Use |
|---|---|---|
| `ink` | `#16193A` | Primary text, dark sections (indigo ink) |
| `ink-soft` | `#3A3F66` | Secondary text |
| `loom` | `#F5F0E6` | Page background (undyed cotton) |
| `loom-deep` | `#EAE2D2` | Alternate section background |
| `madder` | `#A8402C` | Primary accent, links on light, CTA (madder root red) — 5.4:1 on loom, 4.75:1 on loom-deep |
| `turmeric` | `#E2A53A` | Highlight on dark only (contrast-safe on ink) |
| `indigo` | `#2E3A8C` | Interactive focus, secondary accent |
| `moss` | `#2F6650` | Success, climate theme |
| `white` | `#FFFFFF` | Cards |

All text/background pairs used meet WCAG 2.2 AA (4.5:1 body, 3:1 large text and UI). Turmeric is never used for text
on light backgrounds. Focus rings: 3 px indigo outline + 2 px offset on light, turmeric on dark.

## 6. Spacing and layout

- 4 px base unit; section rhythm `clamp(4rem, 9vw, 8rem)`; container max 1240 px with 16–40 px fluid gutters.
- 12-column grid on desktop with asymmetric editorial splits (5/7, 4/8); single column on mobile.
- Cards in grids are equal height (CSS grid + flex column, footer pinned to bottom).
- Radii are small (4–6 px): textile and paper, not app bubbles.

## 7. Photography

Unsplash and Pixabay only (public repo). Subjects: collective work, hands with tools, water points, classrooms from
behind or wide, fields, coastlines, markets, volunteers. Avoid identifiable vulnerable people in distress, avoid
brand logos. Duotone-friendly: images sit on ink overlays where text overlaps.

## 8. Motion principles

- **Purposeful:** motion explains (the thread connects sections; progress fills to its value) or orients (page
  reveal), never decorates for its own sake.
- **Calm:** 400–900 ms, `power2.out` / custom ease; no bounces, no parallax on text.
- **GSAP** for scroll-linked thread drawing and section reveals; **Motion** for component interactions (mobile menu,
  filter result transitions, form success states).
- **Reduced motion:** `prefers-reduced-motion: reduce` disables ScrollTrigger animation, shows final states, removes
  transforms; a global CSS guard shortens all transitions.
- Content is never hidden waiting for JS: reveals start from visible content when JS is unavailable.

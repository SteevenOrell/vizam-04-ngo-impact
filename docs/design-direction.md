# Design direction — Weftline Collective

VIZAM concept project 04 (NGO and social impact). **Fictional organization.** Direction revised 2026-11-06 after
`docs/REFERENCE_ANALYSIS.md`: closer to the editorial, photograph-led feel of higherlifefoundation.org (characteristics
only, no copied code, assets, text, logo or compositions), **keeping the brown accent**. This supersedes the first
"indigo, loom and ledger" direction.

## 1. Brand

**Name:** Weftline Collective (short form: Weftline).

**Idea:** in weaving, the *weft* is the thread that passes across the fixed warp and binds it into cloth. Communities
are the warp; Weftline is the crossing thread: funding, tools, training and digital services that tie local efforts
together without replacing them. The woven thread survives only as a subtle accent (logo, faint line in two sections).

**Positioning line:** "We are the crossing thread."

**Voice:** plain, specific, warm, never pitying. Communities are the subject of sentences, not objects of rescue.

**Geography:** an invented regional network (Saren Valley, Kestrel Coast, Ombra Highlands, Tamsin Delta, Lowmere Plains).

**Honesty labels (unchanged, mandatory):** "VIZAM concept project — fictional organization" in the top notice and the
footer; "Illustrative figures for a fictional organization." beside every impact figure; "Demo — no money is taken" on
donations; forms are labelled demo submissions.

### Name check (done 2026-11-05)

Web searches for `"Weftline"`, `"Weftline Collective"` and `"Weftline" nonprofit OR charity OR foundation OR NGO`
returned no organization of that name, in the nonprofit field or elsewhere. The nearest results were unrelated:
the WEFT women entrepreneurs' foundation (different name, India), the Worldline corporate foundation
(payments company), Weave Foundation (UK charity), "Weft" textile labels and a "GL Weft Linea" hair-extension
product. A web search cannot rule out a tiny local group; the site is labelled fictional everywhere.


## 2. Look and feel

- White page, generous whitespace, asymmetric two-column rhythm: label and big title left, narrow body copy (about
  30 rem) and imagery right.
- Photography leads: a full-viewport photographic hero with the headline low in the frame, full-bleed photo bands with
  a large statement, tall image pairs with captions, one rounded feature card per page for the featured item.
- One accent. Brown marks every primary action, the eyebrow bullets and focus. Everything else is ink, grey or white.
- Alternate bands in a very light warm grey separate sections; no textures, no ledger rules, no dye tags.

## 3. Signature elements (shared UI in `components/ui`)

1. **Eyebrow** with a small brown square bullet (`Eyebrow`; the bullet lightens on dark photo sections).
2. **Two-tone section titles**: dark first part, grey second part (`SectionHeading titleMuted`, `.title-muted`).
3. **ArrowLink**: text plus a square brown arrow chip (`ArrowLink`); `ButtonLink` is the filled brown button.
4. **FeatureCard**: large rounded photo card with gradient, text and one action.
5. **ImagePair**: two tall captioned photographs, the second offset down.
6. **PhotoBand**: full-bleed photo with a large overlaid statement.
7. **Header**: transparent with white text over a photographic hero, solid white after 24 px of scroll; grouped nav
   (What We Do, About, Insights, Impact, Contact) with accessible disclosure dropdowns, a plain Donate (demo) link and
   a filled brown "Get Involved" button (to /volunteer). Mobile keeps the modal menu with focus trap.
8. **Thread accent**: the woven line may appear at low opacity; it never competes with photography.

## 4. Typography and colour

- **Display:** Outfit (next/font), a geometric sans, weights 300 to 500. Headings are light/regular, never bold.
- **Text and UI:** Inter, 400 to 600, 1 rem body at 1.65 line height.
- **Scale (fluid):** heading-xl 2.4 to 4.75 rem, heading-lg 2.1 to 3.9 rem, heading-md 1.75 to 2.9 rem.
- **Tokens** (Tailwind `@theme` in `app/globals.css`):

| Token | Hex | Use |
|---|---|---|
| `ink` | `#14120F` | Text, dark footer and menu |
| `ink-soft` | `#57524B` | Body copy on white (7.7:1) |
| `ink-muted` | `#CFC8BE` | Muted text on ink |
| `page` | `#FFFFFF` | Page background |
| `band` | `#F5F2ED` | Alternate warm-grey section |
| `accent` / `accent-dark` | `#A8402C` / `#8A3322` | The one accent; white text on it is 6.1:1 / 8.2:1 |
| `accent-tint` | `#EFCDBF` | Light brown tint, dark backgrounds only (bullets, links on ink) |
| `title-grey` | `#8B857D` | Second tone of titles (large text, 3.65:1, AA for large text) |
| `graphite` | `#3D3832` | Dark neutral (tags) |
| `rule` | `#E4DED5` | Hairlines |

Type scale classes: `heading-xl`, `heading-lg`, `heading-md`. Layout helpers in `components/ui/primitives.tsx`:
`Section` and `Split` (5/6 column rhythm). Inner pages open with `PageHero`: eyebrow, two-tone title, narrow lede and
one wide rounded photograph, with no text on the photograph.

Photo overlays use only as much black gradient as needed for AA on the text that sits on them.

## 5. Spacing and layout

- 4 px base unit; section rhythm `clamp(4rem, 9vw, 8rem)`; container max 1240 px with 16–40 px fluid gutters.
- 12-column grid on desktop with asymmetric editorial splits (5/7, 4/8); single column on mobile.
- Cards in grids are equal height (CSS grid + flex column, footer pinned to bottom).
- Radii are small (4–6 px): textile and paper, not app bubbles.

## 6. Photography (clear images)

Unsplash and Pixabay only (public repo). Subjects: collective work, hands with tools, water points, classrooms from
behind or wide, fields, coastlines, markets, volunteers. Avoid identifiable vulnerable people in distress, avoid
brand logos. Bright, sharp, well-exposed images where the subject reads at once; no dark, blurry, filtered or
low-contrast pictures; people shown working, learning and building. Overlays only as strong as AA text needs.

## 7. Motion principles

- **Purposeful:** motion explains (the thread connects sections; progress fills to its value) or orients (page
  reveal), never decorates for its own sake.
- **Calm:** 400–900 ms, `power2.out` / custom ease; no bounces, no parallax on text.
- **GSAP** for scroll-linked thread drawing and section reveals; **Motion** for component interactions (mobile menu,
  filter result transitions, form success states).
- **Reduced motion:** `prefers-reduced-motion: reduce` disables ScrollTrigger animation, shows final states, removes
  transforms; a global CSS guard shortens all transitions.
- Content is never hidden waiting for JS: reveals start from visible content when JS is unavailable.

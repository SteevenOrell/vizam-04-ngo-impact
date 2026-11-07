# Reference analysis — higherlifefoundation.org (inspected 2026-11-06)

Inspected once with headless Playwright (desktop 1440 px and mobile 390 px, home page, viewport screenshots plus
computed styles). Only the home page was inspected; inner pages, hover states and animation timing were **not**
verified. Purpose: creative direction for the Weftline redesign. We translate characteristics; we do not copy code,
assets, copy text, logo or exact compositions.

## What the reference does (verified on the home page)

- **Hero:** full-viewport, full-bleed photograph (close, human, editorial) under a dark gradient. Headline bottom-right
  of the frame in a large (about 52 px) light-weight geometric sans, white. Below it a single small text link with a
  square arrow icon button. A tiny "Welcome" eyebrow with a square bullet sits left, at mid-height.
- **Header:** transparent over the hero, white text. Logo top-left. Right-aligned nav with dropdown chevrons
  (What We Do, About Us, Insight & Resources) plus plain links (Impact, Contact) and one filled "Get Involved" button.
- **Typography:** geometric humanist sans ("Cera Pro" display, Helvetica Neue body). Headlines are regular/light, not
  bold. Section titles can be two-tone: first line near-black, second line mid-grey ("Higherlife / Foundation").
  Eyebrows are small (14 px) with a square bullet marker.
- **Layout:** white page, very generous whitespace, asymmetric two-column rhythm: small label and big title in the
  left column, narrow body text (about 470 px measure, small size, grey) and imagery in the right column.
- **Imagery:** large, sharp, well-exposed photographs with real people; pairs of tall portraits side by side with a
  small caption underneath. Full-bleed photo bands with big overlaid statements. Rounded dark feature cards with a
  photo and gradient and a CTA.
- **Accent:** one bright lime accent used only for the primary action (square arrow buttons, "Get Involved").
- **Sections seen:** hero, About, feature/announcement card, full-bleed statement band, commitments, what we do,
  impact, join the mission, collaborate with us, location details. Long page (about 15,000 px at 1440 px).
- **Cookie notice** bottom-left card (we do not need one: no tracking in this concept).

## Translation for Weftline (keep brown accent)

| Reference trait | Weftline redesign |
|---|---|
| Lime accent on arrow buttons | **Brown accent** (existing madder/brown, `#8a3322`–`#a8402c`) for every primary action, square arrow buttons, focus rings, eyebrow bullets. Remove turmeric/indigo/moss as accents. |
| White page, light geometric sans | White (`#fff`) and a very light warm grey for alternate bands; near-black ink; geometric sans at light/regular weight (e.g. Outfit or similar, via next/font; body Inter or similar). |
| Full-bleed photo hero, headline bottom | Home hero: one clear, bright full-bleed photo, dark gradient only as strong as needed for AA contrast, headline bottom-right/left, one arrow link, transparent header turning solid on scroll. |
| Eyebrow with square bullet | Small eyebrow labels with a brown square bullet on every section. |
| Two-tone titles | Section titles in two tones: dark first part, grey second part. |
| Image pairs with captions | Tall portrait pairs with captions for About, Programs, News. |
| Full-bleed statement bands | One full-bleed photo band per long page with a large statement. |
| Rounded dark feature cards | Featured campaign card: photo, gradient, brown arrow CTA. |
| Nav with dropdowns + "Get Involved" | Keep our 11 pages; group in nav (What We Do, About, Insights, Impact, Contact) with accessible dropdowns or simple links, plus a filled brown "Get Involved" (→ Volunteer). Donate stays a clearly labelled demo. |

## Keep from the current build
Content model, 11 pages, forms and server actions, demo labelling ("Demo — no money is taken", "illustrative figures
for a fictional organization", "VIZAM concept project — fictional organization"), tests, accessibility behaviour, the
<250 px 500 px lock. The woven-thread motif may remain as a subtle accent but must not dominate.

## Image rules ("clear images")
Bright, sharp, high-resolution, well-exposed photographs where the subject is clearly readable; no dark, blurry,
heavily filtered or low-contrast images; no stigmatizing close-ups of vulnerable people; people shown as agents
(working, learning, building). Unsplash and Pixabay only (public repo), WebP, credits in `content/credits.ts` and README.

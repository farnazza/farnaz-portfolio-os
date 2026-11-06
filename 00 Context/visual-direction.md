# Visual direction

Source: three screenshots shared by me on 2026-11-02 (two of tomasnozina.com, one of a "Jay Brown" portfolio), plus my stated preferences. Font chosen from a side-by-side comparison of Inter Tight + Inter, Inter, DM Sans and Manrope.
Character: Light gray ground, flat rounded image cards, very large tight sans-serif headlines with small quiet UI text, one accent color, color comes from the project work itself.

## Colors

Background: #ECECEC (sampled, Tomas screenshots)
Background texture: small static white dots (#FFFFFF, 1 to 1.8px, randomly placed) on #ECECEC, like old paper (founder, 5 Nov 2026). On every page, behind everything; cards and covers keep their own flat backgrounds. No motion. File: `02 Site/assets/paper-dots.svg` (600px tile, 4 KB). Exception to "Avoid decorative UI" (Design OS rules), chosen by me.
Surface (light cards, panels): #F7F7F4 (sampled, Tomas "Pagent" card)
Buttons / pills: #FFFFFF (sampled, Tomas pill buttons)
Hero card stack: no outline, surface #F7F7F4 behind each card's image, 380px wide on desktop (founder, 5 Nov 2026).
AI stack pills: surface #F7F7F4 fill, no outline, text primary labels (founder, 5 Nov 2026). Since 6 Nov 2026 (founder): "My AI OS" pills, 44px tall, each shows a one-line tooltip (#0E0E0E fill, white 13px text) on hover, focus or tap.
Outline button (founder, 6 Nov 2026): the CTA pill with a transparent fill and a 1.5px #0E0E0E outline, for secondary actions such as "See my work".
Dark button: the hero CTA "Let's work together" uses text primary #0E0E0E as its fill with a #FFFFFF label (founder, 5 Nov 2026; contrast about 19:1). The email icon stays accent #6E64FD (about 4.5:1 on #0E0E0E).
Text primary: #0E0E0E (sampled, Jay Brown screenshot)
Text secondary: #666666 (darkened from sampled #6D6D6D to pass WCAG AA: about 4.8:1 on #ECECEC)
Accent: #6E64FD (supplied by me, 2026-11-02)
Mockup background: #D4D5DA (lighter than the first value #BABBC1, for more contrast with the dark phone frame; changed by me, 2026-11-05; Claude proposed the exact value). Exception to "color comes from the project work itself": used only as the background behind device mockups in card media. Not for UI, text or other surfaces.

Accent contrast (WCAG 2.2 AA):
- On #ECECEC background: 3.62:1
- On #F7F7F4 surface: 3.99:1
- On #FFFFFF pills: 4.28:1
- With #0E0E0E text on top of the accent: 4.51:1
- With #FFFFFF text on top of the accent: 4.28:1

Accent usage rules:
- Allowed: large text (24px+ regular, or 18.66px+ bold), icons, focus rings, UI shapes and fills. These need 3:1, which the accent passes on every surface.
- Not allowed: #6E64FD for small text (body, captions, nav links, small labels) on any site surface. It fails the 4.5:1 minimum everywhere.
- If a button is filled with the accent, its label is #0E0E0E (passes at 4.51:1), or #FFFFFF only when the label is large text.
- Small accent text (inline links, small labels): use Accent text #4F43FD (chosen by me, 2026-11-03). Same hue as #6E64FD, darker. Contrast: 5.00:1 on #ECECEC, 5.51:1 on #F7F7F4, 5.91:1 on #FFFFFF.
- #4F43FD is a shade of the one accent, not a second accent. Use it only for small text. Use #6E64FD everywhere else.
- Marker highlight: #6E64FD at 18% opacity (shows as about #D5D4EF on #ECECEC), behind a highlighted quote, like a marker (chosen by me, 5 Nov 2026; Claude proposed the exact value). A tint of the one accent, not a new color. Text on it: text secondary #666666 at 19px, 600 (large text): 3.96:1, passes 3:1. At 17px it would fail 4.5:1.
Do not introduce any other colors. Project images and mockups carry their own color; UI does not. The one exception is the mockup background #D4D5DA above.

## Typography

Font: Manrope only, for every role.
Heading: Manrope, 600, letter-spacing about -0.04em, roughly 40px (mobile) to 88px (desktop) for the home hero. ⚠️ Size range is a proposal from the font comparison page, not read from a file.
Body: Manrope, 400, about 17px, line-height 1.6, max about 60 characters per line (case study pages: full width, see Case study layout).
Caption / label: Manrope, 400 to 500, about 13px, color text secondary.
UI (nav, buttons): Manrope, 500, about 15px.
Do not introduce other font families.
Load via: Google Fonts link tag
`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&display=swap">`
Fallback stack: `"Manrope", system-ui, sans-serif`

## Layout

Max content width: 1272px (measured from tomasnozina.com screenshots, Retina, 2026-11-03). Side margin 120px at a 1512px window; minimum 16px.
Base spacing unit: 8px (proposal, not measured).
Home featured cards: mosaic of two 624px squares side by side, then one full-width card (1272 x 624), repeating. Gap 24px (measured). One column on mobile.
Playground tiles: three columns of smaller squares (two on tablet, one on mobile), gap 24px.
Card corner radius: 40px (measured from tomasnozina.com screenshots).
Buttons: fully rounded pills, white on the gray background, minimum height 44px (WCAG 2.2 touch target).
Section padding: ⚠️ not measured. Proposal: 96px vertical on desktop, 64px on mobile. Lots of whitespace overall.

## Case study layout (chosen by me, 2026-11-05)

Every case study page follows this. Any revision of a case study page is checked against it before it is shown or sent. If a revision needs something not defined here, flag it and ask.

### Type scale: "Editorial"
All Manrope. Headings 600, letter-spacing about -0.03em to -0.04em.

| Role | Desktop | Mobile ⚠️ proposal | Weight | Color |
|---|---|---|---|---|
| Meta and section labels | 13px | 13px | 500 | text secondary (meta), accent text #4F43FD (section labels) |
| Title (H1) | 64px | 36px | 600 | text primary |
| Intro (lead) | 28px, line-height 1.3 | 20px | 500 | text secondary |
| Section heading (H2) | 40px | 28px | 600 | text primary |
| Subheading (H3) | 24px | 20px | 600 | text primary |
| Body | 17px, line-height 1.6 | 17px | 400 | text primary |
| Big numbers | 64px | 44px | 600 | accent #6E64FD (large text only) |

Only these sizes. No in-between sizes.

### Text width: everything full width
Text and visuals both span the full content width next to the side menu. Exception to "Body: max about 60 characters per line" above, for case study pages only.

### Spacing: "Airy" (8px base)
| Between | Desktop | Mobile ⚠️ proposal |
|---|---|---|
| Sections | 128px | 80px |
| H2 to first content | 24px | 24px |
| Paragraphs | 16px | 16px |
| H3: above / below | 48px / 16px | 40px / 16px |
| Around visuals | 48px | 32px |
| Title to cover | 32px | 24px |
| Cover to intro | 64px | 40px |

### Hierarchy
**Page order:** meta line, title (H1), cover, intro (lead), snapshot (Role, Timeframe, Tools, Status), then the sections with the side menu.

**Acts (Her Body, Her Mind, founder, 5 Nov 2026):** the sections are grouped into 3 acts (see `site-brief.md`). Each act opens with a number-led title moment (option 2B, chosen by me, 5 Nov 2026): the act number ("01", "02", "03") at 64px, 600, accent #6E64FD, with the act title next to it at 40px, 600, also accent #6E64FD (whole headline purple, changed by me, 5 Nov 2026; 3.62:1, large text), baseline-aligned, 24px apart. 128px above, 48px below. Mobile ⚠️ proposal: 44px number, 28px title, 80px above. The section pattern below applies inside each act.

**Side menu:** sticky on the left, links to every section, highlights the section in view. On mobile it becomes a row of links above the sections.

**Every section follows the same pattern:**
1. Small numbered label, for example "02 · Where it started" (13px, accent text).
2. Section heading (H2).
3. One short line that says the point of the section (lead style). ⚠️ The wording is mine to approve, section by section.
4. The visual: an image, a quote, the timeline or numbers.
5. Short supporting text.

Visual first, text second. Keep copy short ("Lots of text" is in Do NOT generate).

## Motion

Only the interactions listed in `00 Context/site-brief.md`. Add nothing beyond them.
All motion respects prefers-reduced-motion.

## Do NOT generate

- More than one accent color, or any color not listed above.
- Borders on case study cards. Exception (founder, 6 Nov 2026): the feature grids on the Her Body, Her Mind case study (hero facts, story cards, Me/AI cards, The problem, The insight, Decisions as hypotheses, What's next): white container, 1px #ECECEC border and dividers, no shadow. Icons there: Lucide 0.460.0 (ISC), inlined, in the accent.
- Shadows of any kind. (The insight card and hero card shadows were removed on 6 Nov 2026, when they joined the feature grid style.) Also (founder, 6 Nov 2026): the Her Body, Her Mind happy path panels, which use the HBHM design system's own `shadow-card-elevated` and 1px `border-primary`, and thin grid divider lines (#0E0E0E at 10%) between the cells.
- Gradients.
- Fonts other than Manrope.
- Lots of text: keep copy short, let the work carry the page.
- Extra micro-interactions or motion beyond the site brief.
- More than a few icons. Use an icon only where it carries meaning (e.g. the email icon in the CTA).
- Dense layouts. Keep generous whitespace.
- An accent purple chosen by Claude.

## Contact form (founder, 6 Nov 2026)

- Error colour: #C01600 (`--error`), taken from the Her Body, Her Mind design system `color/error/600` by the founder. 5.3:1 on #ECECEC, 6.3:1 on white. Always with a "!" icon and words, never colour alone.
- Fields: white fill (`--pill`), no stroke at rest, radius 24px, 47px height (textarea 165px), Manrope 17px; labels 15px/500 above every field. Focus: border #0E0E0E plus the focus ring. Error: #C01600 border, 2px.
- ⚠️ Accepted exception (founder, 6 Nov 2026): without a stroke the white field is about 1.2:1 on #ECECEC, below the 3:1 WCAG 2.2 AA asks for input boundaries (1.4.11). Field height 47px meets the 44px touch target.
- Submit: the dark CTA (`.cta--dark`).


# Visual direction

Source: three screenshots shared by me on 2026-11-02 (two of tomasnozina.com, one of a "Jay Brown" portfolio), plus my stated preferences. Font chosen from a side-by-side comparison of Inter Tight + Inter, Inter, DM Sans and Manrope.
Character: Light gray ground, flat rounded image cards, very large tight sans-serif headlines with small quiet UI text, one accent color, color comes from the project work itself.

## Colors

Background: #ECECEC (sampled, Tomas screenshots)
Surface (light cards, panels): #F7F7F4 (sampled, Tomas "Pagent" card)
Buttons / pills: #FFFFFF (sampled, Tomas pill buttons)
Text primary: #0E0E0E (sampled, Jay Brown screenshot)
Text secondary: #666666 (darkened from sampled #6D6D6D to pass WCAG AA: about 4.8:1 on #ECECEC)
Accent: #6E64FD (supplied by me, 2026-11-02)

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
Do not introduce any other colors. Project images and mockups carry their own color; UI does not.

## Typography

Font: Manrope only, for every role.
Heading: Manrope, 600, letter-spacing about -0.04em, roughly 40px (mobile) to 88px (desktop) for the home hero. ⚠️ Size range is a proposal from the font comparison page, not read from a file.
Body: Manrope, 400, about 17px, line-height 1.6, max about 60 characters per line.
Caption / label: Manrope, 400 to 500, about 13px, color text secondary.
UI (nav, buttons): Manrope, 500, about 15px.
Do not introduce other font families.
Load via: Google Fonts link tag
`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&display=swap">`
Fallback stack: `"Manrope", system-ui, sans-serif`

## Layout

Max content width: ⚠️ about 1270px (estimated from the Tomas screenshot, assuming a 2x retina capture). Confirm or adjust.
Base spacing unit: 8px (proposal, not measured).
Card grid: two columns on desktop, one column on mobile. Gap about 24px (estimated from the Tomas screenshot, 2x capture).
Card corner radius: ⚠️ about 28 to 32px (estimated by eye from the Tomas screenshot). Confirm.
Buttons: fully rounded pills, white on the gray background, minimum height 44px (WCAG 2.2 touch target).
Section padding: ⚠️ not measured. Proposal: 96px vertical on desktop, 64px on mobile. Lots of whitespace overall.

## Motion

Only the interactions listed in `00 Context/site-brief.md`. Add nothing beyond them.
All motion respects prefers-reduced-motion.

## Do NOT generate

- More than one accent color, or any color not listed above.
- Borders on case study cards.
- Shadows of any kind.
- Gradients.
- Fonts other than Manrope.
- Lots of text: keep copy short, let the work carry the page.
- Extra micro-interactions or motion beyond the site brief.
- More than a few icons. Use an icon only where it carries meaning (e.g. the email icon in the CTA).
- Dense layouts. Keep generous whitespace.
- An accent purple chosen by Claude.

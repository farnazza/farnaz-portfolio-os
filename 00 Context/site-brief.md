# Site Brief

## Goal (founder, 5 Nov 2026)
- Everyone who lands on the home page understands that I work with AI-assisted workflows.
- Position: a human-first designer who uses AI-assisted workflows and makes the decisions. In my own words (Design OS rules): "AI speeds up my thinking and challenges it, but every decision is mine."
- 🟡 Hypothesis, not a finding: that leading with AI is what my readers look for. They also want range, thought process and interest in the industry (case study brief). Check with 2 or 3 people I'd want to hire me.
- **Honesty rule:** only Her Body, Her Mind was made with AI-assisted workflows (Design OS). The SumUp projects used ChatGPT for documenting only; Zizoo used no AI. Never label or imply SumUp or Zizoo as made with AI-assisted workflows.

## Structure
- Multi-page: home page (with all featured work), one separate page per case study, About, Playground. No separate Work page (removed 2026-11-03 to simplify).
- About page: yes.
- Playground page: yes, one page. Projects that are not UI/UX design: older work between visual design and micro-animation, graphics, illustration, animated graphics.
- Navigation: top bar. Logo only, 56px (48px on phones), no name next to it (links to home), About, Playground, Contact. Work removed (founder, 5 Nov 2026): the work is the hero card stack, so the link did nothing visible.
- Contact: nav link scrolls to the footer. No separate Contact page, no contact form. Contact is an email link.

### Home page
- Opens with a short intro about me. Text: "Home intro line" in `00 Context/bio.md`. Use it as written.
- **AI workflow in the hero (founder, 5 Nov 2026):** under the intro, the thesis line "I work with AI-assisted workflows I build myself, starting from people and ending with a test." (chosen by me, 5 Nov 2026), then my AI stack as surface pills with text, no outline (founder, 5 Nov 2026, replaces the icon idea to keep it simple): Claude Code, Claude Design, ChatGPT, Figma, FigJam. Surface #F7F7F4 fill, no outline, not clickable. ChatGPT is in the stack too (used for Her Body, Her Mind and for documenting the SumUp case studies; founder, 5 Nov 2026).
- **Design OS (founder, 5 Nov 2026):** no page, card or home mention for now. Mentioned only in the Her Body, Her Mind case study.
- **Hero CTA "Let's work together" (founder, 5 Nov 2026):** black (#0E0E0E fill, white label).
- **Hero card stack (founder, 5 Nov 2026):** in the right column of the hero, a looping stack of portrait cards, one per case study (option A from the preview, after references of a "looping stack"). Every 3 s the front card slides away and goes to the back (replaced 6 Nov 2026: with the captions, option B, the stack moves only with the arrows). Hovering (or keyboard focus on) any card brings it to the front and widens it across the whole stack area, showing more of its image; the stack pauses until the pointer leaves (founder, 5 Nov 2026). Hover does not open the case study; a click does. On touch screens, a tap opens the case study. Still with reduced motion. Her Body, Her Mind card: phone on surface #F7F7F4 (not the mockup gray), 5 Nov 2026. No outline, no shadow, surface background (changed 2026-11-05). Cards without an image show "Image to come". Data viz image supplied by me (5 Nov 2026), cropped to the card shape: `02 Site/assets/sumup-data-viz/stack.jpg`; second in the stack, behind Her Body, Her Mind. Profile and settings and Fee summary box images supplied by me (5 Nov 2026), cropped the same way. ⚠️ [STACK IMAGES]: a portrait image per case study, to be chosen by me (SumUp: check the NDA).
- Hero layout (changed 2026-11-05): no photo on the home page. The intro sits in the left column, lined up with the left card column: "Hi, I'm Farnaz," at 64px, then the intro text and the thesis line at 17px, regular 400, line height 1.6, the same as the About body text on all screens (set by me, 5 Nov 2026), the AI stack pills and the black CTA. My round photo (`02 Site/assets/photo.png`, 250px) moved to the top of the About page.
- Featured work on the home page: all 6 case studies, shown only in the hero card stack (the mosaic of project cards below the hero was removed by me, 2026-11-05).
  - Herbody Her Mind
  - SumUp: First time user experience
  - SumUp: Profile and settings
  - SumUp: Data viz for SumUp products
  - SumUp: Fee summary box
  - Zizoo: Components library (full case study, OK to publish)
  - ⚠️ [ORDER]: order of the six, and which two get the full-width cards, to be decided by me.
  - SumUp case studies (2023 to early 2025, all launched): the site shows a short summary only, with a "Request the full case study" CTA (email link). The full case study is shared privately on request, never published on the site or in the repository.
  - ⚠️ [NDA]: being launched or old does not by itself end an NDA. Check the agreement for what the summary may show.
  - ⚠️ [SUMMARY SECTIONS]: decide what each SumUp summary page contains.
  - Case study content: to be written by me, one folder per project in `01 Projects/`. Do not generate case study copy.
- Footer: email link for contact (no contact form), and a CTA to download my resume.
  - ⚠️ [RESUME FILE]: PDF to be supplied by me. It will be public on the live site.
- About page: content from the "Bio" section of `00 Context/bio.md`.

## Case Study Display
- Cards are visual only (full image or animated device mockup). No title under the card.
- ~~Home featured cards: mosaic of two squares side by side, then one full-width card, repeating.~~ Removed 2026-11-05, replaced by the hero card stack.
- Card hover: the image blurs and the project title appears over it.
- Cards with a motion mockup (decided 2026-11-04): a still frame until hovered or scrolling; plays on hover and while the page scrolls; no blur and no title on hover (changed 2026-11-05), title shows on keyboard focus and on touch screens. Background `#D4D5DA` (mockup background, made lighter 2026-11-05). Her Body, Her Mind card: phone only, no desktop (2026-11-05). Phone and desktop mockups with micro animations, recorded from the live prototype with /mockup-motion. With reduced motion on, only the still frame shows.
- Mobile / touch fallback: project title always visible over the image (no hover needed).
- Card shape, image ratio, corners and grid spacing: reference tomasnozina.com.
- No shadows on cards (decided in /visual-direction, 2026-11-02).
- Exact card values: measured, see `00 Context/visual-direction.md`.
- Inside case study: sections with anchor links.
- **Her Body, Her Mind structure (founder, 5 Nov 2026): three acts.**
  - Act 1, Listening: my caregiving, the sharing circle, the interviews, research and insight.
  - Act 2, The system: Design OS, the Discover to Deliver timeline, and the **decision ledger**: cards that each show what AI proposed, what I chose, why, and what the test will check. Every card comes from `decision-log.md`, approved by me before it goes on the page.
  - Act 3, The test: the prototype, decisions as hypotheses, what's next.
  - The side menu shows the 3 acts. Each act opens with a large full-width title moment.
  - Other case studies (not AI-assisted) keep their own structure. Don't force Act 2 on them.
- Cover images: yes. Each case study opens with a large cover image. Exception: Her Body, Her Mind has no cover (removed by me, 5 Nov 2026). It opens with industry tags, title, subtitle, executive summary, snapshot and the problem (heading left, text right), then the three acts. "Where it started" (Act 1) shows its 5 parts as story cards (founder, 5 Nov 2026): title, an overview made of the paragraph's own first sentence (two for "It began at home"), and "Read more", which opens the rest in place and widens the card to the full row. No new copy.

## Motion and Interaction
- Animation level: 3 (richer).
- Scroll: case study cards slide in vertically as they enter the viewport (reference: lofi-folio).
- Scroll: featured cards slide up and settle from a slight tilt (left card tilted left, right card tilted right) as they enter the screen. ⚠️ Interpretation of the tomasnozina.com behavior from a screenshot; confirm.
- Hover on cards: image blurs, project title appears (reference: lofi-folio).
- Card media: animated device mockups (reference: tomasnozina.com).
- CTA micro-interaction: on hover the button extends and shows an email icon. Inspiration from tomasnozina.com, not a copy.
- Footer CTAs (email link, resume download): use the CTA micro-interaction above.
- All motion must respect the "reduce motion" system setting (prefers-reduced-motion).

## References
- Like: https://www.tomasnozina.com/ because of the animated device mockups as card media, the stacking hero cards on scroll, the card grid spacing, the card shape / ratio / corners, the contact form animation and the CTA micro-animation (button extends and shows an email icon).
- Like: https://lofi-folio.framer.website/ because of the micro-interactions on the case study showcase: cards revealing vertically on scroll, and the hover blur with the title appearing.
- Dislike: https://ivomynttinen.com/ (as an example of the type) because it is a blank, dry, text-only home page with a plain list of works and no visuals.

## Do NOT generate
- A text-only home page or a plain text list of works without visuals.
- Project titles under the cards.
- A separate Contact page.
- Exact copies of tomasnozina.com or lofi-folio interactions. Use them as inspiration only.
- A contact form.
- Placeholder intro copy, resume content, case study copy or featured project choices. These are mine to write and decide.
- Invented visual values (spacing, radius, shadow, colours, fonts). These come from `/visual-direction`.

## About page (founder, 5 Nov 2026)
- Layout from my reference screenshot; background (paper dots), nav and footer unchanged. Decorative UI is fine on this page (my exception).
- Top to bottom: portrait centered (`02 Site/assets/images/farnaz-portrait.jpg`, 4:5 crop), "About me" in Manrope 600 overlapping the photo's bottom edge, intro centered (28px), second paragraph smaller and offset right (18px, line height 1.6, on all screens, set by me; 64px below the intro; text secondary). Nav label: "About me" on every page (set by me, 5 Nov 2026). Text is mine, word for word.
- Experience string: a thin line with one loop near the top, drawn as you scroll. One dot per role, most recent first, education last; labels alternate left and right. Progressive disclosure on scroll (founder, 6 Nov 2026, replaces clicking): when the line reaches a dot, the dot fills with the accent and the logo, role, organisation, dates and one line from my CV fade up, and stay open. No clicking; each entry is a heading with its details always in the page for screen readers. At the bottom of the page the line finishes so the last entry appears. Reduced motion: full line, all entries open, no animation. Phones: a gentle vertical line, labels on the right.
- Data: my CV ("Updated C.V .pdf"), plus Zizoo (2020 to 2021, from my home page text; not in the CV). ⚠️ Locations for the jobs are not in the CV, so none are shown.
- Company logos (founder, 5 Nov 2026): under each name on the string, lined up with the label text (under its start on right-hand labels, under its end on left-hand ones), 40px high (Zizoo badge 56px so it reads). Files in `02 Site/assets/logos/`: Her Body Her Mind and SumUp from my SVGs; Zizoo and Studio Into made from my PNGs with a transparent background. Education has no logos.

## Her Body, Her Mind design system bento (founder, 6 Nov 2026)

- Placed after the "Design system and brand guideline" bullet list, before steps 05 to 07.
- 10 tiles: logo (grid, key shapes and logo as stacked layers), colour palette, brand personality, voice and tone, sign-up form that turns into "You're signed up", event card (Open, Full, Moved, Cancelled), list item (S10 workshop rows), typography, tags and badges, dark mode.
- Inside the bento: HBHM tokens and components only (`02 Site/assets/hbhm/`, scoped to `#hbhm-ds`, generated from the export in `01 Projects/01- Her body, Her mind/Assets/design system-tokens/`). Fonts: Fraunces and Inter.
- Copy: personality and voice from the founder; component copy from the design system export; list rows from S10; tile hints drafted by Claude and approved.
- Logo construction lines: `twilight-400` (twilight-200 is 1.6:1 on the page, too faint); grid lines `sand-300`.
- Motion: 500 to 700 ms, ease-out, fades and small lifts; instant with reduced motion.
- Links (founder, 6 Nov 2026): "Join us on Telegram" → https://t.me/+EkbLy9s7T2o5MTE8; Instagram → https://www.instagram.com/herbody.hermind/ (share tracking removed from the link); "Find support" → https://krebsberatung-berlin.de/angebote/counselling-in-english/.

## Home page captions (founder, 6 Nov 2026)

- Option B: under the card stack, the front card's tag and dates, title and description, with previous and next arrows and a count ("3 / 6"). The stack no longer rotates by itself.
- Dates: Her Body, Her Mind since September 2025; Data viz 2022 to 2024; Profile & Settings 2022 to 2023; Fee summary 2023 to 2024; First time user experience 2023 to 2024; Zizoo 2020 to 2021.

## Contact form (founder, 6 Nov 2026)

- Lives on `contact.html` and in the home page footer. Project and other pages link to `contact.html` ("Say hello" in the footer; nav "Contact"). The home hero "Let's work together" scrolls to the footer form.
- About me: a dark "Say hello" CTA under the second paragraph opens `contact.html`; the About and contact pages have no footer. "Download resume" is removed from every page (founder, 6 Nov 2026).
- The form's error message links to farnaz.za@icloud.com (`EMAIL` in main.js).
- Fields: Name, Email, Message, all required. Heading: "Have an idea or a problem to untangle? Say hello." Success: "Thanks, your message is on its way. I'll get back to you soon."
- Formspree: form `meaadwvb`, `action="https://formspree.io/f/meaadwvb"` in index.html and contact.html (tested 6 Nov 2026: Formspree answered 200 ok); hidden `_subject` "New message from portfolio" (SumUp "Request the full case study" links pass their own subject); `_gotcha` honeypot; sent with fetch, plain POST without JavaScript.

## Her Body, Her Mind: the insight card (founder, 6 Nov 2026)

- "The insight" is a white card in the Research section: 4px accent top line (like the role cards) and a soft shadow (approved exception, see visual-direction.md), 32px padding, 24px radius.
- Two columns on desktop with a thin divider, "What helps" and "What gets in the way" (labels approved by the founder); one column on phones. Quotes in `<blockquote>`, upright Manrope (no italic exists); the closing quote is the largest. Barriers as pills: Built for the patient, In German, Weekday evenings.
- 🟡 "Weekday evenings" comes from desk research (landscape section 4), not from participants; kept by the founder.
- Fades and lifts 12px in 500ms the first time it scrolls into view; still with reduced motion.


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
  - SumUp case studies (2023 to early 2025, all launched): the site shows a short summary only. No "Request the full case study" or "Want the details?" section on any SumUp page (removed by Farnaz, 17 Nov 2026); visitors use the footer "Say hello". The full case study is never published on the site or in the repository.
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
- Scroll: sticky process steps in case studies (founder, 16 Nov 2026): in "What I did", the numbered steps scroll on the left and the visual on the right stays in place and swaps to the step that reaches the middle of the screen. Each step shows What, How and Outcome (Her Body, Her Mind step style). Phones: each visual sits under its step. Reduced motion: the visual swaps without fading.
- Scroll: annotated screens in case studies (founder, 16 Nov 2026): labels on the left with a bracket pointing at each part of the screen slide in one after another when the screen comes into view; first used for the contextual drop-down menu in Profile and settings, 03 Key decisions. Phones: the labels sit as a list under the screen. Reduced motion: labels show at once.
- Scroll: principles board in case studies (founder, 17 Nov 2026): in Data viz 03 Key decisions, the black principles board (rebuilt in HTML from the "Start Here" board) draws each box's white outline once, in order, with a dot riding the tip, when the board scrolls into view; the text stays still. With reduced motion the outlines show at once.
- Video: looping case study animations (founder, 17 Nov 2026): play only while in view, never with reduced motion, and show a still poster before they start (Data viz hero, color strategy and the three widgets).
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
- Formspree: form `meaadwvb`, `action="https://formspree.io/f/meaadwvb"` in index.html and contact.html (tested 6 Nov 2026: Formspree answered 200 ok); hidden `_subject` "New message from portfolio" (the SumUp request links were removed on 17 Nov 2026); `_gotcha` honeypot; sent with fetch, plain POST without JavaScript.

## Her Body, Her Mind: the insight card (founder, 6 Nov 2026)

- "The insight" is a white card in the Research section: 4px accent top line (like the role cards) and a soft shadow (approved exception, see visual-direction.md), 32px padding, 24px radius.
- Two columns on desktop with a thin divider, "What helps" and "What gets in the way" (labels approved by the founder); one column on phones. Quotes in `<blockquote>`, upright Manrope (no italic exists); the closing quote is the largest. Barriers as pills: Built for the patient, In German, Weekday evenings.
- 🟡 "Weekday evenings" comes from desk research (landscape section 4), not from participants; kept by the founder.
- Fades and lifts 12px in 500ms the first time it scrolls into view; still with reduced motion.

## Her Body, Her Mind: happy path (founder, 6 Nov 2026)

- The design system part of the case study shows only its heading, then the bento; the paragraph and the six bullets were removed (founder, 6 Nov 2026).

- Replaces the "Visual to come: the chosen concept" placeholder in Act 3. Four live panels from the prototype, in HBHM tokens and components (no phone frames): S1 Upcoming workshops (clay card only), S2 Event detail (Open), S3 Sign up (larger cell), S4 You're signed up. Grid with thin divider lines; captions "Bold title. Muted description."; "Try it" on each panel; one "Restart".
- Panel 1: clicking the clay card opens the event detail inside the same panel, as in the prototype, with an "All workshops" back link (founder, 6 Nov 2026).
- Finishing a step lights up the next panel (scrolls to it on phones) and announces it. First name and the emails choice carry over to S4 ("You're signed up, [first name]", from implementation-document.md). Nothing is sent or stored.
- Copy from the prototype screens, with the founder's fixes (Barsega studio, 2 PM, capital H) and the founder's privacy text. Left out: back links, the hero, "What you'll do" (example wording), "See all workshops", "Contact us" and "Read the privacy notice" (no pages behind them).
- Photo: `02 Site/assets/hbhm/workshop-clay.jpg` (founder's), also used in the bento's event card.

## Her Body, Her Mind: case study hero (founder, 6 Nov 2026)

- Replaces the old title block and the "Executive summary" (its text and snapshot now live in the card). Top to bottom: the HBHM logo (`assets/logos/herbody-her-mind.svg`, alt "Her Body, Her Mind logo"), the h1, the industry line, then a card in The insight style beside one happy path panel. No background band.
- Card: the founder's headline and body text, a divider, then meta: Role, Approach, Timeline, Platform (founder's copy), plus Tools and Status kept from the old snapshot (founder, 6 Nov 2026). 4 columns on desktop, 2 on phones.
- Panel: the prototype home page's "Upcoming workshops" (Main.dc.html), two cards: Hand building with clay and Between sound & stillness (typos fixed: "3 places left", "3 PM", "Svera studio"). Photos from the prototype: `workshop-clay.jpg`, `workshop-sound.jpg`. Scrolls inside, soft hover lift, "Try it" hint. The first card opens the event detail in the panel, with "All workshops" to go back; its "Reserve your place" moves down to the happy path's sign-up panel (founder, 6 Nov 2026). Overlaps the card's padded edge by 40px on desktop.
- Fade and lift on load, card first, panel 150ms later; still with reduced motion.
- Revised (founder, 6 Nov 2026, option A from a preview): 120px between the site logo and the HBHM logo; logo and title centred, title 28px (24px on phones; founder asked for 20px smaller); the headline shortened by the founder to "Designing a first service for women caring for someone with cancer."; the industry line became three pills filled with #4F43FD (accent text colour) and white text, 5.91:1 (founder asked for white text, 6 Nov 2026) (Caregiver Support, Mental Wellbeing, FemTech) at the top of the first card; the card split in two, story card (accent top line) and facts card (2 columns); card and panel centred as a group, 15px apart, no overlap.

## Her Body, Her Mind: feature grids (founder, 6 Nov 2026)

- The problem, Decisions as hypotheses and What's next are each one white container split into cells by thin dividers (framer.com feature grid as reference, light version). Each cell: a Lucide line icon in the accent, a bold title, muted text. Cells warm to the surface colour on hover; each grid fades in once.
- The problem: 3 cells. Titles "Hard to switch off" and "Support built for the patient" (founder's); the paragraph split across the cells unchanged; the quote large and upright.
- Decisions: 5 cells, 3 then 2 (the last one twice as wide for its long test text); "Why" and a quieter "What the test will tell me" footer.
- What's next: the intro sentence, then 5 numbered cells with the five bullets as titles.
- Icons: brain, stethoscope, quote; message-circle, wallet, mail, quote, map-pin; hand, clock, battery-medium, users, calendar-check.
- Same style for the story cards in "Before the design process" (3 then 2; "Read more" still opens a card across the row) and the Me/AI cards (4 columns, no accent line; "01" and the phase as a black title, Me/AI pills kept). Titles black 17px everywhere (founder, 6 Nov 2026). Icons: house, ear, messages-square, heart-handshake, focus; search, target, lightbulb, package.
- Hero and The insight joined the same grid style (founder, 6 Nov 2026), with no accent line and no shadow. Hero: one grid with a full-width lead cell (purple pills, headline, text) and six fact cells with icons (user, sparkles, calendar, smartphone, wrench, circle-check). The insight: heading above the grid, two cells, "What helps" (hand-heart) and "What gets in the way" (circle-slash); quotes and barrier pills kept.

## Cache (6 Nov 2026)

- Every page links its stylesheets and scripts with a version tag (`style.css?v=20261106i`). GitHub Pages lets browsers keep these files for 10 minutes, so a visitor could get a new page with an old stylesheet. Change the tag on every page whenever CSS or JS changes, before sending to GitHub.

## Home hero refresh (founder, 6 Nov 2026)

- One column: intro, then the card stack below it on every screen size (it was in a right column on desktop).
- Copy (founder's): intro from bio.md (founder, 6 Nov 2026): "a Berlin-based product designer with 7+ years in digital products. My mixed bag of crafts shapes how I think and design." The About page intro uses the same line in full, starting "Hi, I'm Farnaz,". Second paragraph "I build my own AI-assisted workflows, starting from people and ending with a test. AI speeds me up. Every decision is mine."
- "My AI OS" label (case study label style) above the pills. Tooltips: Claude Code "Builds and ships this portfolio."; Claude Design "The source of truth for my design systems."; ChatGPT "Helps me write up and document my case studies." (Claude's suggestion from the honesty rule above); Figma "Where I explore and refine UI."; FigJam "Where I map journeys, run workshops and synthesise research." (founder added "synthesise").
- Buttons: "See my work" (outline) scrolls to the card stack; "Let's work together" (dark) goes to the footer form. On phones they stack full width, dark button first.
- Proof line removed (founder, 6 Nov 2026). The neue fische tag was tried and removed (founder, 6 Nov 2026). "My AI OS" label 17px, 600. More space before the highlighted paragraph (32px) and above the label (48px). Contact form centred in the home footer and on the contact page. On phones the card fan is clipped at the screen edge so the page no longer scrolls sideways. Everything in the hero is centred; the first paragraph is 20px and exactly as wide as the headline; the second paragraph has the light purple marker from the Her Body, Her Mind case study, with dark text.
- Staggered fade and lift on load, 500ms each, 100ms apart; still with reduced motion.
- Home footer label now reads "Say hello" at 17px, 600, accent text (founder, 6 Nov 2026). The Her Body, Her Mind stack card image was rebuilt: no flat black phone frame, the screen on white with rounded corners and a soft shadow, like the other stack cards (old version kept in the scratchpad).
- About page: the "About me" headline is now 40px (28px on phones), the size of the contact heading, set below the portrait instead of overlapping it (founder, 6 Nov 2026).
- About page intro now matches the home hero's first paragraph (20px, line height 1.5, #666), and the second paragraph has the same style in the same centred 420px column, 48px below (founder, 6 Nov 2026; replaces the 28px intro and the off-centre second paragraph). "Say hello" centred under them.

## "My AI OS" tools marquee (founder, 18 Nov 2026)
- Replaces the five "My AI OS" pills and their tooltips in the home hero (option A). Live HTML, not video. Nine tools: VS Code, Claude Code, Claude Design, Notion, FigJam, Figma Make, Figma Design, ChatGPT, Skills.
- Two rows (founder, 18 Nov 2026; first built with four), 36 px/s, entrance from the side, pauses on hover and with a pause button (WCAG 2.2.2, Claude's addition). Screen readers get one plain list. Reduced motion: one static wrapped row.
- The pill tooltips (what each tool is for) are gone. ⚠️ [Bring them back somewhere? There is no copy for VS Code, Notion, Figma Make, Figma Design or Skills.]
- Hidden for now (founder, 18 Nov 2026): the "My AI OS" label and both hero buttons ("See my work", "Let's work together"). Kept as HTML comments in `02 Site/index.html` (the "--" in the button classes is written as "&#45;&#45;" inside the comment; change it back when restoring). The hero now ends with the tools marquee, then the case study grid. Screen readers still hear the tool list as "My AI OS".

## Intro layout (founder, 18 Nov 2026)
- From a reference screenshot (a name on the left, a large statement on the right). Desktop (1024px and up): "Hi, I'm Farnaz," 24px 500 in the first grid column; the intro 30px (founder, 19 Nov 2026; was 40px) in columns 2 and 3, with "a Berlin-based product designer" in text primary and the rest in text secondary; the AI workflow line below it, marker kept. Left aligned. Below 1024px everything stacks, intro 28px. Same words as `bio.md` "Home intro line".
- ⚠️ [The reference has a small line under the name ("©2008 — 2026"). Nothing added; ask what, if anything, goes there.]
- Changes (founder, 19 Nov 2026): name "Farnaz Zamanian" at 28px replaces "Hi, I'm Farnaz,"; the purple marker on the AI workflow line is removed; on desktop the intro and AI line start 16px left of the second grid column, closer to the name; more space around the marquee (intro to marquee 80px, was 48px; marquee to cards 104px, was 72px).

## Home page order and nav (founder, 19 Nov 2026)
- Order: intro (name, intro text), case study grid, workflow section (the AI workflow line at 30px, 24px on phones, then the tools marquee), contact form in the footer. About 160px between the cards, the workflow section and the form; 120px between the intro and the cards.
- The workflow line is the section heading (h2). The marquee rows slide in when the section scrolls into view.
- Top navigation on every page: links centred in the bar, logo on the left. Below 480px wide the links stay on the right (Claude's choice: centred they hit the logo).
- Workflow line regular 400 in text secondary #666666 (founder, 19 Nov 2026; tried bold 700 and semibold 600 first).

## Contact form, minimal (founder, 19 Nov 2026)
- From a reference screenshot. Home footer and contact page: heading (existing copy, unchanged) on the left (the portrait was tried and removed, founder, 19 Nov 2026); the form on the right (stacked on phones). Fields are a single #0E0E0E underline (replaces the white pill fields of 6 Nov 2026); uppercase 13px labels in text secondary; a text button "Send message →". The purple "Say hello" label above the heading is removed (founder, 19 Nov 2026).
- Not taken from the reference: its heading "Let's talk.", its intro line, its privacy note and its serif font. ⚠️ [Add a short line under the heading or a privacy note? No copy yet.]
- Fixed: on contact.html, Playground was also marked as the current page.
- Intro text replaced (founder, 19 Nov 2026), see `bio.md` "Home intro line". The first sentence, "Products that make sense, not just look good.", is in text primary; the rest in text secondary (Claude's choice, same pattern as before).
- The first sentence sits on its own line, 10px above the rest (founder, 19 Nov 2026).
- The first sentence is semibold, 600 (founder, 19 Nov 2026).

## About page, refined (founder, 19 Nov 2026)
- From a reference screenshot. Text on the left, portrait on the right (portrait below the text on phones); left aligned.
- "A little about me" label: 13px, 600, uppercase, text primary (not accent). It is the page's h1.
- Copy (founder, 19 Nov 2026, used as written): the first paragraph is the large lead (32px, 500); the other four paragraphs are body text (18px, text secondary; 17px until founder changed it, 19 Nov 2026). Replaces the "About me" title, the intro and the second paragraph of 6 Nov 2026.
- Kept from before: the "Say hello" button (below the text) and the experience timeline.
- ⚠️ [The copy names Design OS and neue fische; the Design OS rule above says no mention outside Her Body, Her Mind. Founder's copy, so the rule needs updating if it stays.]
- ⚠️ ["travellers" is British spelling; the site uses American English ("travelers").]
- Workflow line spans the full grid width, first card column to the last (founder, 19 Nov 2026).
- Space between the workflow line and the marquee: 96px desktop, 64px phones (founder, 19 Nov 2026; was 56 and 40).

## Closing strip on every page (founder, 19 Nov 2026)
- Other ways to reach me besides the form. At the bottom of every page: "© 2026 Farnaz Zamanian" on the left (Claude's addition), the email farnaz.za@icloud.com (mailto) and LinkedIn https://www.linkedin.com/in/farnaz-zamanian-37882090/ (new tab) on the right. 15px; on phones the links come first, the name below.
- About and Contact pages now have this strip as their only footer. Supersedes "no footer" on those pages (6 Nov 2026) and the email-only footer notes earlier in this file.
- ⚠️ [The email address is now public on the site and in the repository; spam bots can collect it.]
- Intro replaced again (founder, 19 Nov 2026), see `bio.md`. First line semibold text primary, then two lines in text secondary, each on its own line.
- Workflow line removed (founder, 19 Nov 2026: too repetitive with the intro). The marquee stays on its own between the cards and the form; screen readers hear the section as "My AI OS".
- LinkedIn button (outline, "LinkedIn ↗", new tab) under the contact heading on the home page and the contact page (founder, 19 Nov 2026), for more visibility than the strip at the bottom.
- Intro first line shortened to "Product designer. B2B fintech, travel marketplaces." (founder, 19 Nov 2026). The marquee section has the headline "Tools" (h2, 30px semibold, text primary), 96px above the rows.
- Intro first line: "Product designer with a research background. B2B fintech, travel marketplaces." (founder, 19 Nov 2026).
- Intro first line: "Product designer. Research roots. Fintech and travel." (founder, 19 Nov 2026; replaces the line above).

# Site Brief

## Structure
- Multi-page: home page (with all featured work), one separate page per case study, About, Playground. No separate Work page (removed 2026-11-03 to simplify).
- About page: yes.
- Playground page: yes, one page. Projects that are not UI/UX design: older work between visual design and micro-animation, graphics, illustration, animated graphics.
- Navigation: top bar. Logo only, 56px (48px on phones), no name next to it (links to home), Work (scrolls to the featured work on the home page), About, Playground, Contact.
- Contact: nav link scrolls to the footer. No separate Contact page, no contact form. Contact is an email link.

### Home page
- Opens with a short intro about me. Text: "Home intro line" in `00 Context/bio.md`. Use it as written.
- Hero layout: my round photo on the left, intro text on the right, top-aligned with the right card column, set as one 44px text (28px on phones), no separate headline (reference: Jay Brown screenshot). Photo: `02 Site/assets/photo.png` (transparent corners), 250px (measured from the reference in browser tools). Stacks on phones (photo above, 180px).
- Featured work on the home page, in large visuals: all 6 case studies.
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
- Home featured cards: mosaic of two squares side by side, then one full-width card, repeating (6 cards: square, square, wide, square, square, wide). Reference: tomasnozina.com home.
- Card hover: the image blurs and the project title appears over it.
- Mobile / touch fallback: project title always visible over the image (no hover needed).
- Card shape, image ratio, corners and grid spacing: reference tomasnozina.com.
- No shadows on cards (decided in /visual-direction, 2026-11-02).
- Exact card values: measured, see `00 Context/visual-direction.md`.
- Inside case study: sections with anchor links.
- Cover images: yes. Each case study opens with a large cover image.

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

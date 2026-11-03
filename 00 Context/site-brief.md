# Site Brief

## Structure
- Multi-page: home page, Work index, one separate page per case study, About, Playground.
- About page: yes.
- Playground page: yes. Creative projects: graphics, illustration, animated graphics, visual design work.
- Navigation: top bar. Name (links to home), Work, About, Playground, Contact.
- Contact: nav link scrolls to the footer. No separate Contact page.

### Home page
- Opens with a short intro about me (product designer, etc.).
  - ⚠️ [INTRO TEXT]: to be brainstormed and written by me. Do not generate placeholder copy.
- Featured work: a highlight selection of favourite projects.
  - ⚠️ [WHICH PROJECTS ARE FEATURED]: not yet decided.
- Short, minimal version of my resume.
  - ⚠️ Possible overlap with the About page. Decide what each one covers before writing content.
- Footer with a contact form.
  - ⚠️ A form needs a receiving service (GitHub Pages cannot process form submissions on its own). Decide on a form service or an email-link fallback before building.

## Case Study Display
- Work index: two-column grid of cards. Each card is visual only (full image or animated device mockup). No title under the card.
- Home featured cards: same media as the Work cards, but larger cards, to create a different hierarchy from the Work page.
- Card hover: the image blurs and the project title appears over it.
- Mobile / touch fallback: project title always visible over the image (no hover needed).
- Card shape, image ratio, corners and grid spacing: reference tomasnozina.com.
- No shadows on cards (decided in /visual-direction, 2026-11-02).
  - ⚠️ [EXACT VALUES]: not measured. To be set in `/visual-direction`. Do not invent values.
- Inside case study: sections with anchor links.
- Cover images: yes. Each case study opens with a large cover image.

## Motion and Interaction
- Animation level: 3 (richer).
- Scroll: case study cards slide in vertically as they enter the viewport (reference: lofi-folio).
- Scroll: hero cards stack vertically and open out from each other on scroll (reference: tomasnozina.com).
- Hover on cards: image blurs, project title appears (reference: lofi-folio).
- Card media: animated device mockups (reference: tomasnozina.com).
- CTA micro-interaction: on hover the button extends and shows an email icon. Inspiration from tomasnozina.com, not a copy.
- Contact form: animated, including the CTA micro-animation (reference: tomasnozina.com). Inspiration, not a copy.
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
- Placeholder intro copy, resume content or featured project choices. These are mine to write and decide.
- Invented visual values (spacing, radius, shadow, colours, fonts). These come from `/visual-direction`.

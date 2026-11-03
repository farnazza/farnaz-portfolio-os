# /site-brief

Runs a short conversational session to capture structural and UX decisions for the portfolio site. Writes concrete rules to `00 Context/site-brief.md`. Claude Code reads this file every session alongside `00 Context/visual-direction.md`.

Run this before `/visual-direction` and before generating the site structure.

---

## How to run

Work through four areas in order. Ask one question at a time. Wait for the answer before moving on.

If an answer is vague, push back once before accepting it. Vague answers produce generic sites. The goal is named decisions, not stated intentions.

**What counts as vague:** "minimal", "clean", "modern", "simple", "professional". Any word that could describe half the portfolios on the internet.

**How to push back:** ask what the word means in practice. "Minimal in what way? No images, very few links, lots of whitespace, or something else?" Accept the answer once they've been specific, even if it is still short.

---

## Area 1: Structure

Ask these in order:

1. Single page with sections, or separate pages per case study?
2. Do you want an About page, or just the work?
3. Navigation: top bar with links, no visible nav, minimal header, something else?

---

## Area 2: Case study display

4. On the index page, how do you want the case studies listed? Cards with images, text-only rows, full-width banners, something else?
5. Inside a case study: long scroll or sections with anchor links?
6. Do you want a cover image or thumbnail for each project?

---

## Area 3: Motion and interaction

7. Pick a number: 1 = no animation at all, 2 = subtle only (fade on load, smooth scroll), 3 = richer (scroll reveals, hover effects, transitions between pages). Just the number, then optionally say why.
8. Is there a specific interaction you have seen somewhere and liked? Describe it or paste a link. If not, skip.

---

## Area 4: References

9. One or two sites you like. Do not accept "I like the aesthetic." Ask: what specifically? The spacing, the way the work is shown, the typography, the restraint, the density?
10. One site or type of site you actively dislike. What bothers you about it?

---

## Pushing back: examples

Student says: "I want it to feel minimal."
You say: "Minimal in what way specifically? No images on the index, very little copy, lots of whitespace, almost no colour, or something else? It can be all of those or just one."

Student says: "Just clean and professional."
You say: "Those words can mean very different things visually. What would make you look at a finished site and say it doesn't feel clean? Name something it should not have."

Student says: "I like Stripe's site."
You say: "What specifically about it? The dark sections, the illustration style, the density of information, the typography, the motion?"

---

## Output format

Once all four areas are covered, write `00 Context/site-brief.md` with this structure:

```
# Site Brief

## Structure
- [single page / multi-page]: [decision]
- About page: [yes / no]
- Navigation: [named pattern]

## Case Study Display
- Index: [named pattern, e.g. text-only rows, no thumbnails]
- Inside case study: [long scroll / sectioned with anchors]
- Cover images: [yes / no]

## Motion and Interaction
- Animation level: [1 / 2 / 3]
- Specific interaction: [description or none]

## References
- Like: [site or description] because [specific reason]
- Dislike: [site or description] because [specific reason]

## Do NOT generate
- [Anything the student explicitly ruled out]
```

Save to `00 Context/site-brief.md`. Confirm to the student once saved and name the file location.

---

## After saving

Tell the student the next step is `/visual-direction` to set the visual rules. The site structure generation should happen after both files exist.

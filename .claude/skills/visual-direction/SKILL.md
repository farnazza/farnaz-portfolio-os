# visual-direction

Extracts a visual direction from an existing Figma file or from visual references (images), and writes it to 00 Context/visual-direction.md. CLAUDE.md loads this file automatically at the start of every session, so the rules are always active without bloating the main brief.

Run this skill before generating the site structure.

---

## Two modes

### Mode A: Figma source

Use this mode when you have an existing Figma file you want the portfolio site to match or draw from.

**Step 1:** Ask for the Figma file URL.

**Step 2:** Read the file using the Figma MCP. Extract:
- Color palette: all colors in use, with hex values. Identify which is primary, background, text, and accent.
- Typography: font families, weights, and sizes in use. Map them to roles (heading, body, caption, label).
- Spacing: recurring spacing values (padding, gap, margin). Identify the base unit if one exists.
- Component style: how interactive elements look (buttons, links, inputs). Rounded or square. Outlined or filled. Prominent or minimal.
- Overall character: one sentence describing the visual register.

**Step 3:** Write the extracted direction to 00 Context/visual-direction.md in the format below.

---

### Mode B: Visual references

Use this mode when you have images, screenshots, or URLs of sites or designs you want to draw inspiration from.

**Step 1:** Ask the student to share the references. Accept images, URLs, or a description of the visual target. If images are provided, examine them carefully before proceeding.

**Step 2:** For each reference, extract the rules that produce the look:
- What colors are dominant? What is the palette?
- What typeface category is in use (serif, sans-serif, monospace, geometric, humanist)? At what size and weight?
- How much whitespace? Dense or open?
- What is the layout logic (grid, single column, asymmetric)?
- How do interactive elements signal their state?
- What is absent? (No borders, no shadows, no gradients, etc.)

**Step 3:** Synthesise across references if more than one is provided. What is consistent across them is what the student is drawn to. Name it.

**Step 4:** Write concrete rules to 00 Context/visual-direction.md in the format below.

---

## Output: 00 Context/visual-direction.md

```
# Visual direction

Source: [Figma file URL / description of references]
Character: [One sentence — e.g. "Editorial, high contrast, generous whitespace, no decoration."]

## Colors

Background: [hex]
Text primary: [hex]
Text secondary: [hex]
Accent: [hex]
Do not introduce any other colors.

## Typography

Heading: [font family, weight, size range]
Body: [font family, weight, size]
Caption: [font family, weight, size]
Do not introduce other font families.
Load via: [Google Fonts link tag / system font stack — specify which]

## Layout

Max content width: [value]
Base spacing unit: [value]
Section padding: [value]

## Do NOT generate

- [item extracted from the reference — e.g. no drop shadows]
- [item]
- [item]
```

---

## After saving

Confirm to the student that 00 Context/visual-direction.md has been written and that CLAUDE.md will load it automatically at the start of every session. They do not need to copy anything into CLAUDE.md manually.

If anything in the extracted direction required a judgment call (e.g. a font was inferred from the visual character rather than read from a file), flag it: "I inferred [X] from [Y]. Confirm or correct before building the site."

# case-study

Turns any project material into a structured case study following the PRIME framework: Problem, Research, Insight, Making, Evaluation.

Run this skill once per project. Provide whatever you have: a design file link, screenshots, a written description, a brief, a presentation, notes. The skill works with any combination of inputs.

---

## How it runs

**Step 1: Collect input**

Ask the student to share whatever they have about the project. Accept anything:
- A written description (paste it directly)
- A Figma or Claude Design file link
- Screenshots or images
- A brief or a problem statement
- Notes, bullet points, a brain dump

If images or screenshots are provided, read them carefully before proceeding.

**Step 2: Extract what you know**

From the input provided, extract what you can already answer across the five PRIME sections:

- **P - Problem:** What problem was being solved? Who had it? What was the context?
- **R - Research:** What was done to understand the problem? What did the research surface?
- **I - Insight:** What was the key insight or reframe that shaped the direction?
- **M - Making:** What decisions were made? For each significant decision: what was chosen, what was the alternative, and what was the criterion that decided it?
- **E - Evaluation:** What was produced? What changed as a result? What would you do differently?

**Step 3: Interrogate the gaps**

For each PRIME section where the input does not give a clear answer, ask one specific question. Do not ask all questions at once: ask the most important missing thing first, then continue.

Prioritise in this order:
1. If the Problem is not clear, ask that first.
2. If there is no decision with a named criterion in the Making section, surface that: "You mentioned X but I don't have the reason behind it. What made you choose X over the alternative?"
3. If the Evaluation has no concrete outcome ("what changed"), ask for it.

**Step 4: Generate the case study draft**

Once the gaps are filled, produce a structured case study draft:

---
## [Project name]

### The problem
[2-3 sentences. Specific, grounded in context. Who had this problem, in what situation, and why it mattered.]

### Research
[What was done to understand the problem. Key findings. What the research ruled out as much as what it surfaced. 2-4 sentences.]

### The insight
[One sentence. The reframe or finding that changed the direction.]

### What was made and why
[The main design decisions. For each: what was chosen, why (the criterion), and what the alternative was. Written in first person. 3-5 sentences per significant decision.]

### Outcome
[What was produced. What changed. A number if one exists. What you would do differently. 2-3 sentences.]
---

**Step 5: Offer to iterate**

After the draft: ask the student to read it and correct anything that is wrong or incomplete. Flag any inference made without a clear source: "I inferred [X] from [Y]. Correct it if that's not accurate."

Once corrections are applied, save:

```
01 Projects/[project-name]/case-study.md
```

---

## What good looks like

A good case study answers three questions for a reader who was not in the room:

1. What was the problem and why did it matter?
2. What decision was made and what was the criterion behind it?
3. What changed as a result?

The Making section is the most important. "I redesigned the navigation" is not a decision. "I moved the primary action out of the bottom nav and into the content area because eye-tracking data showed users were not looking down during task completion" is a decision. Push toward the criterion every time.

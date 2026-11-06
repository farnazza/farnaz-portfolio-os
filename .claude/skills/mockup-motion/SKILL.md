---
name: mockup-motion
description: Record a live prototype (link or local HTML file) in a phone and a browser window, with micro animations (scroll, tap, type, hover), on the light card background, and export a looping MP4 and WebM for the site, a GIF for sharing, and a still poster frame. Use when asked for a motion mockup, animated mockup, mockup GIF or video, or animated card media for a project on the home page.
---

# mockup-motion

Turns a live prototype into a motion mockup for a home page card, in the spirit of the animated device mockups on https://www.tomasnozina.com/ (reference only, not a copy).

Works for every project. The founder decides what is shown. Claude records it.

## Rules

- **Don't invent anything. Ask first.** This covers which screens, which steps, the content typed into forms, devices, colors, crops and the still frame. Use only what exists in the prototype.
- Read before starting: `CLAUDE.md`, `00 Context/visual-direction.md`, `00 Context/site-brief.md`, and the project's `visual.md` and `motion.md` (in `01 Projects/<project>/`). Follow `.claude/voice.md` in every message.
- Colors come only from `visual-direction.md`. Defaults: background `#D4D5DA` (mockup background exception in `visual-direction.md`, made lighter by the founder, 5 Nov 2026), phone frame `#0E0E0E`, browser window `#FFFFFF`. No shadows, no gradients, no tilt.
- **3D tilt:** not built yet. The founder may want it for other case studies (4 Nov 2026), not for Her Body, Her Mind. Ask per project; if wanted, add it to `mockup.py` first and add it to `visual-direction.md`.
- **Blocked links:** claude.ai artifact links stop headless Chrome at a "verify you are human" check. Never work around it. If the artifact is the founder's own, download it with the Artifact tool (`action: "read"`) and record the local copy.
- **SumUp or any client work:** ask what the NDA allows before recording anything.
- **Personal data:** the recording must show no participant data, real names, emails or quotes. Text typed into forms is given by the founder. Never make up a name or an email.
- Name the Garrett plane in the first message: this is the **surface plane** (presentation of an existing prototype).

## Step 1. Ask

Ask with AskUserQuestion. Skip anything the project's `motion.md` already answers.

1. **Which entry** in `motion.md` this is for (for example M1, home page card).
2. **Prototype:** a link that opens without signing in, or a local HTML file. For a canvas with several artboards, which artboard (the skill can record one element with `--clip`).
3. **Devices:** phone and desktop (default), phone only, or desktop only.
4. **What happens, step by step:** which screens, in which order, what is tapped, scrolled or typed, and what text goes into each field.
5. **Card size:** square (`1248x1248`) or wide (`2544x1248`). This depends on the order of the projects in `site-brief.md`. If ⚠️ ORDER is still open, ask.
6. **Still frame:** which moment is shown before it plays and when "reduce motion" is on.

## Step 2. Check the prototype opens

Record a short test at the phone size with no steps, then look at the first frame:

```
python3 -I .claude/skills/mockup-motion/mockup.py record --url "<link or file>" --out "<scratchpad>/check" --mobile --lead 300
```

If it shows a sign-in page, a cookie banner, an error, or the wrong artboard, stop and say so in one line. Don't work around a sign-in.

## Step 3. Write the steps

Save them as `01 Projects/<project>/motion/<entry>-steps.json`. Use only selectors and texts that exist on the page. Read the page first, and if a target is unclear, ask.

| Step | Example | What it does |
|---|---|---|
| wait | `{"wait": 800}` | Holds still |
| scroll | `{"scroll": 600, "duration": 1400, "hold": 500}` | Smooth scroll by pixels (negative goes up). `"in": "<selector>"` scrolls inside an element |
| scrollTo | `{"scrollTo": "#events", "duration": 1200}` | Smooth scroll until the element is in the middle of the screen |
| clickText | `{"clickText": "Reserve your place", "hold": 900}` | Moves to the visible element with exactly this text and taps it |
| click | `{"click": "a[href='#events']"}` | The same, by CSS selector |
| hover | `{"hover": ".event-card"}` | Moves the pointer over an element |
| type | `{"type": ["#first-name", "<text from the founder>"], "delay": 70}` | Types one character at a time |

Every step takes `"hold"` (ms of stillness after it, default 600). Keep the whole loop short, about 4 to 8 seconds, and ask if the founder wants longer.

## Step 4. Record

The phone and the desktop are recorded separately, with the same or matching steps. Recordings go in the scratchpad.

```
python3 -I .claude/skills/mockup-motion/mockup.py record --url "<prototype>" --steps "<steps.json>" --out "<scratchpad>/rec-phone" --mobile
python3 -I .claude/skills/mockup-motion/mockup.py record --url "<prototype>" --steps "<steps.json>" --out "<scratchpad>/rec-desktop" --width 1440 --height 900 --dpr 1
```

- Phone: 390 x 844 at 2x by default. Desktop: 1440 x 900.
- `--clip "<selector>"` records only one element, for example an artboard.
- `--settle` (ms) waits longer for slow pages.

Look at a few frames (start, middle, end) in `rec-*/frames/` before going on.

## Step 5. Preview the layout

```
python3 -I .claude/skills/mockup-motion/mockup.py compose --desktop "<scratchpad>/rec-desktop" --phone "<scratchpad>/rec-phone" --out "<scratchpad>/preview/<slug>" --size 1248x1248 --poster-at <seconds> --preview
```

Show the still frame and ask if the layout works. The positions (desktop window behind and to the left, phone in front and to the right) are a proposal, not a rule. `--desktop-shift <px>` moves the desktop window up (negative) or down (positive).

## Step 6. Render

Run the same command without `--preview`, with `--out "02 Site/assets/<slug>/card"`. It writes:

- `card.mp4` and `card.webm`: the site plays these. Muted, looping, small.
- `card-poster.png`: the still frame, shown before it plays and when "reduce motion" is on.
- `card.gif`: for sharing outside the site. Move it to `01 Projects/<project>/motion/`, not `02 Site/` (GIFs are large).

Report the file sizes. If the MP4 is over about 3 MB, suggest a shorter loop.

## Step 7. Log it

Update the entry in the project's `motion.md`: prototype source, steps file, devices, size, still frame, output files and the date.

## Step 8. Put it on the site (ask first)

Only after the founder says yes. The card behavior (founder, 4 Nov 2026, in `site-brief.md`):

- The card shows the still frame until it is hovered or the page is scrolling.
- It plays while hovered and while the page scrolls with the card in view. It pauses shortly after scrolling stops, unless it's hovered.
- No blur and no title on hover, so the motion stays visible. Keyboard focus still shows the title.
- With "reduce motion" on, it never plays. Only the still frame shows.
- Touch screens: the title is always visible (as now).

Card markup:

```html
<span class="card__media" aria-hidden="true">
  <video class="card__video" muted loop playsinline preload="metadata" poster="assets/<slug>/card-poster.png">
    <source src="assets/<slug>/card.webm" type="video/webm">
    <source src="assets/<slug>/card.mp4" type="video/mp4">
  </video>
</span>
```

The card's link text is the title, so the video is hidden from screen readers.

## Tools

- `mockup.py` in this folder. Standard library only, run with `python3 -I`.
- Google Chrome (`/Applications/Google Chrome.app`) records through its screencast, at up to about 45 frames per second while things move.
- ffmpeg (`brew install ffmpeg`) writes the files. If it's missing, ask before installing it.

---
description: After the first publish, save the student's latest design changes - show what changed, check new files for personal data, suggest a note to edit, save, and ask before sending it to GitHub (which updates the live page)
---

# Send new changes to GitHub

Use after `/github-publish`, whenever the student has kept designing and wants GitHub (and the live page) up to date.

## Before you start

- Read `.claude/voice.md` and follow it in every message.
- **Mac only for now.** Run `uname -s`. If it is not `Darwin`, say that these steps are written for a Mac, and that the Windows version is coming. Then stop.
- **Set up first.** If `gh auth status` fails, run `/github-signin`. If `git remote get-url origin` fails, the project isn't on GitHub yet: run `/github-publish`.

## Task

1. **Check GitHub has nothing newer:** `git fetch`, then `git status -sb`. If it says "behind", say GitHub has changes this computer doesn't, and ask before bringing them in with `git pull --ff-only`. If that fails, say so plainly and stop.
2. **Show what changed:** `git status --porcelain`. List it in plain words, grouped as new, changed and deleted files. Up to 15 files by name; past that, a count per folder. If nothing changed, say everything is already on GitHub and stop.
3. **Privacy check** on the new and changed files only, as described in `.claude/commands/github-repo.md` (Privacy check). Leave out what they choose, in `.gitignore`.
4. **Suggest a note** for this save point: one short line saying what changed, in plain words (e.g. "Add the season alerts screen"). End with: **Type ok to use it, or type your own note.**
5. **Save:** `git add -A`, then `git commit -m "<note>"`.
6. **Ask before sending.** Say what will go to GitHub in one line. End with: **Type send to put it on GitHub.**
7. **Send:** `git push`. If it is refused, say why in one plain line. Never force it.
8. **Live page.** If `.github/workflows/pages.yml` exists, say the page updates a minute or two later, and give the link from `gh api repos/{owner}/{repo}/pages --jq .html_url`.

## Rules

- Never send before the student types send.
- Never use `--force`, never rewrite history that was already sent, never delete a branch or the repository.

## Log lines

Write one project log line, without asking (D15). Only if `project.log.md` exists. Update the **Where we are** section in the same edit. For example:

```
- YYYY-MM-DD — Sent "<note>" to GitHub with /github-update — so the repository and the live page show the latest version.
```

Don't show the line or mention the log in the message.

## Ending

Close with **Type /github-update the next time you want to send changes.**

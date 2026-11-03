---
description: Create the project's GitHub repository - ask its name and whether it is public or private, check every file for personal data and ask what to leave out, then make the first save point, send it to GitHub and give the link
---

# Create the repository and send the project

Second step of `/github-publish`. Order: `/github-signin` → `/github-repo` → `/github-pages`.

## Before you start

- Read `.claude/voice.md` and follow it in every message.
- **Mac only for now.** Run `uname -s`. If it is not `Darwin`, say that these steps are written for a Mac, and that the Windows version is coming. Then stop.
- **Signed in first.** If `gh auth status` fails, run `/github-signin` instead.
- **Already on GitHub?** If `git remote get-url origin 2>/dev/null` prints a link, say the project is already connected to it, and that `/github-update` sends new changes. Then stop.

## Task

1. **Explain in one line** what a repository is: the project's folder on GitHub, with every save point in it.
2. **Ask two things in one message:**
   - **The name.** Suggest one from the project folder's name, in lower case with hyphens (e.g. `design-os-pumpkin`). Letters, numbers and hyphens only.
   - **Public or private.** Say both plainly:
     - Public: anyone can see and copy the files. Deleting it later doesn't undo copies people made.
     - Private: only you, and people you invite, can see it. On a free GitHub account, GitHub Pages can't publish a page from a private repository. Vercel and Netlify are free services that can.
   - End with: **Answer in a line with the name, and public or private.**
3. **Privacy check.** Run it before anything is saved or sent. See below.
4. **Turn the folder into a Git project**, if it isn't one yet (`git rev-parse --is-inside-work-tree 2>/dev/null || echo no`): `git init -b main`. Say in one line that Git now keeps versions of this folder.
5. **Leave out what they chose:** add each path to `.gitignore` (create it if missing), one path per line, with a comment line saying why. Then check: `git check-ignore -v <path>` for each.
   - If a left-out file is already in an earlier save point, say so plainly: it would still go to GitHub with the history. Ask before changing the history. If nothing was ever sent to GitHub, rewriting is safe: remove the files from the history with `git rm -r --cached <path>` and, if they are in commits before the last one, start a fresh first save point from the current files (`git checkout --orphan new-main`, `git add -A`, commit, `git branch -D main`, `git branch -m main`). Never rewrite history that was already sent.
6. **First save point.** Run `git add -A`, then show how many files go in. Suggest a short note, for example "First version of the project", and let them edit it. End with: **Type ok to use it, or type your own note.** Then `git commit -m "<note>"`.
7. **Send it to GitHub:** `git branch -M main`, then `gh repo create <name> --public|--private --source . --remote origin --push`.
8. **Check GitHub:** `git ls-tree -r --name-only origin/main` must list none of the left-out paths. If one is there, say so at once and stop. Then `gh repo view --json url,visibility` and give the link.

## Privacy check

Used by `/github-repo`, `/github-pages` and `/github-update`. Git sends every file in the folder unless it's told not to.

1. **List what would be sent:** with Git, `git ls-files` plus `git ls-files --others --exclude-standard`. Without Git yet, every file in the folder except `.git`.
2. **Flag files with personal data**, by name and by content (use the search tool, not `cat`):
   - Research with people: transcripts, interview notes, observations, assumption checks, participant trackers, screener answers, consent forms, recordings (audio, video). Folders like `Primary Research/Raw` and `Primary Research/Processed`.
   - Names of participants, emails, phone numbers, addresses, health or diet details, ages, workplaces.
   - Keys and passwords: `.env` files, tokens, API keys.
3. **Report each flagged file** with its full path and what was found in it, in one line each. Group by folder when a folder has many.
4. **Ask what to leave out.** Suggest leaving out every flagged file or folder. End with: **Type leave out to leave out all of these, or name the ones to send anyway.**
5. If nothing is flagged, say so in one line and go on.

## Rules

- Never send anything to GitHub before the privacy check is answered.
- Never change a repository's visibility, never delete a repository, never force-send (`--force`) to a repository that already has files.
- Never decide public or private for the student.

## Ending

- **Public:** close with **Type next when you're ready.** When they type next, name `/github-pages` and run it: read `.claude/commands/github-pages.md` and follow it.
- **Private:** say in one plain line that GitHub Pages can't publish from a private repository on a free account, and that Vercel and Netlify are free services that can publish it instead, outside these steps. This ends `/github-publish`: write the log lines as described in `.claude/commands/github-pages.md` (Log lines), then close with **Type /github-update whenever you want to send new changes.**

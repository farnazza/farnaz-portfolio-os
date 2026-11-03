---
name: github-publish
description: GitHub repo + publish pages (First Commit + Deployment). Guide a student on a Mac from a project folder to a live portfolio site, one step at a time - sign in to GitHub (creating an account first if needed), create the repository after a personal-data check, send the first save point, and publish the 02 Site folder with GitHub Pages. Runs /github-signin, /github-repo and /github-pages in order. Private repositories stop before Pages and are pointed to Vercel or Netlify. Use when a student wants to put their project on GitHub, create a repository, publish or deploy the portfolio site, or get a live link.
argument-hint: "[optional: the step to start from, e.g. signin, repo, pages]"
---

# GitHub repo + publish pages (First Commit + Deployment)

This skill only runs three commands in order. Their rules apply unless this file says otherwise.

| Order | Command | What it does |
|---|---|---|
| 1 | `/github-signin` | Signs in, or guides account creation |
| 2 | `/github-repo` | Privacy check, repository, first send |
| 3 | `/github-pages` | Publishes the 02 Site folder |

## Steps

1. Read `.claude/voice.md`. It applies to every message in this skill.
2. **Mac only for now.** Run `uname -s`. If it is not `Darwin`, say that these steps are written for a Mac, and that the Windows version is coming. Then stop.
3. **Setup first.** If `xcode-select -p` fails, or no `gh` is found (`command -v gh`, `/opt/homebrew/bin/gh` or `/usr/local/bin/gh`), or the Git name or email is empty, say the computer needs the tools first, name `/setup-tools` and run it. Come back here after its last step.
4. **Start point.** If a step was given ($ARGUMENTS), start at that command. Otherwise start at `/github-signin`.
5. **Run one command at a time:** read its file in `.claude/commands/` and follow it, including its own Before you start checks.
6. **Between commands**, each one ends with **Type next when you're ready.** When the student types next, open with one plain line naming the command that starts ("Now running `/github-repo`."), then run it.
7. **Stop where the student is needed.** Clicking Authorize, choosing public or private, answering the privacy check and confirming the page file are theirs. Never move on until they answer.

## Rules

- **Private repository:** `/github-repo` ends the process. `/github-pages` never runs for it.
- The last command that runs (`/github-pages`, or `/github-repo` for a private repository) writes the log lines for every step done in this conversation, once, without asking (D15). No command before it writes to the logs.
- If a command is blocked by a permission check, say what was blocked and what the student can do, as `.claude/voice.md` describes. Never work around it.
- After this skill, new changes go to GitHub with `/github-update`.

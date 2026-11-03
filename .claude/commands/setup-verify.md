---
description: Check that Git, Homebrew, the GitHub CLI and the Git name and email all work in a fresh Terminal, report in plain words, and log the setup steps
---

# Setup verify

Last step of `/setup-tools`. Order: `/setup-check` → `/setup-git` → `/setup-homebrew` → `/setup-gh` → `/setup-git-identity` → `/setup-verify`.

## Before you start

- Read `.claude/voice.md` and follow it in every message.
- **Mac only for now.** Run `uname -s`. If it is not `Darwin`, say that these steps are written for a Mac, and that the Windows version is coming. Then stop.

## Task

1. **Check everything in a fresh login session**, the way a new Terminal window starts, so the result matches what the student will get later:
   `zsh -lc 'for t in git brew gh; do printf "%s: " $t; command -v $t >/dev/null && $t --version 2>&1 | head -1 || echo missing; done; git config --global user.name; git config --global user.email; true'`
   Run it only if `xcode-select -p` succeeds; otherwise Git is missing and `git` would open the installer.
2. **Show a short table:** Git, Homebrew, GitHub CLI and Git name and email, each with its version or value and working or missing. If the GitHub CLI works and Homebrew is missing, show Homebrew as not needed: it is only used to install the GitHub CLI.
3. **If something needed is missing or broken**, say which one in one plain line and name the command that fixes it (`/setup-git`, `/setup-homebrew`, `/setup-gh` or `/setup-git-identity`). Close with **Type next when you're ready.** and, on next, run that command.
4. **If everything works**, say the computer is ready for GitHub in one line.

## Rules

- Do not run `brew doctor` or any other health check, and don't mention optional updates.
- If `brew` or `gh` work only by their full path (`/opt/homebrew/bin/...`) and not in the fresh session, say new Terminal windows can't find them yet, and that closing and reopening the Claude app usually fixes it.

## Log lines

When everything works, write one project log line per setup step done in this conversation, without asking (D15). Only if `project.log.md` exists. Update the **Where we are** section in the same edit. For example:

```
- YYYY-MM-DD — Installed Git, Homebrew and the GitHub CLI and set the Git name and email with /setup-tools — so the project can go on GitHub.
```

Don't show the line or mention the log in the message.

## Ending

- When everything works, say: "Now that all of those are working, we're ready to put the project on GitHub and publish the page. Do you want to do this now?" Then close with: **Type yes to continue with `/github-publish` and put the project on GitHub.**
- When they type yes, name `/github-publish` and run it: read `.claude/skills/github-publish/SKILL.md` and follow it.
- If they say no, stop there. They can start `/github-publish` whenever they like.

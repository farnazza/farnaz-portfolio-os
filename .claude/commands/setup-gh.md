---
description: Install the GitHub CLI with Homebrew from inside the Claude conversation and check it works
---

# Set up the GitHub CLI

Fourth step of `/setup-tools`. Order: `/setup-check` → `/setup-git` → `/setup-homebrew` → `/setup-gh` → `/setup-git-identity` → `/setup-verify`.

## Before you start

- Read `.claude/voice.md` and follow it in every message.
- **Mac only for now.** Run `uname -s`. If it is not `Darwin`, say that these steps are written for a Mac, and that the Windows version is coming. Then stop.
- **Homebrew first.** If neither `command -v brew`, `/opt/homebrew/bin/brew` nor `/usr/local/bin/brew` exists, say the GitHub CLI is installed with Homebrew and run `/setup-homebrew` instead.
- If the GitHub CLI is already there (`command -v gh`, `/opt/homebrew/bin/gh` or `/usr/local/bin/gh`), say so in one line and go to Ending.

## Task

1. **Explain in one line** what the GitHub CLI is: it lets this computer talk to the student's GitHub account, so I can put the project online for them later.
2. **Install it** with Homebrew's full path, in the background of this conversation (no password needed): `<brew path> install gh`. Allow up to 10 minutes.
3. **Check it:** `<gh path> --version`. Say the GitHub CLI is installed, with its version number.
   - If it failed, say what went wrong in one plain line and try once more. If it fails again, say so and stop.

## Rules

- Never sign in to GitHub here. Signing in is `/github-signin`, in `/github-publish`.

## Ending

- Close with **Type next when you're ready.**
- When they type next, name `/setup-git-identity` (or the next command with something to do) and run it: read its file in `.claude/commands/` and follow it.
- Remember that the GitHub CLI was installed. `/setup-verify` logs the setup steps at the end.

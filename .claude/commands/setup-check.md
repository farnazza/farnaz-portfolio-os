---
description: Check which of Git, Homebrew and the GitHub CLI are already on this Mac, and list what is missing and the order to install it
---

# Setup check

First step of `/setup-tools`. Order: `/setup-check` → `/setup-git` → `/setup-homebrew` → `/setup-gh` → `/setup-git-identity` → `/setup-verify`.

## Before you start

- Read `.claude/voice.md` and follow it in every message.
- **Mac only for now.** Run `uname -s`. If it is not `Darwin`, say that these steps are written for a Mac, and that the Windows version is coming. Then stop.

## Task

1. Check each tool with commands that never fail and never open a window:
   - **Git:** `xcode-select -p >/dev/null 2>&1 && git --version || echo "no git"`. Never run `git` on its own before `xcode-select -p` succeeds: on a Mac without Apple's developer tools, `git` is a placeholder that pops up an install window.
   - **Homebrew:** `command -v brew; ls /opt/homebrew/bin/brew /usr/local/bin/brew 2>/dev/null; true` (no path printed means missing)
   - **GitHub CLI:** `command -v gh; ls /opt/homebrew/bin/gh /usr/local/bin/gh 2>/dev/null; true` (no path printed means missing)
   - **Git name and email:** only if Git works: `git config --global user.name; git config --global user.email; true`
2. Show the result as a short table: the tool, one plain sentence on what it does, and installed or missing.
   - Git: saves versions of the project, like a history of save points.
   - Homebrew: installs other programs for you.
   - GitHub CLI: lets this computer talk to the student's GitHub account.
   - Git name and email: who the save points belong to.
3. **Homebrew is only needed to install the GitHub CLI.** If the GitHub CLI is there and Homebrew is not, show Homebrew as not needed instead of missing.
4. Under the table, say in one line which ones are still to do, in the order above, leaving out anything not needed. If nothing is left to do, say so and that the next step only checks it all works.

## Ending

- Close with **Type next when you're ready.**
- When they type next, name the next command that has something to do (skip installed tools) and run it: read its file in `.claude/commands/` and follow it.
- Remember what this check found. The other setup commands use it, and `/setup-verify` logs the setup steps at the end.

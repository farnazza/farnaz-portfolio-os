---
name: setup-tools
description: Guide a student on a Mac through installing everything needed to put a project on GitHub, one step at a time - check what is installed, install Git from the Mac's Terminal, install Homebrew and the GitHub CLI from the Claude conversation, set the Git name and email, and check it all works. Runs /setup-check, /setup-git, /setup-homebrew, /setup-gh, /setup-git-identity and /setup-verify in order, skipping what is already done. Use when a student wants to set up Git, GitHub CLI or Homebrew, get their computer ready for GitHub, or install the tools.
argument-hint: "[optional: the step to start from, e.g. git, homebrew, gh, identity, verify]"
---

# Set up the tools

This skill only runs six commands in order. Their rules apply unless this file says otherwise.

| Order | Command | What it does |
|---|---|---|
| 1 | `/setup-check` | Checks what is installed |
| 2 | `/setup-git` | Git, from the Mac's Terminal |
| 3 | `/setup-homebrew` | Homebrew, in Claude |
| 4 | `/setup-gh` | GitHub CLI, in Claude |
| 5 | `/setup-git-identity` | Git name and email |
| 6 | `/setup-verify` | Checks it all works, logs the steps |

## Steps

1. Read `.claude/voice.md`. It applies to every message in this skill.
2. **Mac only for now.** Run `uname -s`. If it is not `Darwin`, say that these steps are written for a Mac, and that the Windows version is coming. Then stop.
3. **Start point.** If a step was given ($ARGUMENTS), start at that command. Otherwise start at `/setup-check`.
4. **Run one command at a time:** read its file in `.claude/commands/` and follow it, including its own Before you start checks.
5. **Between commands**, each one ends with **Type next when you're ready.** When the student types next, open with one plain line naming the command that starts ("Now running `/setup-homebrew`."), then run it.
6. **Skip what is done or not needed.** Use what `/setup-check` found, and never name a skipped command. `/setup-verify` always runs.
   - Skip `/setup-git` when Git works, and `/setup-gh` when the GitHub CLI is there.
   - Skip `/setup-homebrew` when Homebrew is there, and also when the GitHub CLI is already there: Homebrew is only used to install it.
   - Skip `/setup-git-identity` when the Git name and email are both set.
7. **Stop where the student is needed.** A command that waits for the student (clicking Install, typing a password, giving a name) waits. Never move on until they answer.

## Rules

- Never type a password, never ask for one in the chat, and never change the student's shell startup files.
- `/setup-verify` writes the log lines for every step done in this conversation, once, at the end, without asking (D15). No command before it writes to the logs.
- If a command is blocked by a permission check, say what was blocked and what the student can do, as `.claude/voice.md` describes. Never work around it.

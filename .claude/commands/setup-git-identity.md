---
description: Ask for the student's name and email, set them as their Git name and email, and read them back
---

# Set up Git name and email

Fifth step of `/setup-tools`. Order: `/setup-check` → `/setup-git` → `/setup-homebrew` → `/setup-gh` → `/setup-git-identity` → `/setup-verify`.

## Before you start

- Read `.claude/voice.md` and follow it in every message.
- **Mac only for now.** Run `uname -s`. If it is not `Darwin`, say that these steps are written for a Mac, and that the Windows version is coming. Then stop.
- **Git first.** If `xcode-select -p` fails, say this step needs Git and run `/setup-git` instead.
- Read the current values: `git config --global user.name; git config --global user.email; true`.

## Task

1. **Explain in one line:** Git puts a name and email on every save point, so anyone looking at the project can see who made each change.
2. **If both are already set**, show them and ask whether to keep them or change them. Keeping them goes to Ending.
3. **Ask for both in one message:**
   - The name to show on their save points, for example their full name.
   - The email. Recommend the email of their GitHub account, or the one they'll use to create it.
   - Add one plain line: in a public project, anyone can see this email. GitHub offers a private address instead, which `/github-signin` can set up later.
   - End with: **Answer in a line with your name and your email.**
4. **Set them** with the student's exact words, never a guess:
   - `git config --global user.name "<name>"`
   - `git config --global user.email "<email>"`
5. **Read them back** with `git config --global user.name` and `git config --global user.email`, and show both.

## Rules

- Never guess a name from an email or an account. Always ask.
- If the email doesn't look like an email (no `@`), ask again before setting it.

## Ending

- Close with **Type next when you're ready.**
- When they type next, name `/setup-verify` and run it: read its file in `.claude/commands/` and follow it.
- Remember that the name and email were set. `/setup-verify` logs the setup steps at the end.

---
description: Check whether this computer is signed in to GitHub, guide the student to create an account if they have none, sign them in with a browser code, and confirm it worked
---

# Sign in to GitHub

First step of `/github-publish`. Order: `/github-signin` → `/github-repo` → `/github-pages`.

## Before you start

- Read `.claude/voice.md` and follow it in every message.
- **Mac only for now.** Run `uname -s`. If it is not `Darwin`, say that these steps are written for a Mac, and that the Windows version is coming. Then stop.
- **Setup first.** If `xcode-select -p` fails, or no `gh` is found (`command -v gh`, `/opt/homebrew/bin/gh` or `/usr/local/bin/gh`), say the computer needs the tools first and run `/setup-tools`. Use the full `gh` path if `command -v gh` finds nothing.

## Task

1. **Check:** `gh auth status 2>&1; true`.
   - **Signed in:** say which GitHub account in one line, then run the last two checks below and go to Ending.
   - **Not signed in:** go on.
2. **Ask whether they have a GitHub account.** End with: **Type yes if you have one, or no if you don't.**
3. **No account:** guide them to create one. I can't create accounts, so this part is theirs. Numbered, one action per line:
   1. Open **https://github.com/signup**.
   2. Enter your email. Use the same one as your Git email, if you set one.
   3. Choose a password and a username. The username shows up in the address of everything you publish.
   4. Enter the code GitHub sends to your email.
   5. Pick the **Free** plan if it asks.
   End with: **Type next once you can sign in at github.com.**
4. **Sign in.** Nothing gets typed in a Terminal tab here: never use `run_in_terminal` for sign-in, because its questions wait for keys the student may not be able to send there. Run it as a background command in this conversation, with prompts turned off so it never stops to ask anything:
   `GH_PROMPT_DISABLED=1 gh auth login --hostname github.com --git-protocol https --web --scopes workflow 2>&1`
   Read its output file for the one-time code (it looks like `ABCD-1234`; GitHub also copies it to the clipboard). Then say, numbered:
   1. Show the code in its own code block, and say it's already on their clipboard.
   2. Open **https://github.com/login/device** and paste the code.
   3. Sign in if it asks, then click **Authorize**.
   End with: **Type done once you've clicked Authorize.**
5. **Confirm:** `gh auth status`. Say they're signed in, with their username.
6. **Let Git use this sign-in**, so sending changes never asks for a password: `gh auth setup-git`.
7. **Check the extra permission** for publishing pages: if `gh auth status` doesn't list the `workflow` scope, run `GH_PROMPT_DISABLED=1 gh auth refresh --hostname github.com --scopes workflow 2>&1` as a background command the same way, and repeat the code steps.
8. **Private email (optional).** If `/setup-git-identity` mentioned it, or their Git email is a personal one: say that in a public project anyone can see the Git email, and that GitHub gives them a private address that still links save points to their account. Ask: **Type private to switch to it, or keep to leave it.** On private, build it from `gh api user --jq '"\(.id)+\(.login)@users.noreply.github.com"'`, set it with `git config --global user.email "<address>"` and read it back.

## Rules

- Never type a password or a code into a website for them, and never ask for a password in the chat.
- Never create, delete or change a GitHub account or its settings.
- `gh` path: use the full path if `command -v gh` finds nothing.

## Ending

- Close with **Type next when you're ready.**
- When they type next, name `/github-repo` and run it: read `.claude/commands/github-repo.md` and follow it.
- Remember that sign-in is done. The last command of `/github-publish` writes the log lines.

---
description: Install Homebrew from inside the Claude conversation, in a Terminal tab where the student types their Mac password, then check it worked
---

# Set up Homebrew

Third step of `/setup-tools`. Order: `/setup-check` → `/setup-git` → `/setup-homebrew` → `/setup-gh` → `/setup-git-identity` → `/setup-verify`.

## Before you start

- Read `.claude/voice.md` and follow it in every message.
- **Mac only for now.** Run `uname -s`. If it is not `Darwin`, say that these steps are written for a Mac, and that the Windows version is coming. Then stop.
- **Git first.** If `xcode-select -p` fails, say Homebrew needs Git first and run `/setup-git` instead.
- If Homebrew is already there (`command -v brew`, `/opt/homebrew/bin/brew` or `/usr/local/bin/brew`), say so in one line and go to Ending.
- If the GitHub CLI is already there (`command -v gh`, `/opt/homebrew/bin/gh` or `/usr/local/bin/gh`), Homebrew isn't needed: say so in one line and go to Ending.

## Task

1. **Explain in one line** what Homebrew is: a helper that installs other programs for you, including the GitHub CLI in the next step.
2. **Before starting, say what will happen**, numbered:
   1. I open a Terminal tab next to this conversation and start the install.
   2. Click that tab and type your Mac password (the one you use to log in), then press **Enter**. Nothing shows while you type, and that is normal.
   3. If it says "Press RETURN to continue", press **Enter** again.
   4. When it says "Installation successful", come back here.
3. **Start it** with the Terminal tab tool (`run_in_terminal`, title "Homebrew install"):
   `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
   Link the tab by its title, as `[Homebrew install](#terminal/<tab_id>)`. End with: **Type done when it says Installation successful.**
4. **Check it.** Read the tab's output. Then run `/opt/homebrew/bin/brew --version || /usr/local/bin/brew --version`.
   - If it worked, say Homebrew is installed, with its version number. Then say, on its own line: "You can ignore the "Next steps" lines in that tab. The Mac already finds Homebrew in every new Terminal window."
   - If the output shows an error, say what went wrong in one plain line, and start it again only after they agree.

## Rules

- Never type the password and never ask for it in the chat. The student types it in the Terminal tab.
- **Do not change the student's shell startup files** (`~/.zprofile`, `~/.zshrc`), even though Homebrew's "Next steps" suggests it. On Apple Silicon Macs the installer already adds `/opt/homebrew/bin` for every new Terminal window (`/etc/paths.d/homebrew`), and on Intel Macs `/usr/local/bin` is already there. Tell the student they can skip the "Next steps" lines.
- Use Homebrew's full path (`/opt/homebrew/bin/brew` or `/usr/local/bin/brew`) in this conversation, because the current session started before Homebrew existed.

## Ending

- Close with **Type next when you're ready.**
- When they type next, name `/setup-gh` (or the next command with something to do) and run it: read its file in `.claude/commands/` and follow it.
- Remember that Homebrew was installed. `/setup-verify` logs the setup steps at the end.

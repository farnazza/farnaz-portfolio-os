---
description: Guide the student through installing Git from the Mac's own Terminal app, bring the installer window to the front if it hides, and wait until Git works
---

# Set up Git

Second step of `/setup-tools`. Order: `/setup-check` → `/setup-git` → `/setup-homebrew` → `/setup-gh` → `/setup-git-identity` → `/setup-verify`.

## Before you start

- Read `.claude/voice.md` and follow it in every message.
- **Mac only for now.** Run `uname -s`. If it is not `Darwin`, say that these steps are written for a Mac, and that the Windows version is coming. Then stop.
- Run `xcode-select -p >/dev/null 2>&1 && git --version || echo "no git"`. If Git already works, say so in one line and go to Ending.

## Task

Git comes with Apple's free developer tools. This is the one step the student does in their Mac's own Terminal app, outside Claude, because the installer needs them to click through Apple's window.

1. **Explain in one line** what Git is (it saves versions of the project, like save points) and that this step happens in the Mac's Terminal app, the window where you type instructions to the computer.
2. **How to open Terminal**, numbered, one action per line:
   1. Press **Cmd + Space** to open Spotlight search.
   2. Type **Terminal** and press **Enter**.
   3. A window with a blinking cursor opens.
3. **How to paste the command**, numbered:
   1. Copy this line (in its own code block): `xcode-select --install`
   2. Click inside the Terminal window and press **Cmd + V**.
   3. Press **Enter**.
   4. A window asks to install the "command line developer tools". Click **Install**, then **Agree**.
4. **Before they start, say what to do if nothing appears:** the window may be hidden behind other windows. Give this line to send to you, in quotation marks: "I ran the Git command in my Terminal but I can't find the installer window. Can you bring it to the front?" End with: **Type it, or paste it, and hit enter, if the window doesn't show up. Type installing once you've clicked Install.**
5. **If they can't find the window:**
   - Check whether the installer is running: `pgrep -fl "Install Command Line Developer Tools" || echo "not running"`.
   - If it runs, bring it to the front: `osascript -e 'tell application id "com.apple.dt.CommandLineTools.installondemand" to activate'`. Say it should now be on top, and that **Cmd + Tab** also finds it (the gray square icon).
   - If it isn't running and Git still doesn't work, the command may not have reached Terminal. Ask them to paste it again. If Terminal says the tools are already installed but Git still doesn't work, send them to **System Settings → General → Software Update**.
6. **Once they say it's installing:** say the download can take a while and that you'll tell them when it's done. Wait in the background with a loop that succeeds once Git works (no foreground sleep): check `xcode-select -p` every 10 seconds for up to 30 minutes. When it succeeds, run `git --version` and say Git is installed, with its version number.
   - If 30 minutes pass, say so plainly and ask whether the window still shows a progress bar.

## Rules

- Never run `git`, `xcode-select --install` or anything that opens the installer yourself. Starting it is the student's step.
- Never type a password for them.

## Ending

- Close with **Type next when you're ready.**
- When they type next, name `/setup-homebrew` (or the next command with something to do) and run it: read its file in `.claude/commands/` and follow it.
- Remember that Git was installed. `/setup-verify` logs the setup steps at the end.

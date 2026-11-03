---
description: Publish the portfolio site in 02 Site as a live website with GitHub Pages - confirm the home page, check every page's links and files, set up automatic publishing, turn on Pages and give the live link. Private repositories are pointed to Vercel or Netlify instead
---

# Publish the site

Last step of `/github-publish`. Order: `/github-signin` → `/github-repo` → `/github-pages`.

## Before you start

- Read `.claude/voice.md` and follow it in every message.
- **Mac only for now.** Run `uname -s`. If it is not `Darwin`, say that these steps are written for a Mac, and that the Windows version is coming. Then stop.
- **Signed in and on GitHub first.** If `gh auth status` fails, run `/github-signin`. If `git remote get-url origin` fails, run `/github-repo`.
- **Public only.** Check `gh repo view --json visibility --jq .visibility`. If it is `PRIVATE`, say that GitHub Pages can't publish a page from a private repository on a free account, and that Vercel and Netlify are free services that can, outside these steps. Then write the log lines (below) and stop.

## Task

1. **Find the site.** The site is the whole `02 Site` folder: every page, the shared CSS file, scripts and images, with the same folders and file names, so links between pages keep working. Search `02 Site` for `.html` files.
   - If there are none, say the site has no pages yet, and stop.
   - **Home page.** GitHub Pages opens `index.html` first. If `02 Site/index.html` exists, give its full path as a link and say it's the home page. If it doesn't, list the `.html` files and ask which one is the home page; it is published once more as `index.html`, and the original stays where it is. End with: **Type yes to publish the 02 Site folder with this home page, or type the file name of the home page.**
2. **Say what kind of site it is**, in one sentence:
   - **Plain HTML, CSS and JavaScript** (no `package.json` with a build step in `02 Site` or at the project root): it can be published as it is. Go on.
   - **Built with a tool like Vite or React:** say this command publishes plain HTML sites only for now, and stop.
3. **Check the links and files.** Search every `.html` and `.css` file in `02 Site` for local files they load or link to (`src=`, `href=` and CSS `url(`, skipping ones that start with `http`, `#`, `data:`, `mailto:` or `tel:`). Only what is inside `02 Site` goes online. Report, with full paths:
   - A link that leaves `02 Site` (for example `../01 Projects/...`): that file won't be online. Offer to copy it into `02 Site` and update the link.
   - A link to a file that doesn't exist.
   - A file in `02 Site` that is left out in `.gitignore`: it never reaches GitHub, so it won't be online either. Ask before including it.
   - A link whose letter case differs from the file name (`About.html` against `about.html`): it works on a Mac and breaks online.
   If nothing is found, say nothing and go on.
4. **Privacy check** on every file in `02 Site`, as described in `.claude/commands/github-repo.md` (Privacy check). The site will be open to anyone with the link.
5. **Set up automatic publishing.** Say in one line: I'm adding a small automation file, so every time you send changes to GitHub, the site publishes itself. Write `.github/workflows/pages.yml` (the folder path stays quoted, since it has a space):

   ```yaml
   name: Publish site
   on:
     push:
       branches: [main]
     workflow_dispatch:
   permissions:
     contents: read
     pages: write
     id-token: write
   concurrency:
     group: pages
     cancel-in-progress: true
   jobs:
     deploy:
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - uses: actions/checkout@v4
         - name: Put the site in place
           run: |
             mkdir -p _site
             cp -R "02 Site/." _site/
         - uses: actions/configure-pages@v5
         - uses: actions/upload-pages-artifact@v3
           with:
             path: _site
         - id: deployment
           uses: actions/deploy-pages@v4
   ```

   If the home page is not `index.html`, add `cp "02 Site/<home page>" _site/index.html` under the `cp -R` line.
6. **Turn on GitHub Pages:** `gh api -X POST repos/{owner}/{repo}/pages -f build_type=workflow`. If it says Pages already exists, run the same with `-X PUT`.
7. **Save and send.** Suggest a short note, for example "Publish the portfolio site", and let them edit it. End with: **Type ok to use it, or type your own note.** Then `git add .github/workflows/pages.yml`, `git commit -m "<note>"`, `git push`.
   - If GitHub refuses the automation file (a message about the `workflow` scope), say GitHub needs one more permission for automation files. Run `gh auth refresh --hostname github.com --scopes workflow` in a Terminal tab, show the one-time code, and send them to **https://github.com/login/device** to paste it and click **Authorize**. End with: **Type continue now once you've clicked Authorize.** Then push again.
8. **Wait for the first publish.** Say it usually takes a minute or two. Find the run with `gh run list --workflow pages.yml --limit 1 --json databaseId --jq '.[0].databaseId'` and wait for it with `gh run watch <id> --exit-status`. If it fails, read `gh run view <id> --log-failed`, say what went wrong in one plain line and fix it.
9. **Check the site:** get the link with `gh api repos/{owner}/{repo}/pages --jq .html_url`, then `curl -sI <link>` must answer 200, and so must the link to the shared CSS file. Give the live link. Say that every change sent with `/github-update` updates the site a minute or two later.

## Rules

- Publish only `02 Site`. Never the rest of the project folder (`00 Context`, `01 Projects`, `.claude`), even though the repository holds it.
- Never turn on Pages for a private repository, and never change its visibility to make Pages work.

## Log lines

This ends `/github-publish`. Write one project log line per step done in this conversation (sign-in, repository, page), without asking (D15). Only if `project.log.md` exists. For example:

```
- YYYY-MM-DD — Put the project on GitHub (<repo link>, public) and published the portfolio site with GitHub Pages (<live link>) with /github-publish — so the portfolio can be shared by link.
```

Update the **Where we are** section in the same edit. Don't show the lines or mention the log in the message.

## Ending

Close with **Type /github-update whenever you want to send new changes.**

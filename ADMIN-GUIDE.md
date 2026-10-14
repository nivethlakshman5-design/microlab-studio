# MicroLab Studio admin editing

## Secure sign-in

Use the hosted Pages CMS editor: https://app.pagescms.org/ and sign in with the GitHub account that has write access to `nivethlakshman5-design/microlab-studio`. Install/authorize its GitHub App for **this repository only** when prompted. Never create a password in the website's frontend or put tokens/passwords in this repository.

The editor configuration is `.pages.yml`. It exposes a bounded set of source files for editing: lesson definitions, quiz content, code examples, learning-path interface, CSS/theme, site metadata, and uploaded media. Some advanced edits require TypeScript/CSS knowledge; this is an initial source-editor workflow, not a visual drag-and-drop builder.

## Safe workflow (recommended)

1. In Pages CMS, select the `main` branch only for a quick change you are comfortable publishing directly.
2. For a safer preview, create/select a separate branch such as `admin-preview` in GitHub first, then select that branch in the editor.
3. Save changes to that branch. Open a pull request from the preview branch to `main` and review the diff before merging.
4. Merging to `main` triggers the existing GitHub Actions workflow to build and publish GitHub Pages. No Cloudflare deployment is used.
5. If a change is wrong, use GitHub repository → History to revert the commit (or use Revert on the pull request/commit), then merge the revert to `main`. The Pages deployment workflow republishes the restored version.

## Current boundaries

- Public website remains a static GitHub Pages site; there is no embedded `/admin` login because GitHub Pages cannot enforce server-side authentication on a route.
- The hosted CMS is the private editing entry point, protected by GitHub authorization and repository permissions.
- The first setup exposes source editors for functionality and design. It does not yet provide visual form fields for every page element or database-backed user accounts.
- Do not add passwords, API keys, OAuth secrets, or private user data to source files.
- Uploaded media should go under `app/public/uploads/` and should be referenced by public URL in the website.

# MicroLab Studio editing guide

The site remains hosted on GitHub Pages. Pages CMS edits the connected GitHub repository; do not connect this project to Cloudflare or publish it to a community feed.

## Structured content forms

In Pages CMS, open **Learning path and quizzes**. **Lessons and quiz questions** contains editable forms for each lesson's title, level, duration, description, objective, icon and quick challenge. Open a lesson card to edit its question, answer text, correct answer letter and explanation. Keep the internal lesson ID unchanged. Use choice letters A–D consistently and ensure the correct-answer letter matches one of the answer choices.

Open **Code examples** to edit an example name, target board and C++ source. Keep the example ID unchanged so buttons and lessons continue to find the right example.

## Safe publishing

CMS saves are Git commits. Prefer editing on a non-production branch first, review the changes, and merge into `main` only when ready. A push to `main` that touches `app/**` triggers the existing GitHub Pages build-and-deploy workflow. To roll back, revert the bad commit in GitHub and merge/push that revert. GitHub repository access protects the CMS; never add a password to front-end code.

## Current limits

These forms manage lesson, quiz and code-example content. Styling controls, a custom `/admin` login page, visual layout designer, and in-app preview/publish/rollback controls are not part of this step. GitHub Pages is static and cannot by itself provide secure server-side authentication.

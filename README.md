# Ethan Osuna Engineering Portfolio

Personal engineering portfolio: https://osuuna.github.io

## Editing

Project content lives in `content/projects.json`. Page templates, including the
home page and About section, live in `scripts/render.mjs`. Images are served from `assets/` where available. The remaining images and
launch video keep their existing public media hosting; preserve that hosting.
External image names are listed in `scripts/render.mjs`; the video URL is in
`content/projects.json`.

After editing content or templates, regenerate the static pages:

```sh
node scripts/render.mjs
```

Commit the source and generated pages to `main`. GitHub Pages publishes from
`main` and the repository root. The `.nojekyll` file serves the generated files
without Jekyll processing. No dependency installation is required.

For a local preview:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000 in a browser.

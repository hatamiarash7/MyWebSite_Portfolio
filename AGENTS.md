# Project Guidelines

Personal portfolio at [portfolio.arash-hatami.ir](https://portfolio.arash-hatami.ir). Jekyll 4 site: Persian RTL content, English `html lang`. See [README.md](README.md) for the CI badge only; setup lives here.

## Build and Test

- Ruby **3.3** (CI pin in `.github/workflows/jekyll.yml`). There is no `.ruby-version`.
- Install: `make install` (sets `build.ffi --enable-libffi-alloc`, then `bundle install` into `vendor/bundle`).
- Serve: `make run` (`bundle exec jekyll serve --livereload`). The VS Code task `jekyll` omits `--livereload`.
- Production-like build: `bundle exec jekyll build`. CI adds `--baseurl` from GitHub Pages and `JEKYLL_ENV=production`.
- Do not commit `_site/` or `vendor/`. There is no test suite.
- Prettier runs in CI on `*.yml`, `*.md`, and `*.scss` only (`.github/workflows/format.yml`). Match that formatting so a follow-up format commit is not needed. HTML, Liquid, and JS are not formatted by CI.

## Architecture

- `_config.yml`: collection `projects` (`output: true`, permalink `/projects/:name`), default layout `page`. Site `permalink` is `/blog/:title`, but there is no `_posts/` directory. `_layouts/post.html` includes a missing `blog/disqus.html` — do not wire new content through that layout.
- `pages/index.md` (`permalink: /`) includes `_includes/landing.html`. `pages/projects.html` includes `_includes/projects/index.html`.
- Layout chain: `page` → `default` (navbar, content, footer, scripts). New top-level pages go in `pages/` with `layout: default`, `title`, `permalink`, and optional `weight` (navbar sorts `site.html_pages` by `weight`). Paths listed in `nav_exclude` stay out of the nav.
- Sass entry is `assets/css/main.scss` (`@use "style"` then `@use "mine"`). Put site overrides in `_sass/_mine.scss`; leave the base theme in `_sass/_style.scss`. Output is compressed `/assets/css/main.css`.
- JS: `assets/js/theme.js` (loaded in `<head>`, default theme is dark, `localStorage` key `theme`). `assets/js/post.js` adds copy buttons on `pre.highlight`. Vendor scripts (jQuery, Bootstrap, WOW, Bricklayer) come from Arvancloud URLs in `_includes/scripts.html`. The projects grid must keep the `.bricklayer` wrapper.
- Analytics and ad slots in `_includes/head.html` render only when `jekyll.environment == 'production'`.

## Conventions

- New project: add `_projects/(NN) title.md` with the next number. The listing uses `site.projects reversed`, so a higher `(NN)` appears first. Front matter the card needs: `title`, `description`, `tools` (array), `image`. Detail page (`_includes/project-info.html`) also uses `developed_date` (Jalali year), `lang`, `techs`, `open_source`. Body may mix Markdown and raw HTML; GitHub buttons use `{% include elements/button.html link="..." text="..." %}`.
- Remote GitHub cards are names in `remote_projects` on `pages/projects.html`. They depend on `site.github`, and `jekyll-github-metadata` is not in the Gemfile, so a local build does not render those cards.
- Liquid in includes uses `{%-` / `-%}` whitespace control. Include paths keep the `.html` extension.
- `baseurl` is `""` locally. Asset URLs that assume a subpath will break unless you pass the same `--baseurl` CI uses.
- Keep copy in Persian where the surrounding page is Persian. Do not change `url`, `repository`, or author fields in `_config.yml` unless asked.

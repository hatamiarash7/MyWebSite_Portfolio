# Portfolio

[![Jekyll site CI](https://github.com/hatamiarash7/MyWebSite_Portfolio/actions/workflows/jekyll.yml/badge.svg)](https://github.com/hatamiarash7/MyWebSite_Portfolio/actions/workflows/jekyll.yml)

Personal site for Arash Hatami, published at [portfolio.arash-hatami.ir](https://portfolio.arash-hatami.ir).

Jekyll 4 site. Page copy is Persian (RTL). The document language is English.

![readme-ascii](https://raw.githubusercontent.com/hatamiarash7/hatamiarash7/master/logo.png)

## Requirements

- Ruby 3.3.6 (`.ruby-version`)
- Bundler 2.3 or newer

## Development

```sh
make install
make run
```

The site is served at <http://127.0.0.1:4000> with live reload and incremental rebuilds.

```sh
make build   # production build into _site/
make clean
```

`_site/` and `vendor/` stay untracked.

## Layout

- `pages/` — top-level pages. Navbar entries are `site.html_pages` sorted by `weight`. Paths in `nav_exclude` stay out of the nav.
- `_projects/` — project writeups. A higher `(NN)` prefix is listed first.
- `_layouts/`, `_includes/`, `_sass/` — page chrome and styles. Site overrides live in `_sass/_mine.scss`.
- `assets/` — CSS entry, scripts, images, and icons.

## CI

- **Jekyll site CI** builds on pull requests and deploys GitHub Pages from `main` only.
- **Formatter** checks Prettier on `*.yml`, `*.yaml`, `*.md`, and `*.scss`. It does not commit.
- **Dependabot** opens weekly updates for GitHub Actions and Bundler. Renovate is disabled so the two bots do not open duplicate pull requests.

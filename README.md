# Portfolio

[![Checks](https://github.com/hatamiarash7/MyWebSite_Portfolio/actions/workflows/checks.yml/badge.svg?branch=main)](https://github.com/hatamiarash7/MyWebSite_Portfolio/actions/workflows/checks.yml)
[![Release](https://github.com/hatamiarash7/MyWebSite_Portfolio/actions/workflows/docker.yml/badge.svg?branch=main)](https://github.com/hatamiarash7/MyWebSite_Portfolio/actions/workflows/docker.yml)
[![Docker Image Size](https://img.shields.io/docker/image-size/hatamiarash7/portfolio/latest)](https://hub.docker.com/r/hatamiarash7/portfolio)
![GitHub License](https://img.shields.io/github/license/hatamiarash7/MyWebSite_Portfolio)

Personal site for Arash Hatami, published at [portfolio.arash-hatami.ir](https://portfolio.arash-hatami.ir).

A static [Astro](https://astro.build) site in Persian (`lang="fa"`, `dir="rtl"`), styled with Tailwind CSS v4 and served by nginx in a Docker container behind the Arvancloud CDN.

![readme-ascii](https://raw.githubusercontent.com/hatamiarash7/hatamiarash7/master/logo.png)

## Requirements

- Node.js 24 (`.nvmrc`)
- pnpm 11 (pinned in `package.json` → `packageManager`; `corepack enable` picks it up)
- Docker, for the production image

## Development

```sh
make install
make dev          # http://127.0.0.1:4321
```

Run `make` to list every target. The common ones:

| Target              | What it does                                                 |
| ------------------- | ------------------------------------------------------------ |
| `make build`        | Static build into `dist/`                                    |
| `make preview`      | Serve `dist/` locally                                        |
| `make check`        | `astro check` (types and content schemas) and Prettier check |
| `make format`       | Format everything with Prettier                              |
| `make lighthouse`   | Build, then run Lighthouse CI against `lighthouserc.json`    |
| `make docker-build` | Build the production image as `hatamiarash7/portfolio:local` |
| `make docker-run`   | Serve that image on <http://127.0.0.1:8080>                  |

Analytics render only in production builds (`make build`, the Docker image), never in `make dev`.

## Layout

```text
src/
  content/projects/   One Markdown file per project; the file name is the URL slug
  assets/projects/    Covers and screenshots, one folder per project slug
  assets/fonts/       Self-hosted Vazirmatn (Persian digits) and JetBrains Mono
  components/         Shared components; home/ holds the landing page sections
  data/               Site metadata, profile, socials, skills, experience
  pages/              Routes: /, /projects, /projects/[id], 404
  styles/global.css   Design tokens, Tailwind theme, article (prose) styles
public/               Files copied as-is: icons, manifest, robots.txt, videos/
nginx/                Server config, security headers, legacy redirect map
```

## Adding a project

1. Create `src/content/projects/<slug>.md`. The slug becomes `/projects/<slug>`.
2. Put images in `src/assets/projects/<slug>/`.
3. Fill in the front matter. `src/content.config.ts` is the schema, and `pnpm check` validates it:

```yaml
---
title: عنوان پروژه
description: یک یا دو جمله برای کارت و توضیحات متا.
cover: ../../assets/projects/<slug>/cover.webp # optional; a generated cover is used otherwise
order: 43 # unique; higher numbers are listed first
year: 1405 # Jalali year
openSource: true
featured: false # featured projects appear on the home page
stack:
  - Go
  - Docker
links:
  - label: گیت‌هاب
    url: https://github.com/hatamiarash7/<repo>
    kind: repo # repo | demo | download | post
---
```

In the body, an image with a caption is a Markdown image followed directly by an italic line:

```md
![صفحه اصلی](../../assets/projects/<slug>/home.webp)
_صفحه اصلی_
```

Videos go in `public/videos/` as WebM with a poster JPEG. Embed them with `<video controls preload="none" playsinline width="…" height="…" poster="/videos/<name>.jpg">`.

## Deployment

On every push to `main`, the **Docker** workflow builds an amd64 image and pushes it to Docker Hub as [`hatamiarash7/portfolio`](https://hub.docker.com/r/hatamiarash7/portfolio):

| Trigger        | Tags                       |
| -------------- | -------------------------- |
| Push to `main` | `latest`, short commit SHA |
| Tag `v1.2.3`   | `1.2.3`, `1.2`             |
| Pull request   | Built only, never pushed   |

The workflow needs two repository secrets: `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` (a Docker Hub access token with write scope).

Deploying is manual. On the server, next to `docker-compose.yml`:

```sh
docker compose pull
docker compose up -d
```

The container runs as an unprivileged user with a read-only root filesystem. `NGINX_PORT` sets the nginx listener and published host port, defaulting to `8080`. `GET /healthz` returns `ok`, and the container health check uses the configured port.

To use a custom port, copy `.env.example` to `.env` next to `docker-compose.yml` and set `NGINX_PORT=9090`, or pass it in the environment:

```sh
NGINX_PORT=9090 docker compose up -d
```

For a locally built image:

```sh
NGINX_PORT=9090 make docker-run
# Or run Docker directly:
docker run --rm -e NGINX_PORT=9090 -p 127.0.0.1:9090:9090 \
  --read-only --tmpfs /tmp hatamiarash7/portfolio:local
```

Compose loads `.env` automatically; `make docker-run` reads `NGINX_PORT` from the shell environment or a Make command-line assignment. The image entrypoint renders the nginx configuration under `/tmp`, so custom ports work with the read-only root filesystem.

### Caching and compression

| Path                       | `Cache-Control`                                    |
| -------------------------- | -------------------------------------------------- |
| `/_astro/*` (hashed files) | `public, max-age=31536000, immutable`              |
| `/videos/*`                | `public, max-age=2592000`                          |
| Icons, manifest, robots    | `public, max-age=3600`                             |
| HTML pages                 | `public, max-age=0, s-maxage=300, must-revalidate` |

HTML is cached by the CDN for 5 minutes and revalidated by browsers, so a new release is live everywhere within 5 minutes without a purge. Purge the Arvancloud cache if you need it sooner.

Text files are gzipped at build time and served with `gzip_static`. The nginx image has no brotli module, and Arvancloud serves brotli to visitors from its edge anyway.

### Security headers

`nginx/security-headers.conf` sets HSTS, `nosniff`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP and a Content Security Policy. The CSP is sent as `Content-Security-Policy-Report-Only`, so violations show up in the browser console without blocking anything. Once production runs clean with Plausible and Ahrefs loaded, rename the header to `Content-Security-Policy`.

## Legacy URLs

The previous Jekyll site served projects at `/projects/<NN>-<slug>` (for example `/projects/16-webhook-handler`). Those URLs are indexed by search engines and linked from other sites, so nginx answers them with a **301 to the new URL** instead of a 404:

- `nginx/redirects.map` lists one `old new;` pair per project. `/sitemap.xml` also redirects to `/sitemap-index.xml`.
- `nginx/default.conf` normalizes the `.html` and trailing-slash variants before the lookup, so every old form reaches its new page in a single redirect.
- Each redirect is logged to `/var/log/nginx/legacy/legacy-redirects.log`, with the referer and user agent. The log lives in the `legacy-logs` volume, so it survives container restarts:

```sh
docker compose exec portfolio tail -f /var/log/nginx/legacy/legacy-redirects.log
```

Use the referers in that log to ask the linking sites to update their links. Once the log has stayed empty for a few months, and Search Console no longer reports the old URLs, delete `nginx/redirects.map`, the two `map` blocks and the `if ($legacy_target)` block in `nginx/default.conf`, and the log volume.

If you rename a project slug later, add a line for the old slug to `nginx/redirects.map`.

## CI

- **CI** runs on pull requests and on `main`: Prettier, `astro check`, a production build, and Lighthouse CI. Budgets in `lighthouserc.json`: performance ≥ 0.9; accessibility, best practices and SEO ≥ 0.95; CLS ≤ 0.05; and size caps on scripts, styles and fonts. Reports are uploaded as a workflow artifact.
- **Docker** builds and publishes the image (see [Deployment](#deployment)).
- **Renovate** keeps npm packages, Docker base images and GitHub Actions up to date.

## License

[GPL-3.0](LICENSE)

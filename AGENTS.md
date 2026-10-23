# Project Guidelines

Personal portfolio at [portfolio.arash-hatami.ir](https://portfolio.arash-hatami.ir). Static Astro 7 site, Persian only (`lang="fa"`, `dir="rtl"`), Tailwind CSS v4, served by nginx in Docker behind the Arvancloud CDN. Human setup and deployment are in [README.md](README.md).

## Build and verify

- Node 24 (`.nvmrc`) and pnpm 11 (`packageManager`). `make` lists every target.
- Before committing, all of these must pass: `pnpm format:check`, `pnpm check` (types and the content schema), and `pnpm build`. CI also runs Lighthouse CI with the budgets in `lighthouserc.json`.
- Prettier formats everything, including `.astro`, Markdown and CSS. Run `pnpm format` rather than hand-aligning.
- There is no test suite. Verify UI changes visually in both themes (`data-theme="dark"` / `"light"`) at mobile and desktop widths.

## Content

- A project is `src/content/projects/<slug>.md`. The file name is the URL (`/projects/<slug>`), and the schema is `src/content.config.ts`.
- `order` is unique; higher numbers are listed first. `featured: true` puts the project on the home page.
- Project images live in `src/assets/projects/<slug>/` and are referenced relatively (`../../assets/projects/<slug>/x.webp`) so Astro optimizes them. An image caption is an italic line directly under the image; `.article p:has(> img) > em` styles it.
- Renaming a published slug breaks links: add the old path to `nginx/redirects.map`.
- All site content is production-ready and renders in both development and production.
- Keep `url`, `repository` and author fields in `src/data/site.ts` and `astro.config.mjs` unchanged unless asked.

## Conventions

- Copy is Persian. Format numbers with `toPersianDigits` (`src/lib/format.ts`). Use logical properties (`ms-`, `pe-`, `start-`, `text-end`); use physical sides only inside LTR islands such as code blocks.
- Mark English stack names in chips `dir="ltr"`. Leave short English labels like the eyebrows in the page direction.
- Design tokens are CSS variables in `src/styles/global.css`, mapped to Tailwind with `@theme inline`. Define reusable classes with `@utility` so they can be `@apply`'d. In `.article`, `@apply prose` must come before the `--tw-prose-*` overrides.
- `<Picture>`/`<Image>` in components set `layout="none"` and explicit `widths`/`sizes`. The global `image.layout: "constrained"` exists for Markdown images, and Astro's responsive-image CSS is unlayered, so it overrides Tailwind sizing and `object-position` utilities.
- Icons go through `astro-icon` (`tabler:*`, `simple-icons:*`, local `src/icons/*.svg`). Map stack names to Simple Icons in `src/data/stack-icons.ts`.
- Scripts stay small and progressive: content must work without JavaScript. Show JS-only UI with `[@media(scripting:enabled)]:flex` rather than unhiding it from a script, which causes layout shift (see the projects filter). Motion is CSS-only and sits behind `prefers-reduced-motion: no-preference`.
- Outbound project links keep the Plausible class `plausible-event-name=<Event>` (`linkMeta` in `src/lib/projects.ts`). Analytics and the Yektanet slot render only when `import.meta.env.PROD`.

## Serving

- `build.format: "file"` emits `projects.html` and `projects/<slug>.html`. nginx maps clean URLs with `try_files $uri $uri.html` and 301s trailing slashes and `.html` to one canonical form. Keep internal links slash-less (`/projects`, not `/projects/`).
- `add_header` in an nginx `location` replaces inherited headers. Every content location includes `nginx/security-headers.conf`; new locations must too.
- The CSP is report-only. When adding a third-party origin, add it to `nginx/security-headers.conf`.

# syntax=docker/dockerfile:1

FROM node:24.22.1-trixie-slim AS build

ENV PNPM_HOME=/pnpm \
  PATH=/pnpm:$PATH \
  COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
  ASTRO_TELEMETRY_DISABLED=1

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .
RUN pnpm build \
  && find dist -type f -size +1k \
  \( -name '*.html' -o -name '*.css' -o -name '*.js' -o -name '*.svg' -o -name '*.xml' \
  -o -name '*.txt' -o -name '*.json' -o -name '*.webmanifest' -o -name '*.ico' \) \
  -exec gzip -9 --keep --no-name {} +

FROM nginx/nginx-unprivileged:1.31-alpine

ENV NGINX_PORT=8080 \
  NGINX_ENVSUBST_OUTPUT_DIR=/tmp \
  NGINX_ENVSUBST_FILTER=^NGINX_PORT$

LABEL org.opencontainers.image.title="portfolio" \
  org.opencontainers.image.description="Arash Hatami's portfolio" \
  org.opencontainers.image.url="https://portfolio.arash-hatami.ir" \
  org.opencontainers.image.source="https://github.com/hatamiarash7/MyWebSite_Portfolio" \
  org.opencontainers.image.licenses="GPL-3.0-only"

USER root
RUN mkdir -p /var/log/nginx/legacy \
  && chown nginx:nginx /var/log/nginx/legacy \
  && printf 'include /tmp/default.conf;\n' > /etc/nginx/conf.d/default.conf
USER nginx
VOLUME /var/log/nginx/legacy

COPY nginx/default.conf /etc/nginx/templates/default.conf.template
COPY nginx/security-headers.conf nginx/redirects.map /etc/nginx/
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE ${NGINX_PORT}

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider "http://127.0.0.1:${NGINX_PORT}/healthz" || exit 1

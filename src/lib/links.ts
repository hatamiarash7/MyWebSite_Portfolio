import { site } from "../data/site.ts";

/** Add attribution to outbound web links when rendering them. */
export function withUtmSource(href: string): string {
  const url = URL.parse(href, site.url);
  if (!url || !["http:", "https:"].includes(url.protocol) || url.origin === new URL(site.url).origin) {
    return href;
  }

  url.searchParams.set("utm_source", "arash-hatami.ir");
  return url.href;
}

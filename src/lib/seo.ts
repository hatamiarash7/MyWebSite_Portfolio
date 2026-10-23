import type { ImageMetadata } from "astro";
import { getImage } from "astro:assets";
import { site } from "@/data/site";

export async function socialImage(src: ImageMetadata, width = 1200) {
  const image = await getImage({ src, width, format: "jpg", quality: 82, layout: "none" });
  return {
    url: new URL(image.src, site.url).href,
    width: Number(image.attributes.width ?? width),
    height: Number(image.attributes.height ?? 0),
  };
}

export interface Crumb {
  label: string;
  href: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: new URL(crumb.href, site.url).href,
    })),
  };
}

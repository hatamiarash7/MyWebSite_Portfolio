// @ts-check
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig, fontProviders } from "astro/config";
import { withUtmSource } from "./src/lib/links.ts";

export default defineConfig({
  site: "https://portfolio.arash-hatami.ir",
  trailingSlash: "never",
  build: {
    format: "file",
  },
  compressHTML: true,
  devToolbar: {
    enabled: false,
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },
  image: {
    layout: "constrained",
    responsiveStyles: true,
  },
  markdown: {
    processor: satteri({
      hastPlugins: [
        {
          name: "external-link-attribution",
          element: {
            filter: ["a"],
            visit(node, ctx) {
              const href = node.properties?.href;
              if (typeof href === "string") ctx.setProperty(node, "href", withUtmSource(href));
            },
          },
        },
      ],
    }),
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark-dimmed" },
      defaultColor: false,
    },
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Vazirmatn RD FD",
      cssVariable: "--font-vazirmatn",
      fallbacks: ["Tahoma", "sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/Vazirmatn-RD-FD-wght.woff2"],
            weight: "100 900",
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains",
      fallbacks: ["monospace"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/JetBrainsMono-wght.woff2"],
            weight: "100 800",
            style: "normal",
          },
        ],
      },
    },
  ],
  integrations: [
    icon(),
    sitemap({
      filter: (page) => !page.endsWith("/404"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});

// @ts-check
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig, fontProviders } from "astro/config";

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

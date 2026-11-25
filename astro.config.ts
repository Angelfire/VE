import { defineConfig } from "astro/config"

import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://velocidadescape.com/",
  integrations: [mdx(), sitemap()],
  // Astro 7 defaults to "jsx", which drops whitespace between inline elements.
  // Keep the v6 behavior so rendered text stays the same.
  compressHTML: true,

  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },

  vite: {
    plugins: [tailwindcss()]
  }
})
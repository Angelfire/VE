import { defineConfig } from "astro/config"

import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"

// https://astro.build/config
export default defineConfig({
  site: "https://velocidadescape.com/",
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    svg: {
      mode: "sprite",
    },
  },
})

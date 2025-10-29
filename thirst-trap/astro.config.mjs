// astro.config.mjs
// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://bigbeautifulboycott.us",
  output: "static",
  vite: {
    plugins: [tailwindcss()],
    define: {
      "process.env.STRAPI_URL": JSON.stringify(process.env.STRAPI_URL),
      "process.env.STRAPI_TOKEN": JSON.stringify(process.env.STRAPI_TOKEN),
    },
  },
  integrations: [sitemap()],
});

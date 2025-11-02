// astro.config.mjs
// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// if you want to derive from env, you can, but the host is fixed for you:
const MEDIA_HOST = "media.bigbeautifulboycott.us";

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
  // 🔑 Let Astro fetch + optimize remote images from your Cloudflare R2 CDN
  image: {
    service: { entrypoint: "astro/assets/services/sharp" }, // good quality/perf
    remotePatterns: [
      { protocol: "https", hostname: MEDIA_HOST },
    ],
  },
  integrations: [sitemap()],
});

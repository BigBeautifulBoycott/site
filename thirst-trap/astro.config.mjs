// astro.config.mjs
// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

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
    // 👇 Vite dev proxy (Astro uses this only in `astro dev`)
    server: {
      proxy: {
        // forward all /api/* calls to prod
        "/api": {
          target: "https://bigbeautifulboycott.us",
          //target: "http://localhost:1337",
          changeOrigin: true,
          // optional but nice for logging on the Worker side:
          headers: { "X-Dev-Proxy": "astro" },
        },
      },
    },
  },
  // 🔑 Let Astro fetch + optimize remote images from your Cloudflare R2 CDN
  image: {
    service: { entrypoint: "astro/assets/services/sharp" },
    remotePatterns: [{ protocol: "https", hostname: MEDIA_HOST }],
  },
  integrations: [sitemap()],
});

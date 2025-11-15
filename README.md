# Big Beautiful Site
This repo contains the frontend template and is connected to Cloudflare pages for deployment


repos/BigBeautifulBoycott/site/thirst-trap


server: {
  proxy: {
    // forward all /api/* calls to prod
    "/api": {
      target: "https://bigbeautifulboycott.us",
      changeOrigin: true,
      // optional but nice for logging on the Worker side:
      headers: { "X-Dev-Proxy": "astro" },
    },
  },
},

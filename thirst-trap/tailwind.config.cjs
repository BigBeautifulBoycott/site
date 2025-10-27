/** @type {import('tailwindcss').Config} */
const themes = require("daisyui/src/theming/themes");

module.exports = {
  content: ["./src/**/*.{astro,html,js,ts,jsx,tsx,css}"],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      // Page default (LIGHT) → corporate base + your brand overrides
      {
        "bbb-default": {
          ...themes["corporate"],
          primary:   "#4f46e5",
          secondary: "#22c55e",
          accent:    "#f97316",
          neutral:   "#0f172a",
          // surfaces (optional; corporate defaults are fine)
          // base-100: "#ffffff",
          // base-200: "#f6f7f9",
          // base-300: "#e5e7eb",
          info:    "#38bdf8",
          success: "#22c55e",
          warning: "#f59e0b",
          error:   "#ef4444",
        },
      },

      // Page default (DARK) → abyss base + your brand overrides
      {
        "bbb-default-dark": {
          ...themes["abyss"],
          primary:   "#60a5fa",
          secondary: "#34d399",
          accent:    "#fb923c",
          neutral:   "#0b2531",
          // darker surfaces to match your reference
          base-100:  "#0e2936",
          base-200:  "#0a1f29",
          base-300:  "#153847",
          info:    "#38bdf8",
          success: "#22c55e",
          warning: "#f59e0b",
          error:   "#ef4444",
        },
      },

      // Header (kept as a separate, always-light theme)
      {
        "bbb-header": {
          ...themes["corporate"],
          primary:   "#4f46e5",
          secondary: "#22c55e",
          accent:    "#f97316",
          neutral:   "#0f172a",
          base-100:  "#ffffff",
          base-200:  "#f6f7f9",
          base-300:  "#e5e7eb",
        },
      },

      // Footer (kept as a separate, always-dark theme)
      {
        "bbb-footer": {
          ...themes["abyss"],
          primary:   "#60a5fa",
          secondary: "#34d399",
          accent:    "#fb923c",
          neutral:   "#0b2531",
          base-100:  "#0e2936",
          base-200:  "#0a1f29",
          base-300:  "#153847",
        },
      },
    ],
  },
};

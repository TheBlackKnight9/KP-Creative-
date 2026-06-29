/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: "var(--terracotta)",
        ink: "var(--ink)",
        "ink-60": "var(--ink-60)",
        blush: "var(--blush)",
        "blush-border": "var(--blush-border)",
      },
    },
  },
  plugins: [],
}

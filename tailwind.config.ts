import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f3f9",
          100: "#d9e0ef",
          200: "#b3c1df",
          300: "#8da2cf",
          400: "#6783bf",
          500: "#4164af",
          600: "#34508c",
          700: "#273c69",
          800: "#1a2846",
          900: "#0f172a",
          950: "#080c16",
        },
      },
    },
  },
  plugins: [],
};
export default config;

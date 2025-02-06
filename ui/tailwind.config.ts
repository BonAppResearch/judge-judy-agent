import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "2xl": { max: "1535px" }, // => @media (max-width: 1535px) { ... }
        xl: { max: "1279px" }, // => @media (max-width: 1279px) { ... }
        lg: { max: "1023px" }, // => @media (max-width: 1023px) { ... }
        md: { max: "767px" }, // => @media (max-width: 767px) { ... }
        sm: { max: "639px" }, // => @media (max-width: 639px) { ... }
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;

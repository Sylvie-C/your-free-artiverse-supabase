import type { Config } from "tailwindcss"

export default {
  darkMode: "media", 
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainDark: "#000000",
        mainLight: "#e3d2fc", 

        btnDark: "#251c31", 
        btnLight: "#ffcbba", 

      },
      boxShadow: {
        btnShadowLight: "0 0 10px #ffcbba",     // saumon
        btnShadowDark : "0 0 10px #0c0317",     // violet foncé
      }, 
      letterSpacing: {
        mainTitle: "1rem", 
      }
    },
  },
  plugins: [],
} satisfies Config

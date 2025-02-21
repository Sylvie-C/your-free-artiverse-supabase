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

        modalDark: "#251c31", 
        modalLight: "#ffcbba", 

        inputLight: "#ffcbba", 
        inputDark: "#0c0317", 

        inputBorder: {
          light: "#f472b6", 
          dark: "#be185d", 
        }, 

        formIconBtn_light: "#a3fdff", 
        formIconBtn_dark: "#4e8485", 
      },
      boxShadow: {
        btnShadowLight: "0 0 10px #ffcbba",     // saumon
        btnShadowDark : "0 0 10px #0c0317",     // violet foncé
      }, 
      letterSpacing: {
        mainTitle: "1rem", 
      }, 
      animation: { 
        wavy: "wavyAnim 5s infinite ease-in-out"
      }, 
      keyframes: { 
        wavyAnim: {
          '0%': { transform: "translateY(0px)" },
          '20%': { transform: "translateY(-30px)" }, 
          '40% , 100%': { transform: "translateY(0px)" }
        }, 
      }, 
    },
  },
  plugins: [
    function ({ addComponents , theme }
      : { addComponents: (components: Record<string,any>) => void, 
          theme: (path: string) => string }) {
      addComponents({
        'input:focus': {
          outline: `2px solid ${theme('colors.inputBorder.light')}`, 
          borderColor: "transparent",
        },
        '.dark .input:focus': {
          outline: `2px solid ${theme('colors.inputBorder.dark')}`,
          borderColor: "transparent",
        }
      });
    },
  ],


} satisfies Config



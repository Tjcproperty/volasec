/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Archivo Expanded", "sans-serif"],
      },
      colors: {
        // Steel Blue - Core Colour (Primary)
        primary: {
          DEFAULT: "#0E1A2B",
          80: "#0E1A2BCC",
          50: "#0E1A2B80",
          30: "#0E1A2B4D",
          foreground: "#FFFFFF",
        },
        // Slate White - Secondary Colour
        secondary: {
          DEFAULT: "#F1F2F2",
          80: "#F1F2F2CC",
          50: "#F1F2F280",
          30: "#F1F2F24D",
          foreground: "#0C0C0C",
        },
        // Obsidian Black - Secondary Colour
        dark: {
          DEFAULT: "#0C0C0C",
          80: "#0C0C0CCC",
          50: "#0C0C0C80",
          30: "#0C0C0C4D",
          foreground: "#F1F2F2",
        },
      },
    },
  },
  plugins: [],
};

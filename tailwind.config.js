/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      // ✅ Disable OKLCH output by using raw hex / RGB
      colors: {
        background: "#0b0e17",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "rgb(59,130,246)", // blue-500
          dark: "rgb(37,99,235)", // blue-600
        },
      },
    },
  },
  // ✅ This forces Tailwind to use pre-OKLCH color generation mode
  future: {
    disableColorOpacityUtilitiesByDefault: false,
  },
  experimental: {
    optimizeUniversalDefaults: false,
  },
  plugins: [],
};

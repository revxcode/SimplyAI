/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        bebasneue: ["Bebas Neue", "cursive"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

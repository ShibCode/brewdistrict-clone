/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Freudian",
        roseford: "Roseford",
        eczar: "Eczar",
      },

      colors: {
        primary: "#f8f7e5",
        secondary: "#1d1d1d",
      },
    },
  },
  plugins: [],
};

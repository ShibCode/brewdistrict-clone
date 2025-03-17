const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "550px",
        ...defaultTheme.screens,
      },

      fontFamily: {
        sans: "Freudian",
        roseford: "Roseford",
        eczar: "Eczar",
      },

      colors: {
        primary: "#f8f7e5",
        secondary: "#1d1d1d",
        model: "var(--model-color)",
      },
    },
  },
  plugins: [],
};

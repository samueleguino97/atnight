/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1e385e",
          lightBlue: "#6288c9",
          darkGold: "#e9a562",
          gold: "#dcb067",
          grey: "#e7e7e7",
        },
      },
    },
  },
  plugins: [],
};

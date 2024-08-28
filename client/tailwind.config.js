/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Herr Von Muellerhoff", "cursive"],
        circular: ["Overpass", "sans-serif"],
      },
    },
  },
  plugins: [],
};

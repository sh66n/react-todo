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
    backgroundImage: {
      "prod-bg": "url(./src/assets/img/prod-bg.jpg)",
      cityscape: "url(./src/assets/img/cityscape.jpg)",
      "girl-waterfall": "url(./src/assets/img/girl-waterfall.jpg)",
      mountain: "url(./src/assets/img/mountain.jpg)",
      cloudy: "url(./src/assets/img/cloudy-scenery.jpg)",
      pinky: "url(./src/assets/img/pinky.jpg)",
      ambient: "url(./src/assets/img/ambient.jpg)",
    },
  },
  plugins: [],
};

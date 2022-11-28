const { purple } = require('color-name')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "dark-purple-font": "#925FF0",
        "light-purple-bg": "#F5EFFF",
        "dark-purple-bg": "#B080FF",
        "dark-purple-hv": "#A772FF",
        "yellow": "#FFF296",
        "dark-blue-bg": "#6a8aeb"
      }
    },
  },
  plugins: [],
}

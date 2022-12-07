const { purple } = require('color-name')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        "black": "#333333",
        "dark-purple-font": "#925FF0",
        "light-purple-bg": "#F5EFFF",
        "light-purple": "#D6BDFF",
        "dark-purple-bg": "#B080FF",
        "dark-purple-hv": "#A772FF",
        "yellow": "#FFF296",
        "dark-blue-bg": "#7FCFFF",
        "light-blue-bg": "#BDE6FF"
        
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}

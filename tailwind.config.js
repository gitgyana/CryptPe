/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#B2C6D5',
        secondary: '#E7F2E4',
        light: {
          100: '#ECEBDE',
          200: '#D7D3BF',
          300: '#C1BAA1',
        },
        dark: {
          100: '#393E46',
          200: '#222831',
        },
        accent: '#5E686D'
      }
    },
  },
  plugins: [],
}
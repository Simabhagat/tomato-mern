/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        'bungee' : ['Bungee Spice']
      }
    },
  },
  plugins: [
    require('flowbite/plugin'), // Add Flowbite plugin
  ],
}


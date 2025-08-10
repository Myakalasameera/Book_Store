/** @type {import('tailwindcss').Config} */
export default {
  content: [  // This is the path to all of the files that Tailwind should look at to find the classes that are being used in the project.
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FFCE1A',
        'secondary': '#0d0842',
        'blackBG': '#F3F3F3',
        'Favorite': '#FF5841'
      }
    },
    fontFamily: {
      'primary': ["Montserrat", "sans-serif"],
      'secondary': ["Nunito Sans", "sans-serif"],
    }
  },
  plugins: [],
}


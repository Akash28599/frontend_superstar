/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kelloggs-red': '#F60945',
        'kelloggs-gold': '#FBCA05',
      },
      fontFamily: {
        'kelloggs': ['"Kellogg\'s Sans"', 'Arial', 'sans-serif'],
      },
      screens: {
        'xs': '480px',
        'tablet': '1000px',
        'desktop': '1200px',
        'wide': '1350px',
        'xl-wide': '1440px',
        'xxl': '1600px',
      }
    },
  },
  plugins: [],
}

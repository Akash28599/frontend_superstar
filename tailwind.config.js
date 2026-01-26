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
        'kelloggs': ['"KelloggsSans"', 'Arial', 'sans-serif'],
      },
      screens: {
        // Mobile first approach - smallest to largest
        'xxs': '320px',      // Very small phones
        'xs': '375px',       // Standard phones (iPhone SE, etc.)
        'sm': '480px',       // Large phones
        'md': '640px',       // Phablets
        'tablet-sm': '768px', // Small tablets, iPad Mini
        'tablet': '800px',   // Older laptop minimum (800x600)
        'lg': '1024px',      // Large tablets, iPad, older laptops (1024x768)
        'laptop-sm': '1280px', // Standard laptops
        'laptop': '1366px',  // Common laptop resolution (1366x768)
        'laptop-lg': '1440px', // MacBook, larger laptops (1440x900)
        'desktop': '1536px', // Desktop transition
        'wide': '1600px',    // Wide monitors
        'xl': '1920px',      // Full HD desktop (1920x1080)
        'xl-wide': '2048px', // Large monitors
        '2xl': '2560px',     // QHD monitors (2560x1440)
        '4k': '3840px',      // 4K monitors
      }
    },
  },
  plugins: [],
}

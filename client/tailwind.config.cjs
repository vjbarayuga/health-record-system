/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ISPSC Softer Colors - Easy on the eyes
        'ispsc-maroon': '#A0522D',        // Softer sienna brown
        'ispsc-green': '#4A6741',         // Softer forest green
        'ispsc-gold': '#D4A574',          // Softer gold/tan
        'ispsc-dark-maroon': '#8B4513',   // Saddle brown
        'ispsc-light-green': '#6B8E65',   // Sage green
        'ispsc-accent': '#B8956A',        // Warm beige accent
      },
      backgroundImage: {
        'ispsc-gradient': 'linear-gradient(135deg, #E8DDD3 0%, #D4E5D0 100%)',
        'ispsc-gradient-reverse': 'linear-gradient(135deg, #D4E5D0 0%, #E8DDD3 100%)',
      },
    },
  },
  plugins: [],
}

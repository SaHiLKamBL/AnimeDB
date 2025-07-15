/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dancing: ['var(--font-dancing)', 'cursive'],
        michroma: ['var(--font-michroma)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

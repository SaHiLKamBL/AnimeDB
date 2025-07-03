/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0d1117',
        card: '#161b22',
        text: {
          main: '#f0f6fc',
          muted: '#8b949e',
        },
        border: '#30363d',
        greenTag: '#238636',
        badge: '#21262d',
        genreBlue: '#1f6feb',
      },
    },
  },
  plugins: [],
}

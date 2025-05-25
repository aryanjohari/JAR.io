/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "sakshi-pink": "#ff99cc", // Sakshi's favorite color (assumed)
        "terminal-bg": "#1a1a1a",
        "terminal-text": "#00ff00",
      },
    },
  },
  plugins: [],
};

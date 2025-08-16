// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2a6a97',
          light: '#3a7ca5',
          lighter: '#4a8bb8',
          dark: '#1e3a8a',
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark"],
    darkTheme: "dark",
  },
};

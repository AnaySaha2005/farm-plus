/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables dark mode support
  theme: {
    extend: {
      colors: {
        // Light Mode Colors
        lightBackground: "#E9F5DB", // Sap-light greenish
        lightButton: "#D4E9B2", // Very light greenish
        lightAccent: "#A67B5B", // Mid brown

        // Dark Mode Colors
        darkBackground: "#1E3A28", // Dark greenish
        darkButton: "#2D2D2D", // Greyish-black
        darkAccent: "#7D5A50", // Subtle brown
      },
    },
  },
  plugins: [],
};


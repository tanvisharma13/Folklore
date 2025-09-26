/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src//*.{js,ts,jsx,tsx}", // ✅ Ensure this includes JSX/TSX files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5D4037",   // Brown
        secondary: "#F5F5DC", // Beige
        blackBG: "#FAF3E0",   // Light Cream
        favorite: "#ffc300",  // Yellow
      },
      fontFamily: {
        primary: ["Montserrat", "sans-serif"],
        secondary: ["Montserrat", "sans-serif"]
      },
    },
  },
  plugins: [],
};
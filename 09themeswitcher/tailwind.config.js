/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // React ke liye
  ],
  // inside tailwind.config.js tells Tailwind how to enable dark mode in your project.
  // html se jo functionality aati h use enable krne k liye Tailwind m ek mode hota h
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
};

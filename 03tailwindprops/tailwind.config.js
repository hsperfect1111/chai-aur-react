// TailwindCSS v3 ka traditional setup start kar diya hai.
// npm install -D tailwindcss@3.4.17 postcss autoprefixer
// npx tailwindcss init -p

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // React ke liye
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

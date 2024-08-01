/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-black": "#141011",
        "custom-purple": "#5F3D8E",
        "custom-deep-purple": "#3E2D4F",
        "custom-green": "#7B9D9E",
      },
    },
  },
  plugins: [],
}


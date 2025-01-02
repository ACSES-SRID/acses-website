/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "acses-green": {
          50: "#ecf5f0",
          100: "#c7e9d7",
          200: "#a5d6c5",
          300: "#82c9b3",
          400: "#56b894",
          500: "#114924",
          600: "#0d5323",
          700: "#0a4621",
          800: "#07431a",
          900: "#033015"
        },
        "acses-yellow": {
          50: "#fdf8e3",
          100: "#fce9c4",
          200: "#f8e0a8",
          300: "#f3d493",
          400: "#f2c37c",
          500: "#f7a722",
          600: "#f59d38",
          700: "#f4912f",
          800: "#f38426",
          900: "#f2771f"
        },
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px"
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Lato", "sans-serif"],
    },
    extend: {
      darkblue: "#064789",
      lightblue: "#BCD4DE",
      blue: "#586BA4",
      yellow: "#F5DD90",
      orange: "#F68E5F",
      red: "#F76C5E",
      darksage: "#7A9BA9",
      buttongrey: "#F3F3F3",
    },
  },
  plugins: [],
};

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
			boxShadow: {
				"md+": "0 15px 25px -7px rgba(0,0, 0, 0.4)",
			},
			colors: {
				custom_darkblue: "#064789",
				custom_lightblue: "#BCD4DE",
				custom_blue: "#586BA4",
				custom_yellow: "#F5DD90",
				custom_orange: "#F68E5F",
				custom_red: "#F76C5E",
				custom_darksage: "#7A9BA9",
				custom_buttongrey: "#F3F3F3",
			},
		},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};

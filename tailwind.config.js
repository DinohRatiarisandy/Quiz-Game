const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		colors: {
			black: {
				dark: "#030B17",
				light: "#051429",
			},
			gray: {
				default: "#F0F0F0",
				border: "#f5f5f505",
			},
			error: "#29091D",
			bgButton: {
				default: "#011129",
				hover: "#051429",
			},
			correct: "#062903",
		},
		extend: {
			fontFamily: {
				dancing: ['"Dancing Script"', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
};

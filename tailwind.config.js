/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        brown: "#8D674F",
        beige: "#F0D0B7",
        lightBrown: "#D1B19C",
        peachy: "#F1CCA6"
      },
      borderRadius: {
        sm: "4px"
      },
      fontFamily: {
        "spicy-rice": "Spicy Rice"
      },
      boxShadow: {
        button: "0px 4px 0px 0px #8D674F"
      }
    },
  },
  plugins: [],
};

const mtConfig = require("@material-tailwind/react").mtConfig;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontWeight: {
      thin: "100",
      hairline: "100",
      light: "300",
      normal: "400",
      medium: "500",
      bold: "700",
    },
    extend: {
      fontFamily: {
        IBM: ["IBM", "sans-serif"],
      },
    },
  },
  plugins: [mtConfig],
};

const scroll = require("tailwind-scrollbar");
// require('tailwindcss-animatecss');

module.exports = {
  mode: "jit",
  content: ["./src/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // gray: {
        //   100: '#D7D7D7',
        //   200: '#BCBCBC',
        //   300: '#999999',
        //   400: '#787878',
        //   500: '#5A5A5A',
        //   600: '#333333',
        //   700: '#232323',
        //   800: '#0A0A0A',
        //   900: '#000000'
        // }

        gray: {
          25: "#EDEDED",
          50: "#DBDBDB",
          100: "#B8B8B8",
          200: "#949494",
          300: "#707070",
          400: "#4E4E4E",
          500: "#3D3D3D",
          600: "#2E2E2E",
          700: "#1F1F1F",
          800: "#0F0F0F",
          900: "#000",
        },
        // gray: {
        //   50: '#EDEDED',
        //   100: '#DBDBDB',
        //   200: '#B8B8B8',
        //   300: '#949494',
        //   400: '#707070',
        //   500: '#4E4E4E',
        //   600: '#3D3D3D',
        //   700: '#2E2E2E',
        //   800: '#1F1F1F',
        //   900: '#0F0F0F'
        // }
      },
      animation: {
        shakeXInfinite: "shakeX 3s infinite",
        shakeX: "shakeX 0.5s",
      },
      keyframes: {
        shakeX: {
          "from, to": {
            transform: "translate3d(0, 0, 0)",
          },
          "10%, 30%, 50%, 70%, 90%": {
            transform: "translate3d(-10px, 0, 0)",
          },
          "20%, 40%, 60%, 80%": {
            transform: "translate3d(10px, 0, 0)",
          },
        },
      },
    },
  },
  variants: {},
  plugins: [scroll({ nocompatible: true })],
};

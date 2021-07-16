const { screens } = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: "400px",
      ...screens,
    },
    backgroundImage: {
      cardpics: "url('../public/cardpics.jpeg')",
    },
    colors: {
      blueish: {
        50: "#F8F9FD",
        100: "#D5E6FB",
        150: "#DAE4FD",
        200: "#56CCF2",
        250: "#2F80ED",
      },
      greenish: {
        50: "#D3EADD",
        100: "#6FCF97",
        150: "#219653",
      },
      greyish: {
        50: "#F2F2F2",
        100: "#828282",
        150: "#BDBDBD",
        200: "#4F4F4F",
        200: "#E0E0E0",
      },
      yellowish: {
        50: "#FCF4DB",
        100: "#F2C94C",
      },
      orangeish: {
        50: "rgba(242, 153, 74, 0.2)",
        100: "#F2994A",
      },
      purpleish: {
        50: "#EBDCF9",
        100: "#9B51E0",
      },
      misc: {
        red: "#EB5757",
        black: "#333333",
        white: "#ffffff",
      },
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      noto: ["Noto Sans", "sans-serif"],
    },
    extend: {
      height: {
        main: "calc(100vh - 8px - 3rem - 6rem)",
      },
      fontSize: {
        "0.625rem": "0.625rem",
      },
      width: {
        "98%": "98%",
      },
      gridTemplateColumns: {
        200: "repeat(auto-fit, minmax(200px, 1fr));",
      },
      flex: {
        48: "0 0 48%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

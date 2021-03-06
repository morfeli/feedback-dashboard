module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "button-pink": "#AD1FEA",
        "first-blue": "#4661E6",
        "second-blue": "#4661E6",
        "third-blue": "#3A4374",
        "faded-blue": "#647196",
        "light-gray": "#F2F4FF",
        "first-gray": "#F7F8FD",
        "first-orange": "#F49F85",
        "light-blue": "#62BCFA",
      },
      width: {
        "900px": "900px",
        "45vw": "45vw",
      },
    },

    fontFamily: {
      serif: ["Jost"],
    },
    fontWeight: {
      "jost-semibold": "600",
      "jost-bold": "700",
    },
    inset: {
      "2000px": "2000px",
      "0px": "0px",
      "35px": "35px",
      "60px": "60px",
      "15px": "15px",
      "30px": "30px",
      "20px": "20px",
      "5px": "5px",
      "90px": "90px",
      "100px": "100px",
      "115px": "115px",
    },
    transitionProperty: {
      right: "right",
    },
  },
  plugins: [],
};

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      pink: "#AD1FEA",
      blue: "#4661E6",
      "second-blue": "#4661E6",
      "third-blue": "#3A4374",
      "faded-blue": "#647196",
      "light-gray": "#F2F4FF",
      gray: "#F7F8FD",
      orange: "#F49F85",
      "light-blue": "#62BCFA",
    },
    fontFamily: {
      serif: ["Jost"],
    },
    fontWeight: {
      semibold: "600",
      bold: "700",
    },
  },
  plugins: [],
};

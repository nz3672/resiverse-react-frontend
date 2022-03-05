module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sarabun: ["SarabunMed", "SarabunLight", "SarabunBold"],
      },
      height: {
        84: "336px",
      },
      minWidth: {
        "320px": "320px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

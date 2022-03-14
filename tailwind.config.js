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
      width: {
        "280px": "280px",
        "370px": "370px",
        "145px": "145px",
        "185px": "185px",
      },
    },
    screens: {
      miniPhone: "375px",

      phone: "425px",

      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

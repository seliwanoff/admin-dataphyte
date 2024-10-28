// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Paths to your template files
  ],
  theme: {
    extend: {
      fontFamily: {
        polySans: ["PolySans", "sans-serif"],
        Satoshi: ["Satoshi", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
      },
      width: {
        "calc-custom": "calc(100% - 280px)", // Add custom width utility
      },
      boxShadow: {
        custom: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        newcustom: "0px 1px 2px 0px #1018280D",
      },

      colors: {
        primary: {
          DEFAULT: " #7F55DA", // Main primary color
          //light: "#a894ff", // Lighter shade for hover or focus states
          //dark: "#5e4cb8", // Darker shade for contrast
        },
        secondary: {
          DEFAULT: "#F8F8F8", // Main secondary color
          // light: "#8dd6ff", // Lighter shade
          // dark: "#1da4d7", // Darker shade
        },
      },
    },
  },
  plugins: [],
};

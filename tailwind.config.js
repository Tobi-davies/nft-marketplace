/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "900px",
    },
    extend: {
      colors: {
        navyBlue: "#3D00B7",
        darkGrey: "#565656",
        // grey: "#D9E0EC",
        grey: "rgba(217, 224, 236, 0.2)",
        green: "rgba(0, 172, 79, 1)",
        lightGrey: "rgba(220, 220, 220, 0.2)",
        // white: "rgba(231, 231, 235, 1)",
        // grey: "rgba(160, 159, 177, 1)",
        // darkGrey: "rgba(110, 112, 122, 1)",
        // blue: "rgba(30, 33, 58, 1)",
        // darkNavyBlue: "rgba(16, 14, 29, 1)",
        // softBlue: "rgba(136, 134, 157, 1)",
        // lightRedStudy: "hsl(348, 100%, 68%)",
        // limeGreen: "hsl(145, 58%, 55%)",
        // violet: "hsl(264, 64%, 52%)",
        // softOrange: "hsl(43, 84%, 65%)",
        // veryDarkBlue: "hsl(226, 43%, 10%)",
        // darkBlue: "hsl(235, 46%, 20%)",
        // desaturatedBlue: "hsl(235, 45%, 61%)",
        // paleBlue: "hsl(236, 100%, 87%)",
      },
    },
  },
  plugins: [],
};

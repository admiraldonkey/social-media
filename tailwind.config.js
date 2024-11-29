/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        myBlack: "#0b0c10",
        myDarkGrey: "#1f2833",
        myLightGrey: "#c5c6c7",
        myLightBlue: "#66fcf1",
        myDarkBlue: "#45a29e",
      },
    },
  },
  plugins: [],
};

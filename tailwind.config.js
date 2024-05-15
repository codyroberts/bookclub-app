/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        darkest: "#6b9080",
        dark: "#a4c3b2",
        mid: "#cce3de",
        light: "#eaf4f4",
        lightest: "#f6fff8",
        black: "#000000",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
};

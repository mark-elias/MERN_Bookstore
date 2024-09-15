/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customDarkPurple: "#34252F",
        customDarkGreen: "#3B5249",
        customGreen: "#519872",
      },
    },
  },
  plugins: [],
};

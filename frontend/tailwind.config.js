/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customYellow: "#FAFF7F",
        customPurple: "#91A6FF",
        customPink: "#FF88DC",
      },
    },
  },
  plugins: [],
};

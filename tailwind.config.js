/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#FAF7F2",
          card: "#FFFFFF",
        },
        navy: {
          DEFAULT: "#1E293B",
          deep: "#131C2B",
          muted: "#475569",
        },
        gold: {
          DEFAULT: "#B08D57",
          light: "#D4BA8A",
          dark: "#8F6F3E",
          soft: "#FAF5EB",
        },
        sand: {
          DEFAULT: "#E5DEC9",
          dark: "#CFC4A8",
        },
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        editorial: "0 20px 50px -15px rgba(30, 41, 59, 0.09)",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tea: {
          50: "#eef6ea",
          100: "#deecd8",
          200: "#bad7b2",
          300: "#95c189",
          400: "#72ab64",
          500: "#598f4d",
          600: "#46703e",
          700: "#34552f",
          800: "#234022",
          900: "#153322",
          950: "#0d2217",
        },
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 rgba(217, 158, 62, 0)" },
          "50%": { boxShadow: "0 0 40px rgba(217, 158, 62, 0.35)" },
        },
      },
      animation: {
        rise: "rise 700ms ease-out both",
        float: "float 5s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}


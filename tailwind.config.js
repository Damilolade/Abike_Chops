/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"], // Correct
      },
      // Use a key without a slash so the generated class is easier to use
      gridTemplateColumns: {
        "70-30": "70% 30%",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        bounceIn: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 0px rgba(255,215,0,0.3)" },
          "50%": { boxShadow: "0 0 12px rgba(255,215,0,0.6)" },
        },
      },
      animation: {
        slideIn: "slideIn 0.4s ease-out",
        fadeIn: "fadeIn 0.6s ease-in",
        bounceIn: "bounceIn 0.4s ease-in-out",
        glow: "glowPulse 1.5s infinite",
      },
    },
  },
  plugins: [],
};

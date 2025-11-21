/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        repsol: {
          orange: "#ff6600",
          dark: "#cc5200"
        }
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(60px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        },
        slideRight: {
          "0%": { opacity: 0, transform: "translateX(-20px)" },
          "100%": { opacity: 1, transform: "translateX(0)" }
        }
      },

      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-right": "slideRight 0.4s ease-out"
      },

      borderRadius: {
        xl2: "1.4rem",
        xl3: "1.7rem"
      },

      boxShadow: {
        card: "0 4px 16px rgba(0,0,0,0.08)",
        elevated: "0 6px 20px rgba(0,0,0,0.15)"
      }
    }
  },
  plugins: []
};

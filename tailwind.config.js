/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <- Garante que o Tailwind observa todos os ficheiros React/TypeScript
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF7A00", // Laranja da Repsol
        secondary: "#0047BA", // Azul Repsol
        background: "#d7ebff", // Azul-bebé suave
      },
      keyframes: {
        "slow-zoom": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "slow-zoom": "slow-zoom 20s ease-in-out infinite",
        "fade-in": "fade-in 0.8s ease-in-out",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

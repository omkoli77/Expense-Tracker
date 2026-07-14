/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F5F0",
        ink: "#1F2421",
        muted: "#6B7570",
        line: "#D8D3C8",
        teal: {
          DEFAULT: "#0E6E5D",
          dark: "#0A5749",
          light: "#E4F0EC",
        },
        rust: {
          DEFAULT: "#B4552F",
          light: "#F5E8E1",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      backgroundImage: {
        "receipt-edge":
          "repeating-linear-gradient(90deg, transparent, transparent 6px, #D8D3C8 6px, #D8D3C8 12px)",
      },
    },
  },
  plugins: [],
};

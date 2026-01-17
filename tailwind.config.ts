import type { Config } from "tailwindcss"

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        soft: "0 12px 40px rgba(24, 16, 8, 0.10)"
      }
    }
  },
  plugins: []
} satisfies Config

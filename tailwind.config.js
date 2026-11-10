/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0f1d',
          navy: '#0f172a',
          card: '#131e36',
          border: '#1e293b',
          accent: '#38bdf8',
          violet: '#818cf8',
          purple: '#a855f7',
          emerald: '#10b981',
          rose: '#f43f5e',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        mono: ['"Fira Code"', 'Consolas', 'Monaco', '"Courier New"', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(56, 189, 248, 0.3)' },
          '100%': { boxShadow: '0 0 25px rgba(56, 189, 248, 0.7)' },
        }
      }
    },
  },
  plugins: [],
}

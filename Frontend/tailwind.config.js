/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* <====[PALETA DE COLORES OSCURA]=====> */
        'cyan-dark': '#0a4a5a',
        'cyan-medium': '#0d6b7a',
        'cyan-light': '#1a8a9a',
        'blue-muted': '#2c3e6b',
        'blue-muted-light': '#4a6b9a',
        
        /* <====[FONDOS]=====> */
        'bg-primary': '#0d1117',
        'bg-secondary': '#161b22',
        'bg-tertiary': '#1c2333',
        'bg-card': '#1a1f2e',
        
        /* <====[TEXTOS]=====> */
        'text-primary': '#e6edf3',
        'text-secondary': '#8b949e',
        'text-muted': '#484f58',
        
        /* <====[BORDES]=====> */
        'border': '#30363d',
        'border-hover': '#4a6b9a',
        
        /* <====[ESTADOS]=====> */
        'success': '#2ea043',
        'error': '#f85149',
        'warning': '#d29922',
        'info': '#58a6ff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sakura: {
          50: '#fdf0ff',
          100: '#f8f0fc',
          200: '#f5eaff',
          300: '#f0e0f8',
          400: '#e8d4f0',
          500: '#c9a0dc',
          600: '#b56fc4',
          700: '#a04db0',
          800: '#8a4aad',
          900: '#4a3f5c',
        },
        pink: {
          pastel: '#f4a7c3',
          soft: '#fde8f4',
        },
        price: '#c060b0',
        muted: '#b89ec4',
        'muted-dark': '#a08ab8',
        'muted-light': '#7a6090',
        body: '#f8f0fc',
        'card-border': '#f0e0f8',
        'controls-bg': '#fff6ff',
        'controls-border': '#e8d4f0',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 2px 8px rgba(180, 120, 210, 0.12)',
        'card-hover': '0 6px 18px rgba(180, 120, 210, 0.22)',
        header: '0 2px 12px rgba(180, 120, 200, 0.25)',
        button: '0 3px 10px rgba(180, 120, 200, 0.3)',
      },
      backgroundImage: {
        'gradient-header': 'linear-gradient(135deg, #c9a0dc, #f4a7c3)',
        'gradient-placeholder': 'linear-gradient(135deg, #f5eaff, #fde8f4)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        fadeSlideIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.2s ease-in-out infinite',
        'fade-slide-in': 'fadeSlideIn 0.25s ease both',
      },
    },
  },
  plugins: [],
}

export default config


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        sunny: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        magic: {
          purple: '#a855f7',
          pink: '#ec4899',
          blue: '#6366f1',
          teal: '#14b8a6',
        },
        surface: {
          0: '#ffffff',
          1: 'rgba(255,255,255,0.88)',
          2: 'rgba(255,255,255,0.72)',
          3: 'rgba(255,255,255,0.56)',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'ui-rounded', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'cloud-drift': 'cloud-drift 60s linear infinite',
        'cloud-drift-slow': 'cloud-drift 90s linear infinite',
        'cloud-drift-reverse': 'cloud-drift-reverse 72s linear infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'rainbow-shift': 'rainbow-shift 8s ease-in-out infinite',
        'enter': 'enter 0.8s cubic-bezier(0.32,0.72,0,1) forwards',
        'enter-delay-1': 'enter 0.8s cubic-bezier(0.32,0.72,0,1) 0.08s forwards',
        'enter-delay-2': 'enter 0.8s cubic-bezier(0.32,0.72,0,1) 0.16s forwards',
        'enter-delay-3': 'enter 0.8s cubic-bezier(0.32,0.72,0,1) 0.24s forwards',
        'enter-delay-4': 'enter 0.8s cubic-bezier(0.32,0.72,0,1) 0.32s forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'sun-pulse': 'sun-pulse 4s ease-in-out infinite',
        'modal-enter': 'modal-enter 0.4s cubic-bezier(0.32,0.72,0,1) forwards',
      },
      keyframes: {
        'cloud-drift': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(calc(100vw + 100%))' },
        },
        'cloud-drift-reverse': {
          '0%': { transform: 'translateX(calc(100vw + 100%))' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'sparkle': {
          '0%, 100%': { opacity: '0', transform: 'scale(0) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1) rotate(180deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'rainbow-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'enter': {
          '0%': { opacity: '0', transform: 'translateY(20px)', filter: 'blur(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'sun-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.06)', opacity: '1' },
        },
        'modal-enter': {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(12px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      backgroundImage: {
        'rainbow-gradient': 'linear-gradient(90deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6, #ec4899)',
      },
      boxShadow: {
        'glow': '0 0 24px rgba(14, 165, 233, 0.18)',
        'glow-lg': '0 0 48px rgba(14, 165, 233, 0.12)',
        'sunny': '0 4px 24px rgba(251, 191, 36, 0.2)',
        'ambient': '0 1px 2px rgba(0,0,0,0.03), 0 4px 12px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)',
        'ambient-hover': '0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.02)',
        'ambient-lg': '0 4px 8px rgba(0,0,0,0.03), 0 16px 48px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.02)',
        'inner-highlight': 'inset 0 1px 1px rgba(255,255,255,0.6)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
    },
  },
  plugins: [],
};

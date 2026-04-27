/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#EBF4FF',
          100: '#D6E9FF',
          200: '#ADD3FF',
          300: '#84BCFF',
          400: '#5BA5FF',
          500: '#2B7CC1',
          600: '#2268A8',
          700: '#1A3A5C',
          800: '#122843',
          900: '#0A1622',
        },
        navy: {
          DEFAULT: '#1A3A5C',
          light: '#2B4F77',
          dark: '#0F2238',
        },
        coral: {
          DEFAULT: '#FF6B35',
          light: '#FF8B60',
          dark: '#E05520',
        },
        gray: {
          cool: '#8A9BB0',
          sky: '#EBF4FF',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

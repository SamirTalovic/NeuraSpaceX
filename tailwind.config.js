/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0f0fe',
          200: '#bae0fd',
          300: '#7cc8fc',
          400: '#36b0f9',
          500: '#0c96e6',
          600: '#0078c9',
          700: '#0062a3',
          800: '#055386',
          900: '#0a4570',
          950: '#062a4b',
        },
        space: {
          dark: '#0F172A',
          light: '#1E293B',
          accent: '#8B5CF6',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
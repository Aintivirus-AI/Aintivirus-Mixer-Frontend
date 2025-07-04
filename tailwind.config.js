import { heroui } from '@heroui/theme';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        calSans: ['var(--font-cal-sans)'],
      },
      colors: {
        black: {
          DEFAULT: '#000000',
          50: '#06071C',
          60: '#181818',
          70: '#0D102E',
          80: '#2B2E54',
          90: '#181A36',
          100: '#121531',
          110: '#0B1432',
          120: '#101835',
          130: '#1F234E',
          140: '#2D326B',
        },
        gray: {
          DEFAULT: '#F5F5F5',
          50: '#C1C3C3',
          60: '#898B99',
        },
        blue: {
          DEFAULT: '#1E90FF',
          50: '#03BEFF',
        },
      },
      boxShadow: {
        'blue-grow': '0px 0px 0px 1px #1b78d0',
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
};

module.exports = config;

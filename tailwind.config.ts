import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './App.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Libre Baskerville"', 'serif'],
        sans: ['"Roboto"', 'system-ui', 'sans-serif'],
      },
      colors: {
        etsy: {
          orange: '#D4AF37',
          bg: '#FFFFFF',
          pink: '#F9F5F0',
          green: '#258635',
          'green-light': '#d4e9d7',
          'gray-bg': '#F4F4F1',
        },
      },
    },
  },
  plugins: [],
};

export default config;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3f4',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a855f7',
          400: '#8b5cf6',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#5c34e7',
          800: '#4338ca',
          900: '#3730a3',
          950: '#312e81',
        }
      }
    }
  },
  plugins: [],
}

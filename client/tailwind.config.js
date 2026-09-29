/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#8AC926',
          darkGreen: '#6ea61b',
          lightGreen: '#f4fbf0',
          black: '#111827',
          charcoal: '#1F2937',
          grey: '#6B7280',
          lightGrey: '#F3F4F6',
          border: '#E5E7EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

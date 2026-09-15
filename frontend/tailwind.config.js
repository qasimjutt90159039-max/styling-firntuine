/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#FFFFFF',
        stone: {
          50: '#FAFAF8',
          100: '#F3F1ED',
          200: '#E7E3DD',
          300: '#D2CEC6',
          400: '#A8A29E',
          500: '#78716C',
          700: '#44403C',
          800: '#2E2D2B',
          900: '#242424',
        },
        charcoal: '#242424',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['monospace'],
      },
      letterSpacing: {
        editorial: '0.05em',
        widest: '0.15em',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'lift': '0 10px 30px -10px rgba(36, 36, 36, 0.06)',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
    fontFamily: {
      nunito: ['var(--font-nunito)'],
      poppins: ['var(--font-poppins)'],
    },

    screens: {
      mobile: {
        max: '600px',
      },
      desktop: '600px',
    },
  },
  plugins: [],
};

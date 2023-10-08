/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      mobile: {
        max: '600px',
      },
      desktop: '600px',
    },
  },
  plugins: [],
};

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        kumb: ['Kumbh Sans', 'sans-serif'],
      },
    },
    screens: {
      extraSmall: '280px',
      mobile: '375px',
      desktop: '1440px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        full: '0 0 0 1px rbga(0,0,0,0.1), 0 4px 16px 0 rbga(0,0,0,0.1)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

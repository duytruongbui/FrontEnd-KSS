const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/[hotel]/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '21px',
        lg: '7px',
        '2xl': '4rem',
      },
    },
    colors: {
      white: '#fff',
      black: '#000',
      'near-white': '#F8EEE4',
      background: '#E5E5E5',
      main: '#b99173',
      green: '#073e0d',
      milk: '#f8eee4',
      footer: '#523922',
      brown: '#B99173',
      mediumBrown: '#A56C50',
    },
    extend: {
      fontFamily: {
        tanpearl: ['Tan Pearl', ...defaultTheme.fontFamily.sans],
        tenor: ['Tenor Sans', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        w185: '185px',
        '3/4': '75%',
        w421: '421px',
      },
      minWidth: {
        m189: '189px',
        w421: '421px',
      },
      maxHeight: {
        box: '244px',
        h71: '71px',
        h51: '51px',
      },
      minHeight: {
        box: '244px',
        h71: '71px',
        h51: '51px',
        h56: '56px',
      },
      screens: {
        mobile: { max: '470px' },
        tablet: { max: '768px' },
      },
      borderRadius: {
        box: '50px',
        large: '10px',
        question: '50px',
      },
      fontSize: {
        40: '40px',
      },
      spacing: {
        '15px': '15px',
        47: '11.75rem',
      },
    },
  },
  plugins: [],
};

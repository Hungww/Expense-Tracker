/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./source/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'onboard_description_color': 'rgba(145, 145, 159, 1)',
        'onboard_title_color': 'black',
        'primary': '#19B079',
        'third': '#E5F6F0',
        'FCFCFC': '#FCFCFC',
        '32B988': '#32B988',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'roboto-bold': ['Roboto-Bold', 'sans-serif'],
        'roboto-italic': ['Roboto-Italic', 'sans-serif'],
        'roboto-bolditalic': ['Roboto-BoldItalic', 'sans-serif'],
        'roboto-light': ['Roboto-Light', 'sans-serif'],
        'roboto-lightitalic': ['Roboto-LightItalic', 'sans-serif'],
        'roboto-thin': ['Roboto-Thin', 'sans-serif'],
        'roboto-thinitalic': ['Roboto-ThinItalic', 'sans-serif'],
        'roboto-medium': ['Roboto-Medium', 'sans-serif'],
        'roboto-mediumitalic': ['Roboto-MediumItalic', 'sans-serif'],
        'roboto-black': ['Roboto-Black', 'sans-serif'],
        'roboto-blackitalic': ['Roboto-BlackItalic', 'sans-serif'],


        
      },





    },
  },
  plugins: [],
}


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-color': '#4738BF',
        'secondary-color': '#FB9F18',
        'thirdary-color': '#FECD1B',
        'n-white': '#F0F0F0',
        'n-black': '#141414'
      },
      fontSize: {
        't-logo': '31px',
        'intro-font-size': '22px'
      },
      height: {
        'section': 'calc(100vh - 230px)',
        'header': '76px',
        'card': '301px'
      },
      width: {
        'card': '350px'
      }
    },
  },
  plugins: [],
}

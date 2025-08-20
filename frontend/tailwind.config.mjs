module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
    darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"}
      }
    },
    fontFamily: {
      'body': [
    'Inter', 
    'ui-sans-serif', 
    'system-ui', 
    '-apple-system', 
    'system-ui', 
    'Segoe UI', 
    'Roboto', 
    'Helvetica Neue', 
    'Arial', 
    'Noto Sans', 
    'sans-serif', 
    'Apple Color Emoji', 
    'Segoe UI Emoji', 
    'Segoe UI Symbol', 
    'Noto Color Emoji'
  ],
      'sans': [
    'Inter', 
    'ui-sans-serif', 
    'system-ui', 
    '-apple-system', 
    'system-ui', 
    'Segoe UI', 
    'Roboto', 
    'Helvetica Neue', 
    'Arial', 
    'Noto Sans', 
    'sans-serif', 
    'Apple Color Emoji', 
    'Segoe UI Emoji', 
    'Segoe UI Symbol', 
    'Noto Color Emoji'
  ]
    }
  },
  theme: {
    extend: {
      colors: {
        'main-color': '#4738BF',
        'secondary-color': '#FB9F18',
        'thirdary-color': '#FECD1B',
        'footer-black': '#212121',
        'n-white': '#F0F0F0',
        'n-black': '#141414'
      },
      fontSize: {
        't-logo': '31px',
        'intro-font-size': '22px',
        'card-title': '1.3rem'
      },
      height: {
        'section': 'calc(100vh - 230px)',
        'section-with-footer': 'calc(100vh - 105px)',
        'header': '76px',
        'card': '301px'
      },
      width: {
        'card': '350px'
      },
      top: {
        'header': '76px'
      }
    },
  },
  plugins: [],
}

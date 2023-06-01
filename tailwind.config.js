module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.scss',
    './src/**/*.js',
  ],
  theme: {
    fontFamily: {
      'body': ['effra', 'Arial', 'sans-serif'],
      'heading': ['Brick', 'Arial', 'sans-serif'],
    },
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {
      colors: {
        mynaYellow: '#FFCE00',
        mynaGrey: '#8AA1B1',
        mynaLiteGrey: '#C4C4C4',
        mynaBgGrey: '#F8F8F8',
        mynaNoir: '#111111',
        mynaMint: '#05E2AD',
        mynaAqua: '#007FFF',
        mynaDarkGreen: '#013325',
        mynaFuscia: '#FF026E',
        mynaMaroon: '#9E0620',
        mynaDeepBlue: '#190E4F',
      },
      backgroundColor: () => ({
        'mynaYellow': '#FFCE00',
        'mynaGrey': '#8AA1B1',
        'mynaLightGrey': '#f8f8f8',
        'mynaLiteGrey': '#C4C4C4',
        'mynaBgGrey': '#F8F8F8',
        'mynaNoir': '#111111',
        'mynaMint': '#05E2AD',
        'mynaAqua': '#007FFF',
        'mynaDarkGreen': '#013325',
        'mynaFuscia': '#FF026E',
        'mynaMaroon': '#9E0620',
        'mynaDeepBlue': '#190E4F'
      }),
      borderColor: () => ({
        'mynaYellow': '#FFCE00',
        'mynaGrey': '#8AA1B1',
        'mynaNoir': '#111111',
        'mynaLiteGrey': '#C4C4C4',
        'mynaMint': '#05E2AD',
        'mynaAqua': '#007FFF',
        'mynaDarkGreen': '#013325',
        'mynaFuscia': '#FF026E',
        'mynaMaroon': '#9E0620',
        'mynaDeepBlue': '#190E4F'
      }),
      borderWidth: {
        '1': '1px',
      },
      fontSize: {
        'heading-1': '10rem',
        'heading-1-small': '6rem',
        'heading-2': '3.75rem',
        'heading-3': '1.75rem',
        'subheading-1': '1.3rem',
      },
      screens: {
        'xl-height': {'raw': '(min-height: 900px) and (min-width: 1280px)'},
      },
      letterSpacing: {
        'pricing-wide': '0.3em'
      },
      inset: {
        '-16': '-4rem',
      }
    },
  },
  variants: {
   borderWidth: ['responsive', 'hover'],
  },
  plugins: [],
}

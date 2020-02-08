const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans Pro"', ...defaultTheme.fontFamily.sans],
        serif: ['"Arkibal Serif"', ...defaultTheme.fontFamily.serif],
      },
      // zIndex: {
      //   'article-card': 20,
      //   'navigator': 30,
      //   'floating-header': 40,
      // },
      // fill: {
      //   'header-first-gradient': 'url(#header-first-gradient)',
      //   'header-second-gradient': 'url(#header-second-gradient)',
      // },
    },
    gradients: {
      topaz: ['30deg', '#EE7752', '#E73C7E'],
      river:   ['to right', '#23A6D5', '#23D5AB'],
    },
  },
  variants: {
    gradients: ['responsive', 'hover'],
  },
  plugins: [
    require('tailwindcss-plugins/gradients'),
  ],
}

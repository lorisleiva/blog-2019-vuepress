const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      colors: {
        'white-50p': '#FFFFFF88',
        primary: {
          '100': defaultTheme.colors.pink['100'],
          '200': defaultTheme.colors.pink['200'],
          '300': defaultTheme.colors.pink['300'],
          '400': defaultTheme.colors.pink['400'],
          '500': '#f91f40',
          '600': defaultTheme.colors.pink['600'],
          '700': defaultTheme.colors.pink['700'],
          '800': defaultTheme.colors.pink['800'],
          '900': defaultTheme.colors.pink['900'],
        }
      },
      fontFamily: {
        sans: ['"Source Sans Pro"', ...defaultTheme.fontFamily.sans],
        serif: ['"Arkibal Serif"', ...defaultTheme.fontFamily.serif],
        content: ['Georgia', ...defaultTheme.fontFamily.sans],
      },
      minHeight: {
        '72': '18rem',
      },
      opacity: {
        '90': '0.9',
      },
    },
    gradients: theme => ({
      topaz: ['30deg', '#EE7752', '#E73C7E'],
      river: ['30deg', '#23A6D5', '#23D5AB'],
      emerald: ['30deg', theme('colors.green.400'), theme('colors.teal.600')],
      blackrock: ['30deg', theme('colors.gray.700'), theme('colors.gray.900')],
      moonlight: ['30deg', theme('colors.gray.100'), theme('colors.gray.300')],
    }),
  },
  variants: {
    gradients: ['responsive', 'hover'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  plugins: [
    require('tailwindcss-plugins/gradients'),
  ],
  corePlugins: {
    container: false,
  }
}

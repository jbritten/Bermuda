const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  purge: {
    content: [
      './**/*.hbs',
      './src/**/*.js',
    ]
  },
  prefix: '',
  important: false,
  separator: ':',
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans]
      },
      listStyleType: {
        none: 'none',
        disc: 'disc',
        decimal: 'decimal',
        latin: 'lower-latin',
        roman: 'lower-roman'
      },
      scale: {
        '-100': '-1'
      },
      screens: {
        dm: {
          raw: "(prefers-color-scheme: dark)"
        }
      }
    },
    typography: (theme) => ({
      default: {
        css: {
          img: {
            borderRadius: '0.375rem',
          },
          figure: {
            borderRadius: '0.375rem',
          },
          'figure figcaption': {
            textAlign: 'center'
          },
          ':not(pre)>code': {
            background: theme('colors.gray.100'),
            border: theme('colors.gray.200'),
            borderWidth: '1px',
            borderStyle: 'solid',
            paddingLeft: '0.25rem',
            paddingRight: '0.25rem',
            borderRadius: '0.25rem',
            display: 'inline-block',
            whiteSpace: 'nowrap',
          },
          ':not(pre)>code::before': {
            content: '""',
          },
          ':not(pre)>code::after': {
            content: '""',
          },
          'pre code': {
            display: 'block',
            whiteSpace: 'pre',
          },
          video: {
            borderRadius: '0.375rem',
          },
        }
      }
    })
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
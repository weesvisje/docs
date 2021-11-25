const defaultTheme = require('tailwindcss/defaultTheme')
const siteDir = process.env.DOCUSAURUS_SITE_DIR
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: [
    `./docs/**/*.mdx`,
    './components/**/*.{js,ts,jsx,tsx}',
    `./src/**/*.{js,jsx,ts,tsx,mdx,md}`,
  ],
  darkMode: 'media', // or 'media' or 'class'
  variants: {
    extend: {},
  },
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

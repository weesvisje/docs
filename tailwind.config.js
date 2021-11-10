const defaultTheme = require('tailwindcss/defaultTheme')
const siteDir = process.env.DOCUSAURUS_SITE_DIR;

module.exports = {
  mode: 'jit',
  purge: [
    `./docs/**/*.md`,
    `./docs/**/*.mdx`,
    `./src/**/*.tsx`,
    `./src/**/*.{js,jsx,ts,tsx,mdx,md}`,
  ],
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {},
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            }
          }
        }
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

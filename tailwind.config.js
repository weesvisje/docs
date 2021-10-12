const siteDir = process.env.DOCUSAURUS_SITE_DIR;

module.exports = {
  mode: 'jit',
  purge: [
    `./docs/**/*.md`,
    `./docs/**/*.mdx`,
    `./src/**/*.{js,jsx,ts,tsx,mdx,md}`,
  ],
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {},
  },
  theme: {
    extend: {
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

const siteDir = process.env.DOCUSAURUS_SITE_DIR;

module.exports = {
  purge: [
    `${siteDir}/docs/**/*.{js,jsx,ts,tsx,mdx,md}`,
    `${siteDir}/src/**/*.{js,jsx,ts,tsx,mdx,md}`,
  ],
  mode: "jit",
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

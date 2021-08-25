const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const path = require('path');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Ditto",
  tagline: "Sync even without the internet",
  url: "https://docs.ditto.live",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico/favicon.ico",
  organizationName: "getditto", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "Ditto",
      logo: {
        href: '/',
        alt: "My Site Logo",
        src: "img/logo.png",
      },
      items: [
        {
          type: "doc",
          docId: "intro",
          position: "left",
          label: "Quick Start",
        },
        { href: "https://www.ditto.live", label: "Home", position: "left" },
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/getditto/docs",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Quick Start",
              to: "/docs/intro",
            },
            {
              label: "Main Website",
              href: "https://www.ditto.live/",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/ditto",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/dittolive",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/getditto/docs",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} DittoLive, Inc. Built with Docusaurus.`,
    },
    prism: {
      additionalLanguages: ["csharp", "swift", "java", "kotlin", "cpp"],
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/getditto/docs/edit/master/website/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/getditto/docs/master/website/blog/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};

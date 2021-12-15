const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const path = require("path");

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
  plugins: [path.resolve(__dirname, "plugins/postcss-tailwindcss-loader"),
    [
      require.resolve('docusaurus-gtm-plugin'),
      {
        id: 'GTM-PV7QFWF',
      }
    ]
  ],
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    prism: {
      additionalLanguages: ['objectivec', 'java', 'csharp'],
      theme: require('prism-react-renderer/themes/vsDark'),
    },
    gtag: {
      // You can also use your "G-" Measurement ID here.
      trackingID: "G-D8PMW3CCL2",
    },
    navbar: {
      title: "Ditto",
      logo: {
        href: "/",
        alt: "Ditto Logo",
        src: "img/logo.png",
      },
      items: [
        { href: "/", label: "Home", position: "left" },
        {
          label: "Samples Apps",
          href: "https://github.com/getditto/samples",
        },
        {
          label: "GitHub Issues",
          href: "https://github.com/getditto/docs/issues",
        },
        {
          label: "Discussions",
          href: "https://github.com/getditto/docs/discussions",
        },
        {
          label: "Roadmap",
          href: "https://github.com/getditto/docs/discussions/categories/roadmap-and-ideas",
        },
        {
          href: "https://portal.ditto.live",
          label: "Get Started",
          position: "right",
        },
        {
          label: `Changelog`,
          href: "/changelog",
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
              to: "/",
            },
            {
              label: "Main Website",
              href: "https://www.ditto.live/",
            },
            {
              label: "Samples Apps",
              href: "https://github.com/getditto/samples",
            },
            {
              label: "Changelog",
              href: "/changelog",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "GitHub Discussions",
              href: "https://github.com/getditto/docs/discussions",
            },
            {
              label: "GitHub Issues",
              href: "https://github.com/getditto/docs/issues",
            },
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
      ],
      copyright: `Copyright © ${new Date().getFullYear()} DittoLive, Inc. Built with Docusaurus.`,
    },
    prism: {
      additionalLanguages: [
        "csharp",
        "swift",
        "java",
        "kotlin",
        "cpp",
        "groovy",
        "rust",
      ],
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        theme: {
          customCss: [require.resolve("./src/css/custom.css")],
        },
        docs: {
          remarkPlugins: [
            [
              require("mdx-mermaid"),
              {
                mermaid: {
                  themeVariables: {
                    fontFamily: "Helvetica",
                  },
                  sequence: {
                    actorFontFamily: "Helvetica",
                    noteFontFamily: "Helvetica",
                    messageFontFamily: "Helvetica",
                  },
                  journey: {
                    taskFontFamily: "Helvetica",
                  },
                },
              },
            ],
          ],
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/getditto/docs/edit/master/",
        },
      },
    ],
  ],
};

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const path = require("path");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Ditto",
  tagline: "Sync even without the internet",
  url: "https://docs.ditto.live",
  baseUrl: process.env.BASE_URL || '/',
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico/favicon.ico",
  organizationName: "getditto", // Usually your GitHub org/user name.
  trailingSlash: undefined,
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
    algolia: {
      // The application ID provided by Algolia
      appId: 'F25GUUSPFJ',

      // Public API key: it is safe to commit it
      apiKey: '2dc4c171eb7e798d53ab14599841cf4e',

      indexName: 'docs',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Algolia search parameters
      searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',

      //... other Algolia params
    },
    autoCollapseSidebarCategories: true,
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
        href: "https://ditto.live",
        alt: "Ditto Logo",
        src: "img/logo.png",
      },
      items: [
        { href: "/", label: "Home", position: "left" },
        {
          label: "Sample Apps",
          href: "https://github.com/getditto/samples",
        },
        {
          label: "GitHub Issues",
          href: "https://github.com/getditto/docs/issues",
        },
        {
          label: "Roadmap",
          href: "https://github.com/getditto/docs/discussions/categories/roadmap-and-ideas",
        },
        {
          href: "https://portal.ditto.live",
          label: "Get Started",
          position: "right",
        }
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

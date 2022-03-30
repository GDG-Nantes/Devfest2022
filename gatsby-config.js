module.exports = {
  siteMetadata: {
    siteUrl: "https://devfest.gdgnantes.com",
    title: "Devfest Nantes 2022",
    image: "/images/social-share.jpg",
  },
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-theme-material-ui",
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-graphql-config",
    {
      resolve: `gatsby-theme-i18n`,
      options: {
        defaultLang: `fr`,
        configPath: require.resolve(`./locales/config.json`),
        prefixDefault: false,
      },
    },
    {
      resolve: `gatsby-theme-i18n-react-i18next`,
      options: {
        locales: `./locales`,
        i18nextOptions: {
          ns: ["translation"],
        },
      },
    },

    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: ["G-D66NP8CLV0"],
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "static/images/favicon.jpg",
        icon_options: {
          purpose: `any maskable`,
        },
        name: `Devfest Nantes 2022`,
        short_name: `Devfest Nantes`,
        start_url: `/`,
        background_color: `#ffedbf`,
        theme_color: `#ffedbf`,
        display: `minimal-ui`,
        description: `Informations générales sur le Devfest Nantes`,
        lang: `fr`,
        localize: [
          {
            start_url: `/en/`,
            lang: `en`,
            name: `Devfest Nantes 2022`,
            short_name: `Devfest Nantes`,
            description: `General informations about the Devfest Nantes.`,
          },
        ],
      },
    },
    "gatsby-plugin-offline",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve("./src/layout/mdx.tsx"),
        },
      },
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};

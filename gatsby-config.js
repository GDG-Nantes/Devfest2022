module.exports = {
  siteMetadata: {
    siteUrl: "https://devfest2022.gdgnantes.com",
    title: "Devfest Nantes 2022",
    image: "/images/social-share.jpg",
  },
  plugins: [
    "gatsby-plugin-typescript",
    {
      resolve: `gatsby-theme-material-ui`,
      options: {
        webFontsConfig: {
          fonts: {
            google: [
              {
                family: `Acme`,
                variants: [`300`, `400`, `500`],
              },
            ],
          },
        },
      },
    },
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
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "G-D66NP8CLV0",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
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

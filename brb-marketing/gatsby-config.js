const activeEnv = process.env.ACTIVE_ENV || process.env.NODE_ENV

require('dotenv').config({
  path: `.env.${activeEnv}`,
})

const siteMode = process.env.SITE_MODE || 'default';
console.log(`Building site in mode [${siteMode}]`);

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_KEY,
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the delivery token need to be provided.'
  )
}

module.exports = {
  pathPrefix: `/`,
  siteMetadata: {
    siteUrl: `https://berightback.travel`,
    title: 'BeRightBack - Discover Europe: one surprise destination at a time',
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-remark',
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: ['SITE_MODE'],
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/sites/${siteMode}`,
      },
    },
    {
      resolve: `gatsby-plugin-segment-js`,
      options: {
        prodKey: process.env.SEGMENT_KEY,
        trackPage: false,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: spaceId,
        accessToken: accessToken,
      },
    },
    {
      resolve: `gatsby-plugin-hotjar`,
      options: {
        id: 1025448,
        sv: 6
      },
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: "GTM-N8XM2GJ",

        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'BeRightBack',
        short_name: 'BRB',
        start_url: '/',
        background_color: '#ff0053',
        theme_color: '#ff0053',
        display: 'minimal-ui',
        icon: 'src/images/icon-512x512.png', // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}

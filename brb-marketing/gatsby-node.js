/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const _ = require('lodash')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('src/templates/blogPost.js')
    const landingPageTemplate = path.resolve('src/templates/landingPage.js')
    resolve(
      graphql(`
      {
        allContentfulLandingPage {
          edges {
            node {
              LandingPageId
              slug
              mainBody {
                childMarkdownRemark {
                  rawMarkdownBody
                }
              }
              heroImage {
                description
                file {
                  url
                }
              }
              mainTitle {
                childMarkdownRemark {
                  html
                }
              }
              bigText1 {
                childMarkdownRemark {
                  html
                }
              }
              bigText2 {
                childMarkdownRemark {
                  html
                }
              }
              finalHeading {
                childMarkdownRemark {
                  html
                }
              }
              ctaText
              ctaLink
              secondaryImages {
                fluid(maxWidth: 200) {
                  base64
                  tracedSVG
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                }
              }
              planType
              featuredPlan
              valuePropositionPoints {
                title
                text {
                  text
                }
                icon {
                  file {
                    url
                  }
                }
              }
            }
          }
        }
        allContentfulBlogArticle {
          edges {
            node {
              id
              title
              slug
              author
              createdAt
              tags
              shortDescription
              subtitle
              article {
                childMarkdownRemark {
                  html
                }
              }
              heroImage {
                description
                file {
                  url
                }
              }
            }
          }
        }
      }
      `).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        result.data.allContentfulLandingPage.edges.forEach(edge => {
          createPage({
            path: `/lp/${edge.node.slug}`,
            component: landingPageTemplate,
            context: {
              landingPageId: edge.node.LandingPageId,
              heroImage: edge.node.heroImage,
              mainBody: edge.node.mainBody.childMarkdownRemark.rawMarkdownBody,
              mainTitle: edge.node.mainTitle.childMarkdownRemark.html,
              bigText1: edge.node.bigText1.childMarkdownRemark.html,
              bigText2: edge.node.bigText2.childMarkdownRemark.html,
              ctaText: edge.node.ctaText,
              ctaLink: edge.node.ctaLink,
              secondaryImages: edge.node.secondaryImages,
              planType: edge.node.planType,
              featuredPlan: edge.node.featuredPlan,
              valuePropositionPoints: edge.node.valuePropositionPoints,
            },
          })
        })
        result.data.allContentfulBlogArticle.edges.forEach(edge => {
          createPage({
            path: `/articles/${edge.node.slug}`,
            component: blogPostTemplate,
            context: {
              id: edge.node.id,
              slug: edge.node.slug,
              title: edge.node.title,
              tags: edge.node.tags,
              author: edge.node.author,
              subtitle: edge.node.subtitle,
              shortDescription: edge.node.shortDescription,
              article: edge.node.article.childMarkdownRemark.html,
              heroImage: edge.node.heroImage,
              relatedArticles: getRelatedArticles(
                edge.node,
                result.data.allContentfulBlogArticle.edges
              ),
            },
          })
        })
        return
      })
    )
  })
}

const getRelatedArticles = (currentArticle, articles) => {
  const MINIMUM_TAGS_IN_COMMON = 2

  const hasAtLeastOneTagInCommon = ({ node }) => {
    // stop working if we're looking @ the same article
    if (currentArticle.id === node.id) {
      return false
    }

    const commonTags = _.intersectionBy(
      currentArticle.tags,
      node.tags,
      tag => tag
    )
    return commonTags.length >= MINIMUM_TAGS_IN_COMMON
  }

  const filteredResults = articles.filter(hasAtLeastOneTagInCommon)

  return filteredResults
}

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /@typeform/,
            loader: 'null-loader',
          },
        ],
      },
    })
  }
}

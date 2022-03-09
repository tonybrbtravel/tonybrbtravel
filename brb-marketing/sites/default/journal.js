import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../../src/components/layout'
import ArticleCard from '../../src/components/ArticleCard'
import Hero from '../../src/components/Hero';
import { Grid } from '../../src/components/ArticleCard/styles'

export class Journal extends React.Component {

  processHeroQueryData(rawData) {

    const data = { ...rawData.data };

    // Extract the first available image
    rawData.media.forEach((media) => {
      if (/^image\//.test(media.file.contentType) && !data.image) {
        data.image = media.file.url;
      }
    });

    return data;
  };

  render() {
    const articles = this.props.data.allContentfulBlogArticle.edges;
    const heroData = this.processHeroQueryData(this.props.data.contentfulConfigurationItem);

    return (
      <Layout startNavTransparent={true}>

        <Helmet>
          <title>BRB Journal</title>
        </Helmet>

        <Hero
          image={heroData.image}
          title={heroData.title}
          text={heroData.text}
          video={heroData.video}
          cta={heroData.cta}
        />

        <Grid>
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </Grid>

      </Layout>
    )
  }
}

export default Journal

export const pageQuery = graphql`
{
  contentfulConfigurationItem(name: {eq: "Journal - hero"}) {
    name
    data {
      title
      text
      cta {
        label
        link
        type
      }
    }
    media {
      file {
        contentType
        url
      }
    }
  }
  allContentfulBlogArticle(sort: {fields: [createdAt], order: DESC}) {
    edges {
      node {
        id
        title
        slug
        author
        createdAt
        shortDescription
        tags
        subtitle
        article {
          article
        }
        heroImage {
          file {
            url
          }
          description
        }
      }
    }
  }
}
`;

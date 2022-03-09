import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../../src/components/layout'

import Prompt from '../../src/components/Blocks/Prompt'
import Hero from '../../src/components/Hero';
import TextCarousel from '../../src/components/Blocks/TextCarousel';
import TheBestHotels from '../../src/components/Blocks/TheBestHotels';
import Comparison from '../../src/components/Blocks/Comparison';
import Reviews from '../../src/components/Blocks/Reviews';
import MediaLogos from '../../src/components/Blocks/MediaLogos';
import SubscriptionCalculator from '../../src/components/Blocks/SubscriptionCalculator';

import homeHero from '../../src/images/homeHero.jpg'; // Used in meta tags
class PricingPage extends React.Component {

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
    const heroData = this.processHeroQueryData(this.props.data.contentfulConfigurationItem);

    return (
      <Layout startNavTransparent={true}>

        <Helmet>
          <title>BeRightBack - Pricing</title>
          <meta
            name="description"
            content="BRB is the world's first travel subscription service. Pay monthly and get a break in Europe every 4 months to a surprise destination."
          />
          <meta
            name="keywords"
            content="travel, be right back, brb, BRB, surprise, europe, holidays, subscription, flights, accommodation, hotel, app, travel agent, pricing"
          />
          <meta name="robots" content="index, follow" />
          <meta property="og:type" content="product" />
          <meta
            property="og:title"
            content="BRB: The world's first travel subscription"
          />
          <meta property="og:url" content="https://berightback.travel/pricing" />
          <meta property="og:image" content={homeHero} />
        </Helmet>

        <Hero
          image={heroData.image}
          title={heroData.title}
          text={heroData.text}
          video={heroData.video}
          cta={heroData.cta}
        />

        <Prompt dataName='Pricing - intro' />

        <SubscriptionCalculator />
        <TheBestHotels dataName="Block - the best hotels" />
        <Comparison />
        <Reviews dataName="Block - reviews"/>
        <MediaLogos />
        <TextCarousel dataName="Block - our promise" />

      </Layout>
    );
  }
}

export default PricingPage


export const pageQuery = graphql`
{
  contentfulConfigurationItem(name: {eq: "Pricing - hero"}) {
    name
    data {
      title
      text
      cta {
        label
        link
        to
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
}
`;

import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../../src/components/layout'

import Hero from '../../src/components/Hero';
import TravelPlanning from '../../src/components/Blocks/TravelPlanning';
import LetUsSortThat from '../../src/components/Blocks/LetUsSortThat';
import HowItWorks from '../../src/components/Blocks/HowItWorks';
import TextCarousel from '../../src/components/Blocks/TextCarousel';
import TheBestHotels from '../../src/components/Blocks/TheBestHotels';
import Reviews from '../../src/components/Blocks/Reviews';
import MediaLogos from '../../src/components/Blocks/MediaLogos';
import Prompt from '../../src/components/Blocks/Prompt';
import SubscriptionCalculatorB2B from '../../src/components/Blocks/SubscriptionCalculatorB2B';
import ScrollTarget from '../../src/components/ScrollTarget';

const processQueryData = (rawData) => {

  const data = { ...rawData.data };
  data.logos = [];

  // Extract the first available image and video URLs into the hero
  // and any remaining images into the logos array (up to 3)
  rawData.media.forEach((media) => {
    if (/^image\//.test(media.file.contentType)) {
      if (!data.image) {
        data.image = media.fluid.src;
      } else if (data.logos.length <= 3) {
        data.logos.push({
          src: media.file.url,
          alt: media.description,
        });
      }
    }

    if (/^video\//.test(media.file.contentType)) {
      if (!data.video) {
        data.video = media.file.url;
      } else if (!data.videoSmall) {
        data.videoSmall = media.file.url;
      }
    }

  });

  return data;
};

class IndexPage extends React.PureComponent {
  render() {

    const heroData = processQueryData(this.props.data.contentfulConfigurationItem);

    const navCtas = {
      navCta1: heroData.navCta1,
      navCta2: heroData.navCta2,
    };

    return (
      <Layout startNavTransparent={true} siteMode="corporate" navCtas={navCtas}>

        <Helmet>
          <title>
            BeRightBack - Discover Europe One Surprise Destination at a Time
          </title>
          <meta
            name="description"
            content="BRB is the world's first travel subscription service. Pay monthly and get a break in Europe every 4 months to a surprise destination."
          />
          <meta
            name="keywords"
            content="travel, be right back, brb, BRB, surprise, europe, holidays, subscription, flights, accommodation, hotel, app, travel agent"
          />
          <meta name="robots" content="index, follow" />
          <meta property="og:type" content="product" />
          <meta
            property="og:title"
            content="BRB: The world's first travel subscription"
          />
          <meta property="og:url" content="https://berightback.travel" />
          <meta property="og:image" content={heroData.image} />
        </Helmet>

        <Hero
          image={heroData.image}
          title={heroData.title}
          text={heroData.text}
          video={heroData.video}
          videoSmall={heroData.videoSmall}
          cta={heroData.cta}
          logos={heroData.logos}
        />

        <TravelPlanning dataName="[B2B] Block - travel planning" />
        <LetUsSortThat dataName="[B2B] Block - let us sort that" />
        <TextCarousel dataName="[B2B] Block - choose between"/>
        <Prompt dataName="[B2B] How It Works - intro" />
        <ScrollTarget id="how-it-works" />
        <HowItWorks dataName="[B2B] How It Works - layout" />
        <TheBestHotels dataName="[B2B] Block - the best hotels" />
        <Reviews dataName="[B2B] Block - reviews" />
        <MediaLogos />
        <ScrollTarget id="pricing" />
        <SubscriptionCalculatorB2B />

      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query employeeBenefitsHero {
    contentfulConfigurationItem(name: {eq: "[B2B] Homepage - hero"}) {
      name
      data {
        title
        text
        cta {
          label
          link
          type
        }
        navCta1 {
          label
          link
          active
        }
        navCta2 {
          label
          link
          active
        }
      }
      media {
        description
        fluid(maxWidth: 1200, quality: 75) {
          src
        }
        file {
          contentType
          url
        }
      }
    }
  }
`

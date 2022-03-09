import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

import Metrics from '../../src/themes/Metrics'
import Colors from '../../src/themes/Colors'

import Layout from '../../src/components/layout'
import Spacer from '../../src/components/Spacer'
import LocationBlock from '../../src/components/GridScroll/LocationBlock'
import Prompt from '../../src/components/Blocks/Prompt'
import Hero from '../../src/components/Hero';
import TheBestHotels from '../../src/components/Blocks/TheBestHotels';
import Reviews from '../../src/components/Blocks/Reviews';
import MediaLogos from '../../src/components/Blocks/MediaLogos';
import SubscriptionCalculator from '../../src/components/Blocks/SubscriptionCalculator';

import homeHero from '../../src/images/homeHero.jpg' // used in meta tags
import waitForGlobal from '../../src/utils/waitForGlobal'
import Decorations from '../../src/themes/Decorations'

const Grid = styled.div`
  display: grid;
  grid-gap: 12px;
  grid-template-columns: 1fr 1fr;
  padding: 0 12px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  @media screen and (min-width: 720px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    padding: 0 20px;
  }

  @media screen and (min-width: 960px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
    padding: 0 20px;
  }
`;

const Modal = styled.div`
  display: ${(props) => props.active ? 'flex' : 'none'};
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  width: 100%;
  max-width: 620px;
  max-height: 80vh;
  background-color: white;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: ${Decorations.shadow.heavy};

  h2 {
    padding: 0 20px;
    font-size: 34px;
  }

  p {
    font-size: 18px;
    line-height: 1.5;
    color: ${Colors.darkGrey};
    padding: 0 20px;
  }

  ul {
    padding-right: 30px;
    li {
      margin-bottom: 12px;
      color: ${Colors.darkGrey};
      font-size: 18px;
    }
  }
`;

const SectionHeading = styled.h2`
  background-color: ${Colors.white};
  font-size: 2rem;
  text-align: center;
  padding: ${Metrics.smallSpacer};
  max-width: 16em;
  margin: auto;

  strong, em, span {
    color: ${Colors.red};
  }
`;

const ModalContent = styled.div`
  height: auto;
  overflow: auto;
`;

const Button = styled.button`
  width: 100%;
  height: 80px;
  background-color: white;
  border: none;
  border-top: 1px solid ${Colors.lightGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  cursor: pointer;

  a {
    padding: 12px 20px;
    background-color: ${Colors.red};
    color: white;
  }
`;

export class Destinations extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { modalOpen: false, cityName: null, cityDescription: null, cityImage: null }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }

  countCities(countries) {
    let count = 0;
    countries.map((country) => (count += country.node.cities.length));
    return count;
  }

  openModal(city, country) {
    this.setState({
      modalOpen: true,
      cityName: city.cityName,
      cityDescription: city.shortDescription,
      cityImage: city.postCard
    });
    this._handleClick(city.cityName, country)
  }

  closeModal() {
    this.setState({
      modalOpen: false
    });
  }

  _handleClick(city, country) {
    waitForGlobal('analytics', 500).then(() =>
      window.analytics.track("ViewContent", {
        content_name: city,
        content_category: country
      })
    )
  }


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
    const countries = this.props.data.allContentfulCountries.edges;
    const heroData = this.processHeroQueryData(this.props.data.contentfulConfigurationItem);

    return (
      <Layout startNavTransparent={true}>

        <Helmet>
          <title>BeRightBack - 70+ destinations to explore</title>
          <meta
            name="description"
            content="70+ destinations to explore with BRB. Pay monthly and see a surprise destination every 4 months with flights and hotel included."
          />
          <meta
            name="keywords"
            content="travel, be right back, brb, BRB, surprise, europe, holidays, subscription, flights, accommodation, hotel, app, travel agent, destinations, Paris, Barcelona, Denmark, Reykjavic, Milan, Rome, Prague, Amsterdam"
          />
          <meta name="robots" content="index, follow" />
          <meta property="og:type" content="product" />
          <meta
            property="og:title"
            content="BRB: The world's first travel subscription"
          />
          <meta
            property="og:url"
            content="https://berightback.travel/destinations"
          />
          <meta property="og:image" content={homeHero} />
        </Helmet>

        <Hero
          image={heroData.image}
          title={heroData.title}
          text={heroData.text}
          video={heroData.video}
          cta={heroData.cta}
        />

        <Prompt dataName='Destinations - intro' />

        <SectionHeading>
          Travel to <strong>70+ destinations</strong> across Europe
        </SectionHeading>

        <Grid>
          {countries.map(country =>
            country.node.cities.map(city => (
              city.shortDescription &&
              <LocationBlock
                key={city.cityName}
                city={city.cityName}
                country={country.node.countryName}
                byline={city.byLine.byLine}
                fluid={city.smallImage.sizes}
                onClick={() => this.openModal(city, country.node.countryName)}
                toggled
              />
            ))
          )}
        </Grid>

        <TheBestHotels dataName="Block - the best hotels" />
        <Reviews dataName="Block - reviews"/>
        <MediaLogos />
        <SubscriptionCalculator />

        {this.state.modalOpen &&
          <Modal active={this.state.modalOpen} onClick={this.closeModal}>
            <ModalContainer onClick={(e) => {e.preventDefault(); e.stopPropagation()}}>
              <ModalContent>
                {this.state.cityImage && <Img sizes={this.state.cityImage.sizes} alt={this.state.cityName} />}
                {this.state.cityName && <h2>{this.state.cityName}</h2>}
                {this.state.cityDescription && this.state.cityDescription.childMarkdownRemark && <ReactMarkdown source={this.state.cityDescription.childMarkdownRemark.rawMarkdownBody} />}
                <Spacer height={Metrics.smallSpacer} />
              </ModalContent>
              <Button onClick={() => this.closeModal()} tabIndex="0">
                Close
                </Button>
            </ModalContainer>
          </Modal>
        }

      </Layout>
    )
  }
}

export default Destinations

export const pageQuery = graphql`
{
  contentfulConfigurationItem(name: {eq: "Destinations - hero"}) {
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

  allContentfulHotels {
    edges {
      node {
        id
        hotelName
        stars
        city
        tripAdvisorId
        img {
          description
          sizes(maxWidth: 1200) {
            ...GatsbyContentfulSizes
          }
        }
      }
    }
  }

  allContentfulCountries(sort: {fields: countryName, order: ASC}) {
    edges {
      node {
        id
        countryName
        cities {
          cityName
          byLine {
            byLine
          }
          shortDescription {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
          postCard {
            sizes(maxWidth: 600) {
              ...GatsbyContentfulSizes
            }
          }
          smallImage {
            sizes(maxWidth: 300) {
              ...GatsbyContentfulSizes
            }
          }
        }
      }
    }
  }
}
`;

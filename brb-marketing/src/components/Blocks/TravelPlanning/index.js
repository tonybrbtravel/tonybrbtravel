import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import parse from 'html-react-parser';

import Colors, { rgba } from '../../../themes/Colors';
import Metrics from '../../../themes/Metrics';
import Decorations from '../../../themes/Decorations';

import placeholderImage from '../../../images/locations/bordeaux.jpg';
import Breakpoints from '../../../themes/Breakpoints';

// Fallback settings and content (prefers Contentful query)
const defaults = {

  title: "Travel planning should be <strong>easier.</strong>",
  text: "We’re here to take away all the downsides of organising a trip. The faff. The planning. The fifth search to make sure it’s a good deal and the facepalm moment when you realise the price has gone up.",
  wash: true,
  image: placeholderImage,
  cta: {
    link: "https://app1.berightback.travel/signup",
    label: "Subscribe",
    type: "secondary",
  },

};

const Title = styled.div`
  position: relative;
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  background-image: none;

  h2 {
    font-size: 2.5rem;
    max-width: 10em;
  }

  @media (min-width: ${Breakpoints.medium}) {
    min-height: 80vh;
    padding: ${Metrics.bigSpacer};
    background-color: ${Colors.darkBlue};
    background-image: ${(props) => props.image ? `url(${props.image})` : 'none'};
    flex-basis: 50%;

    h2 {
      color: ${Colors.white};
      text-shadow: ${(props) => props.image ? Decorations.shadow.light : 'none'};
      z-index: 1;

      span, em, strong {
        color: ${Colors.red};
      }
    }

    &:after {
      content: ${(props) => (props.image && props.wash) ? '""' : 'none'};
      background-color: ${rgba(Colors.darkBlue, .6)};
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.offWhite};
  padding: ${Metrics.bigSpacer} ${Metrics.smallSpacer};

  @media (min-width: ${Breakpoints.medium}) {
    flex-direction: row;
    padding: 0;
  }
`;

const Content = styled.div`
  p {
    max-width: 20em;
    margin: auto;
  }

  @media (min-width: ${Breakpoints.medium}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${Metrics.smallSpacer} ${Metrics.bigSpacer};
    flex-basis: 50%;

    p {
      margin: 0;
    }
  }
`;

const DemoImage = styled.img`
  width: 100%;
  max-width: 20em;
  margin: 0 auto ${Metrics.tinySpacer};
  display: block;
`;

const query = graphql`{
  allContentfulConfigurationItem {
    nodes {
      name
      data {
        title
        text
        wash
      }
      media {
        fluid(maxWidth:800, quality: 75) {
          src
        }
        file {
          contentType
          url
        }
      }
    }
  }
}`;

const TravelPlanning = ({dataName}) => {

  const processQueryResult = (rawData) => {

    const configurationItem = rawData.allContentfulConfigurationItem.nodes.find(
      (node) => node.name === dataName
    );

    if (!configurationItem) {
      throw new Error(`A specified configuration item was not found: "${dataName}"`);
    }

    const content = configurationItem.data;

    // Extract image/animation URLs if present
    // First provided is the image (background on desktop)
    // Second is the animation asset (GIF)
    configurationItem.media.forEach((media) => {
      if (/^image\//.test(media.file.contentType)) {
        if (!content.image) {
          content.image = media.fluid.src;
        } else if (!content.demo) {
          content.demo = media.file.url;
        }
      }
    });

    return content;
  };

  const queryResult = useStaticQuery(query);

  const content = { ...defaults };
  if (queryResult.allContentfulConfigurationItem) {
    const processedData = processQueryResult(queryResult);
    Object.assign(content, processedData);
  }

  return <>
    <Wrapper>

      <Title image={content.image} wash={content.wash}>
        <h2 className="simple-animate-in">{parse(content.title)}</h2>
      </Title>

      <Content>

        {content.demo && <DemoImage className="simple-animate-in" src={content.demo} />}

        <p className="simple-animate-in">{parse(content.text)}</p>

      </Content>

    </Wrapper>
  </>;

}

export default TravelPlanning;

import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import parse from 'html-react-parser';

import Colors from '../../../themes/Colors';
import Metrics from '../../../themes/Metrics';
import Breakpoints from '../../../themes/Breakpoints';

import placeholderImage from '../../../images/locations/bordeaux.jpg';

// Fallback settings and content (prefers Contentful query)
const defaults = {

  title: "Let us <strong>sort that</strong> for you.",

  items: [
    {
      image: placeholderImage,
      title: "Flights and hotel included",
      text: "Premium flights and hotels for less than even your most savvy friends could find. We do this through our innovative subscription-based model which puts our travellers at the heart of what we do.",
    },
    {
      image: placeholderImage,
      title: "Tailored to your taste",
      text: "Trips that are as individual as you are. We send you to places on your bucket list, as well as up-and-coming destinations we’ve tried, tested and reckon you’d like. You know, for the extra bragging rights.",
    },
    {
      image: placeholderImage,
      title: "Your travel concierge",
      text: "Hands on travel experts (that’s us) to ensure it’s smooth sailing from the moment you click to subscribe to the moment you get home from your trip. Need a restaurant recommendation? We’ve got you sorted.",
    },
  ],

};

const Wrapper = styled.div`
  background-color: ${Colors.white};
  flex-direction: column;
  padding: ${Metrics.smallSpacer};
  text-align: center;

  @media (min-width: ${Breakpoints.medium}) {
    flex-direction: row;
    padding: ${Metrics.bigSpacer} ;
    text-align: left;
  }
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  max-width: 300px;
  margin: 0 auto ${Metrics.smallSpacer};
`;

const SquareImage = styled.div`
  width: 100%;
  background-color: ${Colors.lightGrey};
  padding-bottom: 100%;
  background-image: ${(props) => props.src ? `url(${props.src})` : 'none'};
  background-size: cover;
  background-position: center center;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media (min-width: ${Breakpoints.medium}) {
    flex-direction: row;
  }
`;

const Item = styled.div`
  max-width: 300px;
  margin: auto;
  padding: ${Metrics.smallSpacer} 0;

  h3 {
    font-size: 1.5rem;
  }

  @media (min-width: ${Breakpoints.medium}) {
    margin: 0;
    padding: ${Metrics.smallSpacer};
    &:nth-child(1), &:nth-child(3) {
      margin-top: -${Metrics.hugeSpacer};
    }
  }
`;

const query = graphql`{
  allContentfulConfigurationItem {
    nodes {
      name
      data {
        title
        text
        points {
          title
          text
        }
      }
      media {
        fixed(width: 480, quality: 75) {
          src
        }
      }
    }
  }
}`;


const LetUsSortThat = ({ dataName }) => {

  const processQueryResult = (rawData) => {

    const configurationItem = rawData.allContentfulConfigurationItem.nodes.find(
      (node) => node.name === dataName
    );

    if (!configurationItem) {
      throw new Error(`A specified configuration item was not found: "${dataName}"`);
    }
    const content = configurationItem.data;
    content.items = content.points || []; // 'points' to avoid GraphQL type clash

    content.items.forEach((item, index) => {
      if (configurationItem.media[index]) {
        item.image = configurationItem.media[index].fixed.src;
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

      <Heading className="simple-animate-in">{parse(content.title)}</Heading>

      <Items>
        {content.items.map((item, index) => <Item key={index}>
          <SquareImage className="simple-animate-in" src={item.image} />
          <h3 className="simple-animate-in">{parse(item.title)}</h3>
          <p className="simple-animate-in">{parse(item.text)}</p>
        </Item>)}
      </Items>

    </Wrapper>
  </>;

}

export default LetUsSortThat;

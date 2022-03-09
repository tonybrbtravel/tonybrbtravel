import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import parse from 'html-react-parser';

import CTA from '../../CTAsmall';

import Colors, { rgba } from '../../../themes/Colors';
import Metrics from '../../../themes/Metrics';
import Breakpoints from '../../../themes/Breakpoints';

import logo from '../../../images/logo.svg'
import checkboxSvg from '../../../images/icons/checkbox.svg';
import placeholderImage from '../../../images/locations/bordeaux.jpg';
import Decorations from '../../../themes/Decorations';

// Fallback settings and content (prefers Contentful query)
const defaults = {

  title: "One monthly subscription. Save up to 35%",
  image: placeholderImage,
  wash: true,

  items: [
    "Select the number of nights you want to travel each year.",
    "We break down the cost of your travels into one montly subscription.",
    "We use our buying power to negotiate better rates with airlines and hotels, passing the savings onto you.",
    "We break down the cost of your travels into one montly subscription.",
  ],

  comparisonData: {
    diy: [
      { label: "Travel Site Margin", percentage: 25, bgColor: "darkBlue", color: "white" },
      { label: "Hotel", percentage: 40, bgColor: "offWhite", color: "red" },
      { label: "Return Flights", percentage: 35, bgColor: "white", color: "black" },
    ],
    brb: [
      { label: "Your Savings", percentage: 25, bgColor: "red", color: "white" },
      { label: "BRB Margin", percentage: 20, bgColor: "darkBlue", color: "white" },
      { label: "Hotel", percentage: 30, bgColor: "offWhite", color: "red" },
      { label: "Return Flights", percentage: 25, bgColor: "white", color: "black" },
    ],
  },

  cta: {
    link: "https://app1.berightback.travel/signup",
    label: "See all benefits of subscription travel",
  },

};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.darkGrey};
  background-size: cover;
  background-position: ${(props) => props.bgPosition ? props.bgPosition : 'center center'};
  background-image:${(props) => props.image ? `url(${props.image})` : 'none'};
  color: ${Colors.white};
  padding: ${Metrics.smallSpacer};

  &:before {
    content: ${(props) => (props.image && props.wash) ? '""' : 'none'};
    background-color: ${rgba(Colors.darkBlue, .6)};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  @media (min-width: ${Breakpoints.medium}) {
    padding: ${Metrics.bigSpacer} ${Metrics.smallSpacer};
    flex-direction: row;
  }
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  h2 {
    font-size: 2rem;
  }

  ul {
    padding: 0;
    padding-left: 2em;
  }

  li {
    list-style-type: none;
    line-height: 1.4em;
    position: relative;
    margin-bottom: ${Metrics.tinySpacer};

    &:before {
      content: '';
      background-image: url(${checkboxSvg});
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      margin-right: .25em;
      height: 1.4em;
      width: 1.2em;
      padding-top:
      display: block;
      position: absolute;
      left: -2em;
    }
  }

  @media (min-width: ${Breakpoints.medium}) {
    flex-basis: 50%;
    padding: ${Metrics.smallSpacer} ${Metrics.bigSpacer};
  }
`;

const Graphs = styled.div`
  position: relative;
  margin: ${Metrics.hugeSpacer} 0 ${Metrics.smallSpacer};
  padding: 0 ${Metrics.tinySpacer};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  font-size: .8rem;

  @media (min-width: ${Breakpoints.medium}) {
    flex-basis: 50%;
    margin: ${Metrics.hugeSpacer} 0;
  }
`;

const GraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const GraphLabel = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${Colors.white};
  margin: 0;
`;

const Graph = styled.div`
  position: relative;
  height: 20rem;
  width: 9rem;
  display: flex;
  flex-direction: column;
  margin-bottom: ${Metrics.tinySpacer};
  padding: 0 ${Metrics.tinySpacer};
  border-bottom: 1px solid ${Colors.black};
`;

const DataPoint = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ color }) => Colors[color]};
  background-color: ${({ bgColor }) => Colors[bgColor]};
  height: ${({ percentage }) => `${percentage}%`};
  text-align: center;
  padding: ${Metrics.tinySpacer};
  border: 1px solid ${Colors.black};
  margin-bottom: -1px;
`;

const Badge = styled.div`
  font-size: 2rem;
  overflow: hidden;
  position: absolute;
  top: 0;
  right: ${Metrics.tinySpacer};
  transform: translate(55%, -55%) rotate(-30deg);
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  background-color: ${Colors.white};
  color: ${Colors.black};
  -webkit-text-fill-color: ${Colors.white}; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: .5px;
  -webkit-text-stroke-color: ${Colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${Decorations.shadow.light};
`;

const Center = styled.div`
  text-align: center;
`;

const query = graphql`{
  contentfulConfigurationItem(name: {eq: "Block - comparison"}) {
    data {
      title
      wash
      cta {
        label
        to
        link
        type
      }
      stringArray
      comparisonData {
        diy {
          label
          percentage
          bgColor
          color
        }
        brb {
          label
          percentage
          bgColor
          color
        }
      }
    }
    media {
      fluid(maxWidth:1200, quality: 75) {
        src
      }
      file {
        contentType
        url
      }
    }
  }
}`;

const processQueryResult = (queryData) => {
  const content = {...queryData.contentfulConfigurationItem.data};

  content.items = content.stringArray || [];

  // Extract background image URL if present
  queryData.contentfulConfigurationItem.media.forEach((media) => {
    if (/^image\//.test(media.file.contentType)) {
      if (!content.image) {
        content.image = media.fluid.src;
      }
    }
  });

  return content;
};

const Comparison = () => {

  const queryResult = useStaticQuery(query);

  const content = { ...defaults };
  if (queryResult.contentfulConfigurationItem) {
    const processedData = processQueryResult(queryResult);
    Object.assign(content, processedData);
  }

  return <>
    <Wrapper image={content.image} wash={content.wash}>

      <Content>

        <h2 className="simple-animate-in">{parse(content.title)}</h2>

        <ul>
          {content.items.map((item, index) => <li className="simple-animate-in" key={index}>{item}</li>)}
        </ul>

        { content?.cta?.label &&
          <CTA className="simple-animate-in" hideOnMobile secondary to={content.cta.to} href={content.cta.link} target={content.cta.target}>
            {content.cta.label}
          </CTA>
        }

      </Content>

      <Graphs className="simple-animate-in">
        <GraphWrapper>
          <Graph>
            {content.comparisonData.diy.map((dataPoint, index) =>
              <DataPoint key={index} {...dataPoint}>
                {/* <pre>{JSON.stringify(dataPoint, null, 4)}</pre> */}
                {dataPoint.label}
              </DataPoint>
            )}
          </Graph>
          <GraphLabel>
            <p>DIY Travel</p>
          </GraphLabel>
        </GraphWrapper>
        <GraphWrapper>
          <Graph>
            {content.comparisonData.brb.map((dataPoint, index) =>
              <DataPoint key={index} {...dataPoint}>
                {/* <pre>{JSON.stringify(dataPoint, null, 4)}</pre> */}
                {dataPoint.label}
              </DataPoint>
            )}
            <Badge>£</Badge>
          </Graph>
          <GraphLabel>
            <img src={logo} alt="BRB Logo"/>
          </GraphLabel>
        </GraphWrapper>
      </Graphs>

      { content?.cta?.label &&
        <Center>
          <CTA className="simple-animate-in" hideOnDesktop secondary to={content.cta.to} href={content.cta.link} target={content.cta.target}>
            {content.cta.label}
          </CTA>
        </Center>
      }

    </Wrapper>
  </>;

}

export default Comparison;

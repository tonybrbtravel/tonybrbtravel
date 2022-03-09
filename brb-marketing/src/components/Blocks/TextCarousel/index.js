import React, { useState } from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import parse from 'html-react-parser';

import Colors, { rgba } from '../../../themes/Colors';
import Metrics from '../../../themes/Metrics';
import Decorations from '../../../themes/Decorations';
import Breakpoints from '../../../themes/Breakpoints';
import Timings from '../../../themes/Timings';

import CTA from '../../CTAsmall';

import placeholderImage from '../../../images/locations/bordeaux.jpg';
import selectChevron from '../../../images/icons/selectChevron.svg';

// Fallback settings and content (prefers Contentful query)
const defaults = {

  title: "Our promise to you.",
  wash: true,
  image: placeholderImage,
  cta: {
    link: "https://app1.berightback.travel/signup",
    label: "Find out more",
    type: "secondary",
  },

  items: [
    {
      title: "Quality Accomodation",
      text: "Our all-inclusive solution allows us to provide you with hand-picked quality assured hotels, that are based in the heart of every destination we provide.",
    },
    {
      title: "Cancel Anytime",
      text: "Get your money back on unused trips.",
    },
    {
      title: "A new destination every time",
      text: "Our travel experts hand pick your trip, you have full control over your list of excluded destinations. We won’t send you to the same city twice, unless you want us to!",
    },
  ],

};

const Wrapper = styled.div`
  min-height: calc(100vh - ${Metrics.navHeight});
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-size: cover;
  background-position: center center;
  background-color: ${Colors.darkBlue};
  background-image: ${(props) => props.image ? `url(${props.image})` : 'none'};
  color: ${Colors.white};
  padding: ${Metrics.bigSpacer} ${Metrics.smallSpacer};

  &:before {
    content: ${(props) => (props.image && props.wash) ? '""' : 'none'};
    background-color: ${rgba(Colors.black, .8)};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  @media (min-width: ${Breakpoints.medium}) {
    flex-direction: row;
    padding: 0;
    background-image: none;
    background-color: ${Colors.offWhite};
    color: ${Colors.black};
    padding: 0;

    &:before {
     content: none;
    }
  }
`;

const Title = styled.div`
  position: relative;
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: none;
  z-index: 10;

  h2 {
    font-size: 2.5rem;
  }

  @media (min-width: ${Breakpoints.medium}) {
    padding: ${Metrics.bigSpacer};
    background-color: ${Colors.darkBlue};
    background-image: ${(props) => props.image ? `url(${props.image})` : 'none'};
    flex-basis: 50%;
    flex-grow: 0;
    flex-shrink: 0;

    h2 {
      color: ${Colors.white};
      text-shadow: ${(props) => props.image ? Decorations.shadow.default : 'none'};
      z-index: 1;
      max-width: 6.5em;

      span, em, strong {
        color: ${Colors.red};
      }
    }

    &:after {
      content: ${(props) => (props.image && props.wash) ? '""' : 'none'};
      background-color: ${rgba(Colors.darkBlue, .4)};
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media (min-width: ${Breakpoints.small}) {
    align-items: center;
  }

  @media (min-width: ${Breakpoints.medium}) {
    padding: ${Metrics.bigSpacer};
    flex-basis: 50%;
    flex-grow: 0;
    flex-shrink: 0;
    align-items: flex-start;
  }
`;

const SwitcherDiscrete = styled.div`
  display: block;
  margin-bottom: ${Metrics.tinySpacer};
  margin-left: -1rem;

  @media (min-width: ${Breakpoints.small}) {
    display: none;
  }

  @media (min-width: ${Breakpoints.medium}) {
    display: block;
    margin-bottom: ${Metrics.bigSpacer};
  }
`;

const SwitcherInline = styled.div`
  display: none;
  flex-grow: 0;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  z-index: 100;

  @media (min-width: ${Breakpoints.small}) {
    display: flex;
  }

  @media (min-width: ${Breakpoints.medium}) {
    display: none;
  }
`;

const Switch = styled.div`
  cursor: pointer;
  display: inline-block;
  width: 3rem;
  height: 4rem;
  transform: rotate(${(props) => props.direction === 'prev' ? '' : '-'}90deg);
  background-image: url(${selectChevron});
  background-size: 50% auto;
  background-position: center center;
  background-repeat: no-repeat;
  filter: ${(props) => props.available ? 'none' : 'grayscale(1)'};

  @media (min-width: ${Breakpoints.medium}) {
    margin-right: 1rem;
    width: 3rem;
    height: 2rem;
  }
`;

const ItemsWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: ${Metrics.smallSpacer};
  max-width: 30rem;
`;

const Items = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-shrink: 1;
  width: 1px; /* Allows flex-grow to take effect */
  transition: transform ${Timings.transition.default} ease-in-out;
  transform: translateX(${(props) => `-${props.currentItem * 100}%`});

  @media (min-width: ${Breakpoints.medium}) {
    transform: translateX(${(props) => `-${props.currentItem * 90}%`});
    // width: 200px;
  }
`;

const Item = styled.div`
  padding: 0;
  width: 100%;
  flex-shrink: 0;
  flex-grow: 0;
  opacity: ${(props) => props.current ? 1 : 0};
  transition: opacity ${Timings.transition.default} ease-in-out;

  h3 {
    max-width: 10em;
    font-size: 1.8rem;
    margin: 0;
    margin-bottom: 1em;
  }

  p {
    max-width: 18em;
  }

  @media (min-width: ${Breakpoints.small}) {
    padding: ${Metrics.smallSpacer};
  }

  @media (min-width: ${Breakpoints.medium}) {
    width: 90%;
    padding: 0;
    padding-right: ${Metrics.bigSpacer};
    opacity: ${(props) => props.current ? 1 : .25};
  }
`;


const query = graphql`{
  allContentfulConfigurationItem {
    nodes {
      name
      data {
        title
        wash
        items {
          title
          text
        }
        cta {
          label
          link
          type
          to
        }
      }
      media {
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
}`;


const TextCarousel = ({dataName}) => {

  const [currentItem, setCurrentItem] = useState(0);

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

  const handleNext = () => {
    setCurrentItem(Math.min(currentItem + 1, content.items.length - 1));
  };

  const handlePrev = () => {
    setCurrentItem(Math.max(0, currentItem - 1));
  };


  return <>
    <Wrapper image={content.image} wash={content.wash}>

      <Title image={content.image} wash={content.wash}>
        <h2 className="simple-animate-in">{parse(content.title)}</h2>
      </Title>

      <Content>

        <SwitcherDiscrete className="simple-animate-in">
          <Switch onClick={handlePrev} direction='prev' available={currentItem > 0} />
          <Switch onClick={handleNext} direction='next' available={currentItem < content.items.length - 1} />
        </SwitcherDiscrete>

        <ItemsWrapper>

          <SwitcherInline>
            <Switch onClick={handlePrev} direction='prev' available={currentItem > 0} />
          </SwitcherInline>

          <Items currentItem={currentItem}>
            {content.items.map((item, index) => {
              return <Item key={index} current={index === currentItem}>
                <h3 className="simple-animate-in">{parse(item.title)}</h3>
                <p className="simple-animate-in">{parse(item.text)}</p>
              </Item>
            })}
          </Items>

          <SwitcherInline>
            <Switch onClick={handleNext} direction='next' available={currentItem < content.items.length - 1} />
          </SwitcherInline>

        </ItemsWrapper>

        { content?.cta?.label &&
          <CTA className="simple-animate-in" secondary to={content.cta.to} href={content.cta.link}>
            {content.cta.label}
          </CTA>
        }

      </Content>

    </Wrapper>
  </>;

}

export default TextCarousel;

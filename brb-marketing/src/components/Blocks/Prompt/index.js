import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import parse from 'html-react-parser';

import Colors, { rgba } from '../../../themes/Colors';
import Metrics, { unitless } from '../../../themes/Metrics';
import Breakpoints from '../../../themes/Breakpoints';

import continueArrowDown from '../../../images/icons/continueArrowDown.svg';
import Timings from '../../../themes/Timings';

const Wrapper = styled.div`
  position: relative;
  background-color: ${(props) => props.bgColor ? `url(${props.bgColor})` : Colors.offWhite};
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: row;
  text-align: center;
  padding: 0;
  min-height: calc(100vh - ${Metrics.navHeight});
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: ${Breakpoints.medium}) {
    flex-basis: 50%;
    flex-grow: 1;
    flex-shrink: 0;
  }
`;

const ImageSection = styled.div`
  position: relative;
  background-image: ${(props) => props.image ? `url(${props.image})` : 'none'};
  background-position: ${(props) => props.bgPosition ? props.bgPosition : 'center center'};
  background-repeat: no-repeat;
  background-size: cover;
  height: auto;
  flex-basis: 50%;
  flex-grow: 1;
  flex-shrink: 0;
  display: none;

  &:before {
    content: '';
    background-color: ${rgba(Colors.darkBlue, .3)};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  @media (min-width: ${Breakpoints.medium}) {
    display: block;
  }
`;

const TextWrapper = styled.div`
  max-width: 400px;
  text-align: center;
  margin: auto 0;

  @media (min-width: ${Breakpoints.medium}) {
    text-align: left;
  }
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 0;
  padding: ${Metrics.smallSpacer};

  strong, em, span {
    color: ${Colors.red};
  }
`;

const Copy = styled.p`
  text-align: left;
  margin-top: 0;
  padding: ${Metrics.smallSpacer};
`;

const pulse = keyframes`
from {
  transform: scale(1);
}

to {
  transform: scale(1.1);
}`;

const ContinueButton = styled.div`
  margin: 0 auto;
  padding: ${Metrics.tinySpacer};
  cursor: pointer;
  font-size: 1.2rem;

  &:after {
    content: '';
    display: block;
    margin: ${Metrics.tinySpacer} auto;
    width: 2em;
    height: 2em;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    background-image: url(${continueArrowDown});
    animation: ${pulse} ${Timings.animation.default} alternate linear infinite;
  }
`;

const query = graphql`{
  allContentfulConfigurationItem {
    nodes {
      name
      data {
        title
        text
        displayContinueButton
        continueButtonLabel
        bgPosition
      }
      media {
        fluid(maxWidth: 800, quality: 75) {
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

const Prompt = ({dataName}) => {

  const element = useRef();

  const processQueryResult = (rawData) => {

    const configurationItem = rawData.allContentfulConfigurationItem.nodes.find(
      (node) => node.name === dataName
    );

    if (!configurationItem) {
      throw new Error(`A specified configuration item was not found: "${dataName}"`);
    }

    const content = configurationItem.data || {};

    // Lift out an image URL
    configurationItem.media.forEach((media) => {
      if( /^image\//.test(media.file.contentType) && !content.image) {
        content.image = media.fluid.src;
      }
    });

    return content;

  };

  const queryResult = useStaticQuery(query);

  const content = processQueryResult(queryResult);

  const handleContinue = () => {
    const rect = element.current.getBoundingClientRect();
    window.scrollBy({
      top: rect.bottom - unitless(Metrics.navHeight),
      behavior: 'smooth'
    });
  };

  return <>
  {/* <pre>{JSON.stringify(content, null, 4)}</pre> */}
    <Wrapper ref={element} bgColor={content.bgColor}>
      <TextSection>
        <TextWrapper>
          { content.title && <Heading className="simple-animate-in">{parse(content.title || '')}</Heading> }
          { content.text && <Copy className="simple-animate-in">{parse(content.text || '')}</Copy> }
        </TextWrapper>
        { content.displayContinueButton && <ContinueButton onClick={handleContinue}>{content.continueButtonLabel}</ContinueButton> }
      </TextSection>
      <ImageSection image={content.image} bgPosition={content.bgPosition} />
    </Wrapper>
  </>;

}

export default Prompt;

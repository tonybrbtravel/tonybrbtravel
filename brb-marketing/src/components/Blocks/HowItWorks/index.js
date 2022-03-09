import React from 'react';
import styled from 'styled-components';
import {graphql, useStaticQuery } from 'gatsby';
import { MARKS, BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Colors, { rgba } from '../../../themes/Colors';
import Metrics from '../../../themes/Metrics';
import Decorations from '../../../themes/Decorations';
import Breakpoints from '../../../themes/Breakpoints';

// import H3 from '../../H3';
import CTA from '../../CTAsmall';

import Decoration from './Decoration';
import Navigation from './Navigation';

import placeholderImage from '../../../images/locations/bordeaux.jpg';

const defaultContent = {
  title: 'Placeholder title',
  image: placeholderImage,
  panels: [],
};

const getSectionWashColor = (props) => {
  switch (props.layoutMobile) {
    case 'dark-image':
      return rgba(Colors.darkBlue, .5);

    case 'light-image':
      return rgba(Colors.offWhite, .75);

    case 'no-image':
    default:
      return props.bgColor ? Colors[props.bgColor] : Colors.offWhite;
  }
};

const Panel = styled.div`
  position: relative;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: ${(props) => props.split * 1 + '%'};
  padding: 0;
  display: ${(props) => props.hideMobile ? 'none' : 'flex'};

  @media (min-width: ${Breakpoints.medium}) {
    background-size: cover;
    background-position: ${(props) => props.bgPosition ? props.bgPosition : 'center center'};
    background-image:${(props) => props.image ? `url(${props.image})` : 'none'};
    padding: ${Metrics.smallSpacer} ${Metrics.bigSpacer};
    display: flex;
    color: ${(props) => props.invert ? Colors.white : Colors.black};
    text-shadow: ${(props) => props.invert ? Decorations.shadow.default : 'none'};

    &:first-child {
      padding-left: ${Metrics.massiveSpacer};
    }

    &:before {
      content: ${(props) => (props.image && !props.skipWash) ? '""' : 'none'};
      background-color: ${rgba(Colors.darkBlue, .4)};
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
`;

const Section = styled.div`
  background-color: ${(props) => props.bgColor ? Colors[props.bgColor] : Colors.offWhite};
  position: relative;
  display: flex;
  min-height: calc(100vh - ${Metrics.navHeight});
  flex-direction: column;
  overflow: hidden;
  padding: ${Metrics.bigSpacer};
  background-image:${(props) => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: ${(props) => props.bgPosition ? props.bgPosition : 'center center'};
  color: ${(props) => props.invert ? Colors.white : Colors.black};
  text-shadow: ${(props) => props.invert ? Decorations.shadow.default : 'none'};

  &:before {
    content: ${(props) => (props.image) ? '""' : 'none'};
    background-color: ${getSectionWashColor};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  @media (min-width: ${Breakpoints.medium}) {
    flex-direction: row;
    padding: 0;
    background-image: ${(props) => props.fullImage ? `url(${props.fullImage})` : 'none'};

    &:before {
      content: ${(props) => (props.fullImage) ? '""' : 'none'};
    }
  }
`;

const PanelContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  z-index: 1;
`;

const Index = styled.span`
  display: block;
  color: ${Colors.lightGrey};
  text-shadow: none;
  font-size: 6rem;
  font-weight: 700;
  opacity: .5;
`;

const H3 = styled.h3`
  margin: 0;
  font-size: 2.5rem;
  max-width: 8em;

  strong, em, span {
    color: ${Colors.red};
  }

  @media (min-width: ${Breakpoints.medium}) {
    font-size: 3rem;
  }
`;

const Text = styled.div`
  line-height: 1.5;
  max-width: 20em;
`;

const Spacer = styled.div`
  height: ${(props) => props.size ? Metrics[props.size + 'Spacer'] : Metrics.smallSpacer};
`;


const query = graphql`{
  allContentfulConfigurationItem {
    nodes {
      name
      references {
        layout
        layoutMobile
        split
        decoration
        bgColor
        image {
          fluid(maxWidth: 1200, quality: 80) {
            src
            srcSet
          }
          file {
            contentType
          }
        }
        title {
          raw
        }
        text {
          raw
        }
        ctaLabel
        ctaLink
        ctaTo {
          path
          sys {
            contentType {
              sys {
                id
              }
            }
          }
        }
      }
    }
  }
}`;



// TODO: SWitch to CSS grid to better address layout variant inconsistencies
const HowItWorksSection = ({ number, data = {} }) => {

  const { title, text, layout = 'text-left', image, cta, decoration = 'none', layoutMobile = 'no-image', split, bgColor = 'offWhite' } = data;

  const copy = (text || cta) ? <>
    {text && <Text className="simple-animate-in">{documentToReactComponents(text)}</Text>}
    {text && cta && <Spacer />}
    {cta && <CTA className="simple-animate-in" secondary={true} to={cta.to} href={cta.link}>{cta.label} &nbsp; →</CTA>}
  </> : null;

  const titleElement = title ? <H3 className="simple-animate-in">{documentToReactComponents(title, documentToReactComponentsHeadingsOptions)}</H3> : null

  const fullImage = layout === 'full-image' ? image : false;
  const firstImage = ['text-right', 'text-right-alt'].includes(layout) ? image : false;
  const secondImage = ['text-left', 'text-left-alt'].includes(layout) ? image : false;
  const invertFull = ['dark-image'].includes(layoutMobile) ? true : false;
  const invertFirst = ['full-image', 'text-right', 'text-right-alt'].includes(layout) ? true : false;
  const invertSecond = ['text-left', 'text-left-alt'].includes(layout) ? true : false;

  return <Section bgColor={bgColor} invert={invertFull} image={image} fullImage={fullImage} layoutMobile={layoutMobile}>

    <Panel split={split} image={firstImage} invert={invertFirst}>
      <PanelContents>
        {number && <Index>0{number}</Index>}
        {['full-image', 'text-left', 'text-right-alt'].includes(layout) && titleElement}
        {['full-image', 'text-left', 'text-left-alt'].includes(layout) && copy}
      </PanelContents>
    </Panel>

    <Panel split={100 - split} image={secondImage} invert={invertSecond}>
      <PanelContents>
        {['text-right', 'text-left-alt'].includes(layout) && titleElement}
        {['text-right', 'text-right-alt'].includes(layout) && copy}
      </PanelContents>
      <Decoration type={decoration} />
    </Panel>


  </Section>
};

const documentToReactComponentsHeadingsOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      children
    ),
  },
  renderMark: {
    [MARKS.BOLD]: text => <strong>{text}</strong>,
  },
};

const buildCtaData = (label, secondary, toRef, link) => {
  const cta = { label, secondary, link };
  if (toRef) {
    if (toRef?.sys?.contentType?.sys?.id === 'webpageStub') {
      cta.to = toRef.path;
    }
  }
  return cta;
};



const HowItWorks = ({dataName}) => {

  const processQueryResult = (rawData) => {

    const configurationItem = rawData.allContentfulConfigurationItem.nodes.find(
      (node) => node.name === dataName
    );

    if (!configurationItem) {
      throw new Error(`A specified configuration item was not found: "${dataName}"`);
    }

    const { references } = configurationItem;

    const content = { };

    // Extract data from the referenced panels
    content.panels = [];
    references.forEach((panelData) => {
      const panel = {
        layout: panelData.layout,
        layoutMobile: panelData.layoutMobile,
        bgColor: panelData.bgColor,
        decoration: panelData.decoration,
        split: panelData.split || 50,
        title: JSON.parse(panelData.title.raw),
        text: JSON.parse(panelData.text.raw),
        cta: panelData.ctaLabel && buildCtaData(panelData.ctaLabel, panelData.ctaSecondary, panelData.ctaTo, panelData.ctaLink),
      };

      if (panelData.image) {
        panel.image = panelData.image.fluid.src;
      }

      content.panels.push(panel);
    });

    return content;
  };


  const content = {...defaultContent};
  const queryResult = useStaticQuery(query);

  if (queryResult.allContentfulConfigurationItem) {
    Object.assign(content, processQueryResult(queryResult));
  }

  return <>

    <Navigation>
      { content.panels.map((data, index) => {
        return <HowItWorksSection
        key={index}
        number={index + 1}
        data={data}
        />
      })}
    </Navigation>

  </>;

}

export default HowItWorks;

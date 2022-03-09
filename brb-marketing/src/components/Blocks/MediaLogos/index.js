import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';

import Colors, { rgba } from '../../../themes/Colors';
import Metrics from '../../../themes/Metrics';
import Breakpoints from '../../../themes/Breakpoints';

// Fallback settings and content (prefers Contentful query)
const defaults = {
  items: []
};

const query = graphql`{
  contentfulConfigurationItem(name: {eq: "Block - media logos"}) {
    media {
      fixed(width: 200, quality: 75) {
        src
      }
      file {
        contentType
        url
      }
    }
  }
}`;

const Wrapper = styled.div`
  position: relative;
  background-color: ${Colors.white};
  padding: 0;
  text-align: center;
  overflow: hidden;

  &::before, &::after {
    position: absolute;
    z-index: 10;
    display: block;
    content: '';
    background-image: linear-gradient(to left, ${rgba(Colors.white, 0)}, ${Colors.white} 75%);
    top: 0;
    left: 0;
    height: 100%;
    width: ${Metrics.bigSpacer};
    pointer-events: none;
  }

  &::after {
    left: auto;
    right: 0;
    background-image: linear-gradient(to right, ${rgba(Colors.white, 0)}, ${Colors.white} 75%);
  }

`;

const Content = styled.div`
  max-width: 100%;
  overflow: scroll;
  padding-bottom: ${Metrics.bigSpacer};
  margin-bottom: -${Metrics.bigSpacer};
`;

const Logos = styled.div`
  display: inline-flex;
  flex-direction: row;
  padding: 0 ${Metrics.smallSpacer};

  @media (min-width: ${Breakpoints.medium}) {
    display: flex;
    justify-content: space-around;
  }

  @media (min-width: ${Breakpoints.large}) {
    display: flex;
    justify-content: space-around;
    max-width: ${Breakpoints.extraLarge};
    margin-left: auto;
    margin-right: auto;
  }
`;

const Logo = styled.img`
  width: 8rem;
  height: 5rem;
  object-fit: contain;
  margin: ${Metrics.smallSpacer};
  opacity: .5;

  @media (min-width: ${Breakpoints.medium}) {
    width: 5rem;
    height: 3rem;
  }

  @media (min-width: ${Breakpoints.large}) {
    width: 8rem;
    height: 6rem;
  }
`;

const processQueryResult = (queryData) => {
  const content = queryData.contentfulConfigurationItem.data || {};
  content.items = [];

  // Extract images
  queryData.contentfulConfigurationItem.media.forEach((media) => {
    if (/^image\//.test(media.file.contentType)) {
      content.items.push({ url: media.fixed.src});
    }
  });

  return content;
};

const MediaLogos = (props) => {

  const queryResult = useStaticQuery(query);

  const content = { ...defaults };
  if (queryResult.contentfulConfigurationItem) {
    const processedData = processQueryResult(queryResult);
    Object.assign(content, processedData);
  }

  return <>
    <Wrapper image={content.image} wash={content.wash}>
      <Content>
        <Logos>
          { content.items.map((item, index) => <Logo key={index} src={item.url} />) }
        </Logos>
      </Content>
    </Wrapper>
  </>;

}

export default MediaLogos;

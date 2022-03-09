import React, { useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import parse from 'html-react-parser';

import Colors, { rgba } from '../../../themes/Colors';
import Metrics from '../../../themes/Metrics';
import Decorations from '../../../themes/Decorations';
import Breakpoints from '../../../themes/Breakpoints';

import CTA from '../../CTAsmall';

import placeholderImage from '../../../images/locations/bordeaux.jpg';
import ratingStarFull from '../../../images/icons/ratingStarFull.svg';
import ratingStarEmpty from '../../../images/icons/ratingStarEmpty.svg';

const ratingStarSize = 25;
// Fallback settings and content (prefers Contentful query)
const defaults = {

  title: "Only the best hotels",
  text: "Our curated collection of top hotels ensures your stay will be unforgettable",
  cta: {
    label: "See full collection",
    to: "/hotels",
    type: "secondary",
  },

  items: [
    {
      image: placeholderImage,
      name: "Santi",
      location: "Krakow",
      rating: 3.5,
    },
    {
      image: placeholderImage,
      name: "Palazzo Paruta",
      location: "Venice",
      rating: 4.2,
    },
    {
      image: placeholderImage,
      name: "Gat Point Charlie",
      location: "Berlin",
      rating: 4,
    },
    {
      image: placeholderImage,
      name: "Gat Point Charlie",
      location: "Berlin",
      rating: 4,
    },
    {
      image: placeholderImage,
      name: "Gat Point Charlie",
      location: "Berlin",
      rating: 4,
    },
  ],

};

const Wrapper = styled.div`
  position: relative;
  background-color: ${Colors.white};
  flex-direction: column;
  padding: ${Metrics.smallSpacer} 0;
  text-align: center;

  @media (min-width: ${Breakpoints.medium}) {
    flex-direction: row;
    padding: ${Metrics.bigSpacer} 0;
    text-align: left;
  }
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  max-width: 300px;
  margin: 0 auto ${Metrics.smallSpacer};
`;

const Hotel = styled.div`
  text-align: left;
  position: relative;
  width: 100%;
  background-color: ${Colors.lightGrey};
  padding-bottom: 100%;
  background-image: ${(props) => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center center;
  color: ${Colors.white};
  text-shadow: ${Decorations.shadow.default};

  &:before {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: .5;
    background: linear-gradient(
      to bottom,
      ${Colors.black},
      ${rgba(Colors.black, 0)} 40%,
      ${rgba(Colors.black, 0)} 80%,
      ${Colors.black}
    );
  }

  div.details {
    position: absolute;
    padding: ${Metrics.tinySpacer};
    left: 0;
    top: 0;
    font-size: 1.1rem;

    h4, p {
      margin: 0 0 4px;
    }

    p {
      text-transform: uppercase;
    }
  }
`;

const ScrollWrapper = styled.div`
  width: 100%;
  margin: 0;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar { width: 0 !important; height: 0 !important; }

  @media (min-width: ${Breakpoints.medium}) {
    margin-top: -${Metrics.hugeSpacer};
    padding-bottom: ${Metrics.hugeSpacer};
  }
`;

const ItemsWrapper = styled.div`
  width: 200px;
  margin: auto;
  cursor: ${(props) => props.isDragging ? 'grabbing' : 'grab'};
  user-select: none;

  @media (min-width: ${Breakpoints.small}) {
    width: 300px;
  }

  @media (min-width: ${Breakpoints.medium}) {
    width: 100%;
  }
`;

const Items = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: start;
  width: max-content;

  @media (min-width: ${Breakpoints.medium}) {
    justify-content: center;
    left: 0;
  }
`;

const Item = styled.div`
  --factor: 1;
  width: 200px;
  flex-shrink: 0;
  margin: 0 ${Metrics.smallSpacer} 0 0;
  padding: 0;
  opacity: calc(1 - ( var(--factor) * .5 ));
  transform: scale(calc(1 - ( var(--factor) * .5 )));

  &:last-child {
    margin-right: calc(50vw - 100px);
  }

  h3 {
    font-size: 1.5rem;
  }

  @media (min-width: ${Breakpoints.small}) {
    width: 300px;

    &:last-child {
      margin-right: calc(50vw - 150px);
    }
  }

  @media (min-width: ${Breakpoints.medium}) {
    transform: none;
    opacity: 1;
    margin: 0;
    padding: ${Metrics.smallSpacer};
    transform: translateY(calc(${Metrics.hugeSpacer} * (1 - var(--factor)) * (1 - var(--factor))));

    &:first-child {
      margin-left: calc(50vw - 150px);
    }
  }

  @media (min-width: ${Breakpoints.large}) {
    &:first-child {
      margin-left: calc(50vw - 450px);
    }

    &:last-child {
      margin-right: calc(50vw - 450px);
    }
  }
`;

const Rating = styled.div`
  width: ${ratingStarSize * 5}px;
  height: ${ratingStarSize}px;
  background-size: ${ratingStarSize}px auto;
  background-position: left center;
  background-repeat: repeat-x;
  background-image: url(${ratingStarEmpty});
  position: absolute;
  bottom: ${Metrics.tinySpacer};
  left: ${Metrics.tinySpacer};

  &:before {
    content: '';
    display: block;
    width: ${(props) => `${props.rating * ratingStarSize}px`};
    height: ${ratingStarSize}px;
    background-position: left center;
    background-size: ${ratingStarSize}px auto;
    background-repeat: repeat-x;
    background-image: url(${ratingStarFull});
  }
`;

const CTAWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: ${Metrics.smallSpacer};

  p {
    max-width: 20em;
    margin-bottom: ${Metrics.smallSpacer};
  }

  @media (min-width: ${Breakpoints.medium}) {
    flex-direction: row;

    p {
      margin-bottom: 0;
      margin-right: ${Metrics.bigSpacer};
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
        cta {
          label
          to
          link
          type
        }
        items {
          name
          location
          rating
        }
      }
      media {
        fixed(width: 480, quality: 75) {
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



const TheBestHotels = ({ dataName }) => {

  const processQueryResult = (rawData) => {

    const configurationItem = rawData.allContentfulConfigurationItem.nodes.find(
      (node) => node.name === dataName
    );

    if (!configurationItem) {
      throw new Error(`A specified configuration item was not found: "${dataName}"`);
    }

    const content = configurationItem.data;
    content.items = content.items || [];

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

  const scrollWrapper = useRef();
  const itemsWrapper = useRef();
  const itemElementArray = useRef([]);
  const animationFrameRequestID = useRef();
  const scrollPosition = useRef();

  // Adapted from https://discourse.wicg.io/t/drag-to-scroll-a-simple-way-to-scroll-sideways-on-desktop/3627
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);


  // Animation handler
  const animate = useCallback(
    () => {
      animationFrameRequestID.current = window.requestAnimationFrame(animate);
      const currentScrollPosition = itemsWrapper.current.getBoundingClientRect().left;
      if (scrollPosition.current !== currentScrollPosition) {
        scrollPosition.current = currentScrollPosition;
        itemElementArray.current.forEach((element) => {
          const rect = element.getBoundingClientRect();
          const centerOffset = Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2);
          const centerOffsetNormalized = Math.min(1, centerOffset / (window.innerWidth / 2 + rect.width / 2));
          const factor = Math.pow(centerOffsetNormalized, 2);
          element.style.setProperty('--factor', factor);
        });
      }
    },
    []
  );

  const handleMousedown = useCallback(
    (e) => {
      isDragging.current = true;
      startX.current = e.pageX - scrollWrapper.current.offsetLeft;
      scrollLeft.current = scrollWrapper.current.scrollLeft;
    },
    []
  );

  const handleMouseleave = useCallback(
    () => {
      isDragging.current = false;
    },
    []
  );

  const handleMouseup = useCallback(
    () => {
      isDragging.current = false;
    },
    []
  );

  const handleMousemove = useCallback(
    (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - scrollWrapper.current.offsetLeft;
      const walk = x - startX.current;
      scrollWrapper.current.scrollLeft = scrollLeft.current - walk;
    },
    []
  );

  useEffect(() => {
    const currentScrollWrapper = scrollWrapper.current;
    itemsWrapper.current.querySelectorAll('.the-best-hotels-item').forEach((element) => {
      itemElementArray.current.push(element);
    });

    animate();
    currentScrollWrapper.addEventListener('mousedown', handleMousedown);
    currentScrollWrapper.addEventListener('mouseleave', handleMouseleave);
    currentScrollWrapper.addEventListener('mouseup', handleMouseup);
    currentScrollWrapper.addEventListener('mousemove', handleMousemove);

    return () => {
      window.cancelAnimationFrame(animationFrameRequestID.current);
      currentScrollWrapper.removeEventListener('mousedown', handleMousedown);
      currentScrollWrapper.removeEventListener('mouseleave', handleMouseleave);
      currentScrollWrapper.removeEventListener('mouseup', handleMouseup);
      currentScrollWrapper.removeEventListener('mousemove', handleMousemove);
    };
  }, [animate, handleMousedown, handleMouseleave, handleMousemove, handleMouseup]);

  return <>
    <Wrapper>

      <Heading className="simple-animate-in">{parse(content.title)}{isDragging.current}</Heading>

      <ScrollWrapper ref={scrollWrapper}>
        <ItemsWrapper ref={itemsWrapper} className="simple-animate-in" isDragging={isDragging.current}>
          <Items>
            {content.items.map(
              (item, index) =>
                <Item key={index} className="the-best-hotels-item">
                  <Hotel image={item.image}>
                    <div className="details">
                      <h4>{item.name}</h4>
                      <p>{item.location}</p>
                    </div>
                    <Rating rating={item.rating} />
                  </Hotel>
                </Item>
            )}

          </Items>
        </ItemsWrapper>
      </ScrollWrapper>

      <CTAWrapper className="simple-animate-in">
        {content.text &&
          <p>{content.text}</p>
        }
        {content?.cta?.label &&
          <CTA secondary to={content.cta.to} href={content.cta.link}>
            {content.cta.label}
          </CTA>
        }
      </CTAWrapper>

    </Wrapper>
  </>;

}

export default TheBestHotels;

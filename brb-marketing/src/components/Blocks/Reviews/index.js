import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import parse from 'html-react-parser';

import CTA from '../../CTAsmall';

import Colors, { rgba } from '../../../themes/Colors';
import Metrics from '../../../themes/Metrics';
import Decorations from '../../../themes/Decorations';

import ratingStarFullRed from '../../../images/icons/ratingStarFullRed.svg';
import Breakpoints from '../../../themes/Breakpoints';
import Timings from '../../../themes/Timings';

// Fallback settings and content (prefers Contentful query)
const defaults = {

  title: "It’s travel as you like it, we just <strong>sort it.</strong>",
  text: "We love what we do and it shows in our reviews.",

  cta: {
    to: "/reviews",
    label: "Read more TrustPilot reviews",
  },

  items: [
    {
      name: "Kate",
      rating: 5,
      title: "So much fun!",
      text: "Firstly I loved that brb agreed to combine two trips into one and booking it even though the website said no availability! Always best to give the guys a call! COVID19 impacted our travel and it was amazing to finally get away. The surprise element is so fun and waiting for the post card makes it even more exciting!",
    },
    {
      name: "Tyler",
      rating: 5,
      title: "Great idea and would highly recommend!",
      text: "I was recommended this by a friend. It is such a great idea and takes away the stress of finding somewhere and planning. Myself and a friend had an amazing time and would highly recommend!",
    },
    {
      name: "Chris",
      rating: 5,
      title: "Excellent Customer Service",
      text: "Over the last few weeks the staff at BRB have responded fast and efficiently to every query that we have emailed them, (even on a Sunday) and managed to resolve all of my concerns. It is a shame that other companies in the travel market are not as helpful.",
    },
    {
      name: "Lyd",
      rating: 5,
      title: "A great idea made perfect by great service",
      text: "Where do I start? First of all the BRB travel company is a fantastic idea ― You pay £49.99 a month (as a single person, it works out a little cheaper as a couple) and they send you away in Europe three times a year. You can highlight places you’d love to go, you can exclude places you have no interest in. A month before your trip you find out where you’re going by a lovely, well presented, handwritten postcard. The postcard details places to eat or see that the brb team recommend. A great touch!",
    },
    {
      name: "Joe",
      rating: 5,
      title: "We had a great trip",
      text: "We had a great trip. The team are very responsive and all in all the trip went very smoothly.",
    },
  ],

};

const Wrapper = styled.div`
  min-height: calc(100vh - ${Metrics.navHeight});
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.darkBlue};
  color: ${Colors.white};
  padding: ${Metrics.bigSpacer} 0;
  overflow: hidden;

  &:before, &:after {
    content: '';
    display: block;
    position: absolute;
    background-image: linear-gradient(to bottom, ${rgba(Colors.black, .5)}, transparent);
    width: 100%;
    height: ${Metrics.smallSpacer};
    left: 0;
    top: 0;
    z-index: 100;
    pointer-events: none;
  }

  &:after {
    transform: rotate(180deg);
    top: auto;
    bottom: 0;
  }

  @media (min-width: ${Breakpoints.medium}) {
    flex-direction: row;
    padding: 0;
    height: 0; // Triggers flex-grow;
  }
`;

const ContentPanel = styled.div`
  padding: 0 ${Metrics.smallSpacer};

  h2 {
    font-size: 2.5rem;
    max-width: 400px;
    margin: 0 0 ${Metrics.bigSpacer};

    strong, em, span {
      font-weight: inherit;
      color: ${Colors.red};
    }
  }

  h3 {
    color: ${Colors.red};
    font-size: 1.5rem;
    font-weight: 700;
    max-width: 400px;
    margin: auto 0 ${Metrics.smallSpacer} 0;
  }

  @media (min-width: ${Breakpoints.medium}) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: stretch;
    padding: ${Metrics.bigSpacer};
    flex-basis: 50%;

    h2 {
      font-size: 3rem;
    }
  }
`;

const ReviewsPanel = styled.div`
  position: relative;
  overflow: hidden;
  width: 100vw;

  @media (min-width: ${Breakpoints.medium}) {
    padding: 0 ${Metrics.smallSpacer};
    margin: 0;
    height: 100%;
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-basis: 50%;
    flex-grow: 1;
    flex-shrink: 1;
  }
`;

const ReviewsWrapper = styled.div`
  width: 100%;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { width: 0 !important; height: 0 !important; }

  @media (min-width: ${Breakpoints.medium}) {
    max-height: 100%;
    width: auto;
  }
`;

const ReviewsInnerWrapper = styled.div`
  width: max-content;
  display: flex;
  flex-direction: row;
  padding: ${Metrics.tinySpacer};
  margin: ${Metrics.smallSpacer} 0;

  @media (min-width: ${Breakpoints.medium}) {
    padding: ${Metrics.bigSpacer} 0;
    margin: 0;
    flex-direction: column;
    width: 100%;
    height: max-content;
  }
`;

const Review = styled.div`
  width: 90%;
  max-width: 20rem;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  font-weight: 300;
  margin: 0 ${Metrics.tinySpacer} 0 0;
  padding: ${Metrics.tinySpacer};
  color: ${Colors.black};
  background-color: ${Colors.white};
  overflow: hidden;
  height: 8rem;
  box-shadow: ${Decorations.shadow.heavy};
  cursor: pointer;
  transition: transform ${Timings.transition.fast} ease-in-out;
  user-select: none;

  &:hover {
    transform: translateY(-2px);
  }

  &:last-child {
    margin: 0;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(to top, ${Colors.white} 10%, ${rgba(Colors.white, 0)});
    width: 100%;
    height: 2rem;
  }

  h4, h5, p {
    margin: 0 0 4px;
  }

  h4 {
    font-size: 1.2rem;
    text-transform: uppercase;
  }

  h5 {
    font-size: 1rem;
    font-weight: 700;
  }

  p {
    font-size: .75rem;
    line-height: 1.4
  }

  @media (min-width: ${Breakpoints.medium}) {
    width: 100%;
    max-width: 25rem;
    margin: 0 0 ${Metrics.tinySpacer};
  }
`;

const Rating = styled.div`
  position: ${(props) => props.inline ? 'static' : 'absolute'};
  display: flex;
  flex-direction: row;
  top: ${Metrics.tinySpacer};
  right: ${Metrics.tinySpacer};

  img {
    display: block;
    width: .75rem;
    height: .75rem;
    margin: 0 1px 0;

    @media (min-width: ${Breakpoints.medium}) {
      width: 1.25rem;
      height: 1.25rem;
      margin: -2px 2px 0;
    }
  }
`;

// Modal components duplicated and adapted from destinations page
// TODO: Centralise?!

const Modal = styled.div`
  display: ${(props) => props.active ? 'flex' : 'none'};
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: ${rgba(Colors.black, .5)};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
`;

const flyIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0) skew(50deg);
  }
`;

const ModalContainer = styled.div`
  width: 100%;
  max-width: 620px;
  max-height: 80vh;
  background-color: ${Colors.white};
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: ${Decorations.shadow.default};
  animation: ${flyIn} ${Timings.animation.fast} 1 ease-out;

  h4 {
    font-size: ${Metrics.smallSpacer};
    text-transform: uppercase;
    margin: 0;
  }

  h5 {
    font-size: ${Metrics.tinySpacer};
    margin: 0 0 ${Metrics.tinySpacer};
  }

  p {
    font-size: 18px;
    line-height: 1.35;
    color: ${Colors.darkGrey};
  }
`;

const ModalContentWrapper = styled.div`
  padding: ${Metrics.smallSpacer};
  height: auto;
  overflow-y: auto;
`;

const ModalContent = styled.div`
  position: relative;
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
  transition: background-color ${Timings.transition.default} ease-in-out;

  &:hover {
    background-color: ${Colors.lightGrey};
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
          link
          to
          target
          type
        }
        items {
          name
          rating
          title
          text
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

    return configurationItem.data;
  };

  const queryResult = useStaticQuery(query);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const content = { ...defaults };
  if (queryResult.allContentfulConfigurationItem) {
    const processedData = processQueryResult(queryResult);
    Object.assign(content, processedData);
  }

  const openModal = (reviewItem) => {
    setModalOpen(true);
    setModalContent(reviewItem);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return <>
    <Wrapper>

      <ContentPanel>
        <h2 className="simple-animate-in">{parse(content.title)}</h2>
        <h3 className="simple-animate-in">{parse(content.text)}</h3>
        {content?.cta?.label &&
          <CTA className="simple-animate-in" secondary to={content.cta.to} href={content.cta.link} target={content.cta.target}>
            {content.cta.label}
          </CTA>
        }
      </ContentPanel>

      <ReviewsPanel>
        <ReviewsWrapper>
          <ReviewsInnerWrapper className="simple-animate-in">
            {content.items.map((item, index) =>
              <Review key={index} onClick={() => { openModal(item) }}>
                <Rating rating={item.rating}>
                  {[...new Array(item.rating)].map((_, index) =>
                    <img key={index} src={ratingStarFullRed} alt="" />
                  )}
                </Rating>
                <h4>{item.name}</h4>
                <h5>{item.title}</h5>
                <p>{item.text}</p>
              </Review>
            )}
          </ReviewsInnerWrapper>
        </ReviewsWrapper>
      </ReviewsPanel>

    </Wrapper>

    {modalOpen &&
      <Modal active={modalOpen} onClick={closeModal}>
        <ModalContainer onClick={(e) => { e.preventDefault(); e.stopPropagation() }}>
          <ModalContentWrapper>
            <ModalContent>
              <h4>{modalContent.name || 'Name'}</h4>
              <h5>{modalContent.title || 'Title'}</h5>
              <Rating inline rating={modalContent.rating || 0}>
                {[...new Array(modalContent.rating || 0)].map((_, index) =>
                  <img key={index} src={ratingStarFullRed} alt="" />
                )}
              </Rating>
              <p>{parse(modalContent.text || 'Review copy')}</p>
            </ModalContent>
          </ModalContentWrapper>
          <Button onClick={closeModal} tabIndex="0">
            Close
          </Button>
        </ModalContainer>
      </Modal>
    }


  </>;

}

export default TravelPlanning;

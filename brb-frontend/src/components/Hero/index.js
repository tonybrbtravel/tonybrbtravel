import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import { Link, useHistory } from 'react-router-dom';

import CTA from '../CTAsmall';
import Button from '../Button';

import Colors, { rgba } from '../../themes/Colors';
import Metrics, { unitless } from '../../themes/Metrics';
import Decorations from '../../themes/Decorations';
import Breakpoints from '../../themes/Breakpoints';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  //padding: ${Metrics.tinySpacer};
  min-height: 100vh;
  color: ${Colors.white};

  @media (min-width: ${Breakpoints.medium}) {
    //padding: ${Metrics.tinySpacer} ${Metrics.bigSpacer};
  }
`;

const MediaHolder = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  height: 60%;

  video, img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    object-fit: cover;
    filter: contrast(.9) saturate(.6);
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    background-image:
      linear-gradient( to top,
        ${rgba(Colors.black, 0.25)},
        ${rgba(Colors.black, 0.1)} 60%,
        ${rgba(Colors.black, 0.1)} 60%,
        ${rgba(Colors.black, 0.5)}
      ),
      linear-gradient( to bottom,
        ${rgba(Colors.lightGrey, 0.1)},
        ${rgba(Colors.lightGrey, 0)} 80%
      );
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const ContentHolder = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  z-index: 1;
  //padding-top: ${Metrics.massiveSpacer};
  width: 70%;
  padding: 20px 20px 20px 20px;
  margin: auto;
  margin-top: 100px;
  background: #FFFFFF;

  .text {
    font-size: 2rem;
    text-shadow: ${Decorations.shadow.default};

    h1 {
      font-size: 3rem;
      line-height: 1.1em;
      margin: 0;
    }

    strong {
      font-weight: inherit;
      color: ${Colors.red};
    }

    p.hero-text {
      font-size: 1.2rem;
      font-weight: 400;
      max-width: 20em;
    }
  }

  .logos {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: ${Metrics.hugeSpacer};

    img {
      height: 4rem;
      width: auto;
    }

    img + img {
      margin-left: ${Metrics.smallSpacer};
    }
  }

  @media (min-width: ${Breakpoints.small}) {
    .text {
      p.hero-text {
        font-size: 1.8rem;
      }
    }
  }

  @media (min-width: ${Breakpoints.medium}) {
    flex-direction: row;
    align-items: flex-end;

    .text {
      max-width: ${(props) => (props.hasLogos ? '60vw' : '75vw')};
      font-size: 3.5vw;

      h1 {
        font-size: 4rem;
      }
    }

    .logos {
      margin-left: auto;
      margin-top: 0;
      padding-left: ${Metrics.smallSpacer};
    }

  }

  @media (min-width: ${Breakpoints.large}) {

    .text {
      h1 {
        font-size: 8vw;
        text-shadow: 0 0 10px ${rgba(Colors.black, 0.1)};
      }
    }

  }
`;

const Hero = ({
  title, text, image, video, onClick, videoSmall, cta, logos = [],
}) => {
  const [screenSize, setScreenSize] = useState('unknown');

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(
        window.innerWidth >= unitless(Breakpoints.medium) ? 'large' : 'small',
      );
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => { window.removeEventListener('resize', handleResize); };
  }, []);

  return (
    <Wrapper>

      {(image || video)
               && (
               <MediaHolder>
                 <img src={image} alt="" />
               </MediaHolder>
               )}

      <ContentHolder hasLogos={!!logos.length}>
        <h1>
          {title}
          {' '}
        </h1>
      </ContentHolder>

    </Wrapper>
  );
};

export default Hero;

import React from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';

import Colors, { rgba } from '../../themes/Colors';
import Metrics from '../../themes/Metrics';
import Decorations from '../../themes/Decorations';
import Breakpoints from '../../themes/Breakpoints';

const Wrapper = styled.div`
  position: relative;
  background-size: cover;
  background-position: center center;
  background-image: ${(props) => props.image ? `url(${props.image})` : 'none'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  flex-basis: ${(props) => props.split ? `${props.split}%` : '0'};
  padding: ${Metrics.smallSpacer} ${Metrics.bigSpacer};

  &:after {
    content: ${(props) => (props.image && props.wash) ? '""' : 'none'};
    background-color: ${rgba(Colors.darkBlue, .6)};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  h2 {
    font-size: 2.5rem;
    text-align: center;
    font-weight: 700;
    z-index: 1;

    color: ${(props) => props.image ? Colors.white : Colors.black};
    text-shadow: ${(props) => props.image ? Decorations.shadow.default : 'none'};

    span, em, strong {
      color: ${Colors.red};
      font-style: inherit;
      font-weight: inherit;
    }

    @media (min-width: ${Breakpoints.medium}) {
      font-size: 3rem;
      text-align: left;
    }

  }
`;

const Sidekick = ({title, text, image, cta, split, wash = true}) => {
  return <Wrapper split={split} image={image} wash={wash}>
    <h2>{parse(title)}</h2>
  </Wrapper>
};

export default Sidekick;

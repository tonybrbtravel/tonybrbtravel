import React from 'react';
import styled from 'styled-components';

import Calendar from './Decorations/Calendar';
import Destinations from './Decorations/Destinations';
import AboutYou from './Decorations/AboutYou';
import Postcard from './Decorations/Postcard';

import Breakpoints from '../../../themes/Breakpoints';

const mapping = {
  "about-you": AboutYou,
  "calendar": Calendar,
  "destinations": Destinations,
  "postcard": Postcard,
};

const DecorationWrapper = styled.div`
  position: relative;
  display: flex;
  padding: 0;

  @media (min-width: ${Breakpoints.medium}) {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
`;

const Decoration = ({type, data}) => {

  if (!type || type === 'none' || mapping[type] === undefined) {
    return null;
  }

  const Contents = mapping[type];

  return <DecorationWrapper>
    <Contents data={data}/>
  </DecorationWrapper>
};

export default Decoration;

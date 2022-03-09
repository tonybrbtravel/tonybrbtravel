import React from 'react';import styled from 'styled-components';

import Colors, { rgba } from '../../../themes/Colors';
import Metrics from '../../../themes/Metrics';

const Wrapper = styled.div`
  background-color: ${Colors.offWhite};
  background-image: linear-gradient(35deg, ${rgba(Colors.white, .3)}, ${rgba(Colors.black, .3)});
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: ${Metrics.bigSpacer};
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  max-width: 400px;
`;

const Placeholder = ({title}) => {

  return <>
    <Wrapper>
      <Heading>{title}</Heading>
    </Wrapper>
  </>;

}

export default Placeholder;

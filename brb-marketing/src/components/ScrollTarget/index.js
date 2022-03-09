import React from 'react';
import styled from 'styled-components';

import Metrics from '../../themes/Metrics';

const Wrapper = styled.div`
  position: relative;
  height: 0;
  overflow: hidden;
  top: -${Metrics.navHeight};
`;

const ScrollTarget = ({id}) => <Wrapper id={id} />

export default ScrollTarget;

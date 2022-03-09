/**
 *
 * LoadingSpinner
 *
 */

import React from 'react';
import styled from 'styled-components';
import Colors from '../../themes/Colors';
import { rotate } from '../../themes/animations';

const Loader = styled.div`
  width: ${(props) => (props.small ? '20px' : '40px')};
  height: ${(props) => (props.small ? '20px' : '40px')};
  margin: ${(props) => (props.small ? '0 auto' : '60px auto')};
  border: ${(props) => (props.small ? '3px solid white' : `8px solid ${Colors.red}`)};
  border-top: ${(props) => (props.small
    ? `3px solid ${Colors.redDark}`
    : `8px solid ${Colors.redDark}`)};
  border-radius: 30px;
  animation: ${rotate} infinite 0.8s ease-in-out forwards;
`;

// TODO: Fix import issue in Btn component
function LoadingSpinner(props) {
  return <Loader small={props.small} />;
}

export default LoadingSpinner;

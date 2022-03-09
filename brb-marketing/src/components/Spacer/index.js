/**
 *
 * Spacer
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Div = styled.div`
    height: ${(props) => props.mobileHeight || props.height};

    @media screen and (min-width: 500px) {
      height: ${(props) => props.height};
    }
  `;
function Spacer({ height, mobileHeight }) {
  return <Div height={height} mobileHeight={mobileHeight}>
    &nbsp;
  </Div>;
}

Spacer.propTypes = {
  height: PropTypes.string,
  mobileHeight: PropTypes.string,
};

export default Spacer;

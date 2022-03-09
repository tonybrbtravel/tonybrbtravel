/**
 *
 * BigNumber
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function BigNumber(props) {
  return (
    <Div color={props.color}>
      <img src={props.icon} alt="" />
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
  max-height: 300px;

  img {
    width: 100%;
    height: 100%;
    max-height: 200px;
    object-fit: contain;
    object-position: center;
  }
`;

BigNumber.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
};

export default BigNumber;

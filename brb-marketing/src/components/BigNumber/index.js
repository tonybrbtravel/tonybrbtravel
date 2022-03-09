/**
 *
 * BigNumber
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function BigNumber(props) {
  return <Div color={props.color}>{props.value}</Div>;
}

const Div = styled.div`
  color: ${(props) => (props.color ? props.color : 'inherit')};
  width: 78px;
  height: 78px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-bottom: 20px;
  border-radius: 100px;
  border: ${(props) =>
    props.color ? `2px solid ${props.color}` : '2px solid #fff'};
  font-size: 36px;
  font-weight: 900;
`;

BigNumber.propTypes = {
  value: PropTypes.any,
  color: PropTypes.string,
};

export default BigNumber;

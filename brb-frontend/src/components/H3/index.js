/**
 *
 * H1
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class H3 extends React.Component {
  render() {
    return <Div {...this.props}>{this.props.children}</Div>;
  }
}

const Div = styled.h3`
  margin: 0;
  text-align: left;
  font-size: 24px;
  line-height: 32px;
  padding: 0;
  margin-bottom: ${(props) => (props.withBorder ? '12px' : '0')};
  padding-bottom: ${(props) => (props.withBorder ? '6px' : '6px')};
  border-bottom: ${(props) => (props.withBorder ? '1px solid black' : 'none')};
  letter-spacing: -1px;

  @media screen and (min-width: 600px) {
    font-size: 34px;
    line-height: 38px;
    margin-bottom: 22px;
  }
`;

H3.propTypes = {
  children: PropTypes.any,
};

export default H3;

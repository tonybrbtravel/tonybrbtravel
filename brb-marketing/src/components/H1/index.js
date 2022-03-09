/**
 *
 * H1
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class H1 extends React.Component {
  render() {
    return <Div {...this.props}>{this.props.children}</Div>;
  }
}

const Div = styled.h1`
  margin: 0;
  text-align: center;
  font-size: 42px;
  line-height: 42px;
  margin-bottom: 18px;
  letter-spacing: -3px;
  padding: 0px 20px;

  @media screen and (min-width: 600px) {
    font-size: 64px;
    line-height: 61px;
    margin-bottom: 22px;
  }
`;

H1.propTypes = {
  children: PropTypes.any,
};

export default H1;

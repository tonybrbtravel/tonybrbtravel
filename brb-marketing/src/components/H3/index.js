/**
 *
 * H1
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../themes/Colors';

class H3 extends React.Component {
  render() {
    return <Div {...this.props}>{this.props.children}</Div>;
  }
}

const Div = styled.h3`
  margin: 0;
  text-align: left;
  font-size: 22px;
  line-height: 28px;
  padding: 0;
  margin-bottom: ${(props) => (props.withBorder ? '12px' : '0')};
  padding-bottom: ${(props) => (props.withBorder ? '6px' : '6px')};
  border-bottom: ${(props) => (props.withBorder ? '1px solid black' : 'none')};
  letter-spacing: -1px;

  span, em, strong {
    color: ${Colors.red};
  }

  @media screen and (min-width: 600px) {
    font-size: 28px;
    line-height: 32px;
    margin-bottom: 22px;
  }
`;

H3.propTypes = {
  children: PropTypes.any,
};

export default H3;

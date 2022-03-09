/**
 *
 * Button
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Colors from '../../themes/Colors'

class Button extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { href, to, secondary } = this.props
    if (href) {
      return (
        <a href={href}>
          <Btn secondary={secondary}>{this.props.children}</Btn>
        </a>
      )
    }
    return (
      <Link to={to}>
        <Btn secondary={secondary}>{this.props.children}</Btn>
      </Link>
    )
  }
}

// TODO: Add disabled style
const Btn = styled.p`
  background-color: ${props => (props.secondary ? 'transparent' : Colors.red)};
  color: ${props => (props.secondary ? Colors.red : Colors.white)};
  border-width: ${props => (props.secondary ? '2px' : 0)};
  border-style: ${props => (props.secondary ? 'solid' : 'none')};

  font-size: 18px;
  line-height: 18px;
  border-radius: 6px;
  padding: 20px;
  transition: background-color 0.1s;
  display: block;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  @media screen and (min-width: 600px) {
    font-size: 22px;
    line-height: 22px;
  }
`

Button.propTypes = {
  children: PropTypes.any,
  href: PropTypes.string,
  to: PropTypes.string,
  secondary: PropTypes.bool,
}

export default Button

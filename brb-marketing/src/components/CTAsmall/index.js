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
import Breakpoints from '../../themes/Breakpoints'

class Button extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    if (this.props.href) {
      return (
        <a href={this.props.href} target={this.props.target} className={this.props.className}>
          <Btn secondary={this.props.secondary} hideOnMobile={this.props.hideOnMobile} hideOnDesktop={this.props.hideOnDesktop}>{this.props.children}</Btn>
        </a>
      )
    }
    return (
      <Link to={this.props.to} className={this.props.className}>
        <Btn secondary={this.props.secondary} hideOnMobile={this.props.hideOnMobile} hideOnDesktop={this.props.hideOnDesktop}>{this.props.children}</Btn>
      </Link>
    )
  }
}

// TODO: Add disabled style
const Btn = styled.p`
  position: relative;
  background-color: ${props => (props.secondary ? 'transparent' : Colors.red)};
  color: ${props => (props.secondary ? Colors.red : Colors.white)};
  border-width: ${props => (props.secondary ? '2px' : 0)};
  border-style: ${props => (props.secondary ? 'solid' : 'none')};
  font-size: 16px;
  line-height: 16px;
  border-radius: 3px;
  padding: 12px 20px;
  transition: background-color 0.1s;
  display: block;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin: 0;
  display: ${(props) => props.hideOnMobile ? 'none' : 'inline-block'};

  &:hover {
    transform: scale(1.05);
  }

  @media screen and (min-width: ${Breakpoints.medium}) {
    font-size: 16px;
    line-height: 16px;
    display: ${(props) => props.hideOnDesktop ? 'none' : 'inline-block'};
  }
`

Button.propTypes = {
  children: PropTypes.any,
  href: PropTypes.string,
  secondary: PropTypes.bool,
}

export default Button

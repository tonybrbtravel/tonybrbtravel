/**
 *
 * Nav
 *
 */

import React from 'react'
import styled from 'styled-components'

import logo from '../../images/logo.svg'
import Colors from '../../themes/Colors'

const Fixed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  padding: 12px 20px;
  background-color: white;
  box-shadow: 0 2px 15px 0 rgba(147,147,147,0.20);
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transform: ${(props) => props.active ? 'translateY(0px)' : 'translateY(-120px)'};
  transition: transform 0.3s ease-in-out;
`;

const Logo = styled.img``;

const Ul = styled.ul`
  list-style: none;

  li {
    display: inline-block;
    margin: 0 6px;
  }

  a {
    padding: 12px;
    border: 1px solid rgba(0,0,0, 0.2);
    border-radius: 3px;
  }

  a.primary {
    background-color: ${Colors.red};
    border: none;
    color: white;
  }
`;

// eslint-disable-next-line react/prefer-stateless-function
class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = { windowHeight: 9999, active: false }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.calculateScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.calculateScroll);
  }

  calculateWindowHeight = () => {
    this.setState({ windowHeight: window.innerHeight });
  }

  calculateScroll = () => {
    this.calculateWindowHeight();
    if (window.scrollY > this.state.windowHeight) {
      this.setState({ active: true });
    } else {
      this.setState({ active: false });
    }
  }

  render() {
    return (
      <Fixed active={this.state.active}>
        <Logo src={logo} alt="BeRightBack" title="BRB" />
          <Ul>
            <li><a href="https://app1.berightback.travel/signin">Log in</a></li>
            <li><a className="primary" href="https://app1.berightback.travel/signup">Sign up</a></li>
          </Ul>
      </Fixed>
    )
  }
}

export default Nav

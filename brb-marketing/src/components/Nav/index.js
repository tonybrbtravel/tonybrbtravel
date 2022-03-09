/**
 *
 * Nav
 *
 */

import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import logo from '../../images/logo.svg'
import MobileMenu from './MobileMenu'
import Colors from '../../themes/Colors'
import Breakpoints from '../../themes/Breakpoints'
import Decorations from '../../themes/Decorations'
import Timings from '../../themes/Timings'
import Metrics from '../../themes/Metrics'

const Fixed = styled.nav`
  display: flex;
  width: 100%;
  padding: 12px 12px 12px 18px;
  background-color: transparent;
  color: ${Colors.white};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9100;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  transform: translateY(0px);
  transition:
    color ${Timings.transition.default} ease-in-out,
    background-color ${Timings.transition.default} ease-in-out,
    box-shadow ${Timings.transition.default} ease-in-out;

  img {
    width: auto;
    height: 42px;
  }

  &.solid {
    color: ${Colors.black};
    background-color: ${Colors.white};
    box-shadow: ${Decorations.shadow.light};
  }
`

const TextLink = styled(Link)`
  margin-left: 22px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const TextAnchor = styled.a`
  color: ${props => (props.btn ? (props.secondary ? 'currentColor' : Colors.white) : 'inherit')};
  background-color: ${props => (props.btn ? (props.secondary ? 'transparent' : Colors.red) : '')};
  border-color: ${props => (props.btn ? (props.secondary ? 'currentColor' : Colors.red) : '')};
  border-style: solid;
  border-width: 1.5px;
  padding: ${props => (props.btn ? '8px 16px' : '')};
  border-radius: ${props => (props.btn ? '2px' : '')};
  margin-left: ${Metrics.tinySpacer};
  font-size: 14px;
  display: ${(props) => props.hideOnExtraSmall ? 'none' : 'inline'};
  transition: box-shadow ${Timings.transition.default} ease-in-out;
  cursor: pointer;

  &:hover {
    text-decoration: ${props => (props.btn ? '' : 'underline')};
    box-shadow: ${(props) => props.btn ? Decorations.shadow.default : 'none'};
  }

  @media screen and (min-width: ${Breakpoints.small}) {
    display: inline;
  }
`

const Block = styled.div`
  display: flex;
  align-items: center;
`

const Wrapper = styled.div`
  position: ${(props) => props.startNavTransparent ? 'absolute' : 'static'};
  height: 70px;
  margin-top: 0px;
`

const HamburgerMenu = styled.div`
  position: relative;
  color: ${(props) => props.open ? Colors.red : 'inherit'};
  width: ${(props) => props.open ? '0' : '30px'};
  transition: width ${Timings.transition.default} ease-in-out;

  &, &::before, &::after {
    height: 3px;
    background-color: currentColor;
  }

  &::before, &::after {
    width: 30px;
    position: absolute;
    content: '';
    top: ${(props) => props.open ? '0' : '-8px'};
    transform: ${(props) => props.open ? 'rotate(45deg)' : 'none'};
    transition:
      top ${Timings.transition.default} ease-in-out,
      transform ${Timings.transition.default} ease-in-out;
  }

  &::after {
    top: ${(props) => props.open ? '0' : '8px'};
    transform: ${(props) => props.open ? 'rotate(135deg)' : 'none'};
  }
`

const HamburgerWrapper = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${Metrics.smallSpacer};

  &:hover {
    cursor: pointer;
  }

  @media screen and (min-width: ${Breakpoints.medium}) {
    display: none;
  }
`

const PageLinks = styled.div`
  display: none;

  @media screen and (min-width: ${Breakpoints.medium}) {
    display: block;
  }
`

// eslint-disable-next-line react/prefer-stateless-function
class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: false,
      isScrolled: false,
      siteMode: props.siteMode || 'default',
    }

    this.handleMenu = this.handleMenu.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleMenu() {
    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen,
    }))
  }

  handleScroll() {
    const scrollTop = (window.pageYOffset !== undefined) ?
      window.pageYOffset :
      (document.documentElement || document.body.parentNode || document.body).scrollTop;
    this.setState({ isScrolled: scrollTop > 100 });
  }

  handleMenuClick() {
    this.setState({ isMenuOpen: false })
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll, { passive: true });
  }

  render() {

    const siteMode = this.state.siteMode;

    const cta1 = {
      label: this.props.navCtas?.navCta1?.label || 'Sign in',
      link: this.props.navCtas?.navCta1?.link || 'https://app1.berightback.travel/signin',
      active: this.props.navCtas?.navCta1?.active ?? true,
    };

    const cta2 = {
      label: this.props.navCtas?.navCta2?.label || 'Sign up',
      link: this.props.navCtas?.navCta2?.link || 'https://app1.berightback.travel/signup',
      link: this.props.navCtas?.navCta2?.link || 'https://app1.berightback.travel/signup/',
      active: this.props.navCtas?.navCta2?.active ?? true,
    };

    return (
      <Wrapper startNavTransparent={this.props.startNavTransparent}>
        <Fixed className={(!this.props.startNavTransparent || this.state.isScrolled || this.state.isMenuOpen) ? 'solid' : ''}>

          <Block>
            <Link to="/#">
              <img src={logo} alt="Be Right Back Logo" />
            </Link>
            {siteMode === 'default' &&
              <PageLinks>
                <TextLink to="/#how-it-works">How it works</TextLink>
                <TextLink to="/destinations/">Destinations</TextLink>
                <TextLink to="/#reviews">Reviews</TextLink>
                <TextLink to="/pricing/">Pricing</TextLink>
                <TextLink to="/journal/">Journal</TextLink>
              </PageLinks>
            }
            {siteMode === 'corporate' &&
              <PageLinks>
                <TextLink to="/employee-benefits/#how-it-works">How it works</TextLink>
                <TextLink to="/destinations/">Destinations</TextLink>
                <TextLink to="/employee-benefits/#pricing">Pricing</TextLink>
              </PageLinks>
            }
          </Block>

          <Block>
            <TextAnchor btn hideOnExtraSmall secondary href={cta1.link}>
              {cta1.label}
            </TextAnchor>

            <TextAnchor btn href={cta2.link}>
              {cta2.label}
            </TextAnchor>

            <HamburgerWrapper onClick={this.handleMenu}>
              <HamburgerMenu open={this.state.isMenuOpen} />
            </HamburgerWrapper>

          </Block>

        </Fixed>

        <MobileMenu
          isActive={this.state.isMenuOpen}
          handleClick={this.handleMenuClick}
          siteMode={siteMode}
          cta1={cta1}
          cta2={cta2}
        />
      </Wrapper>
    )
  }
}

export default Nav

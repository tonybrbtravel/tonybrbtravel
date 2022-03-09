/**
 *
 * GridScroll
 *
 */

import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import Colors from '../../themes/Colors'
import Breakpoints from '../../themes/Breakpoints'

const Container = styled.div`
  background-position: center;
  background-size: cover;
  overflow: hidden;
  width: 100%;
  scroll-snap-align: center;
  height: 200px;
  color: white;
  font-size: 14px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s, box-shadow 0.2s;
  pointer-events: all;
  overflow: hidden;
  cursor: pointer;

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${Colors.red};
    opacity: 0;
    transition: opacity .2s;
  }

  &:hover {
    transform: scale(1.01);
    box-shadow: 4px 4px 16px rgba(0, 0, 0, .5);

    &:after {
      opacity: .25;
    }
  }

  @media screen and (min-width: ${Breakpoints.medium}) {
    height: 360px;
  }
`

const Image = styled(Img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  position: relative;
  &::after {
    display: block;
    position: absolute;
    content: '';
    width: 100%;
    height: 143px;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0)
    );
    top: 0;
    left: 0;
  }

  &::before {
    display: block;
    position: absolute;
    content: '';
    width: 100%;
    height: 143px;
    z-index: 20;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
    bottom: 0;
    left: 0;
  }
`

const Location = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 20;
  text-transform: uppercase;
  opacity: 0.75;
  letter-spacing: 2px;
`
const City = styled.div`
  font-size: 24px;
`

const Bottom = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 20;
  padding-right: 20px;
`

function LocationBlock(props) {
  const { city, country, byline, fluid, toggled, onClick } = props
  return (
    <Container className="simple-animate-in" toggled={toggled} onClick={onClick}>
      <Image fluid={fluid} />
      <div>
        <Location>{country}</Location>
      </div>
      <Bottom>
        <City>{city}</City>
        <div>{byline}</div>
      </Bottom>
    </Container>
  )
}

LocationBlock.propTypes = {}

export default LocationBlock

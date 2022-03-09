/**
 *
 * GridScroll
 *
 */

import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  scroll-snap-align: center;
  height: 440px;
  color: white;
  font-size: 14px;
  border-radius: 6px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s, opacity 0.1s;
  pointer-events: all;
  overflow: hidden;
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

const Top = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 260px;
  display: flex;
  justify-content: space-between;
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
`

function LocationBlock(props) {
  const { hotelName, city, img, stars, tripAdvisorId } = props
  const star = ['★', '☆']
  const difference = 5 - stars
  return (
    <Container>
      <Image sizes={img} />
      <Top>
        <div>{city}</div>
        <div>
          {star[0].repeat(parseInt(stars, 16))}
          {star[1].repeat(difference)}
        </div>
      </Top>
      <Bottom>
        <City>{hotelName}</City>
        <div>
          <a
            href={`https://www.tripadvisor.com/${tripAdvisorId}/`}
            target="_blank"
            rel="noreferrer noopener"
          >
            View on TripAdvisor
          </a>
        </div>
      </Bottom>
    </Container>
  )
}

LocationBlock.propTypes = {}

export default LocationBlock

/**
 *
 * GiftingHeader
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import CTA from '../../components/CTA'

import giftingBG from '../../images/giftingbg.jpg'
import giftingPlain from '../../images/giftingPlain.jpg'
import giftcard from '../../images/giftcard-cutout.png'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 400px;
  background: url(${giftingPlain}) no-repeat;
  background-size: cover;
  background-position: 95% 50%;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
  }

  @media screen and (min-width: 700px) {
    align-items: flex-start;
    background: url(${giftingBG}) no-repeat;
    background-size: cover;
    background-position: 95% 50%;
    padding-left: 40px;
    height: 90vh;

    img {
      display: none;
    }
  }
`

const Content = styled.div`
  padding-top: 120px;

  @media screen and (min-width: 700px) {
    padding-top: 0;
  }
`

const Title = styled.h1`
  font-size: 42px;
  letter-spacing: -1.97px;
  margin: 0;
  line-height: 42px;

  span {
    font-family: 'BrushUp';
    letter-spacing: 0;
    font-size: 72px;
    font-weight: 500;
    display: block;
    line-height: 72px;
    transform: rotate(-4deg) translateY(-0px);
  }
`
const CTAcontainer = styled.div`
  max-width: 300px;
  margin: auto;
`

function GiftingHeader(props) {
  const { ctaTrack } = props
  return (
    <Wrapper>
      <Content>
        <Title>
          A gift that lasts
          <br />
          <span>A lifetime</span>
        </Title>
        <CTAcontainer>
          <CTA to="/gifting/checkout" onClick={() => ctaTrack()}>
            Give the gift of travel
          </CTA>
        </CTAcontainer>
      </Content>
      <img src={giftcard} alt="giftcard" />
    </Wrapper>
  )
}

GiftingHeader.propTypes = {
  ctaTrack: PropTypes.func,
}

export default GiftingHeader

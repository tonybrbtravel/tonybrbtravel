/**
 *
 * Testimonials
 *
 */

import React from 'react'
import styled from 'styled-components'

import Testimonial from './Testimonial'
import Reviews from './reviews'
import trustpilotverified from '../../images/trustpilotverified.png'
import radialgradient from '../../images/radialgradient.png'

const Wrapper = styled.div`
  background-image: url('${radialgradient}');
  background-position: center top;
  background-repeat: no-repeat;
  padding: 24px 0 0 0;

  img {
    display: block;
    width: 113px;
    margin: 0 auto 16px auto;
  }
`

const TestimonialGrid = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr;

  @media screen and (min-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: 720px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`

const Testimonials = () => (
  <Wrapper>
    <a
      href="https://www.trustpilot.com/review/berightback.travel"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={trustpilotverified} alt="Trustpilot verified reviews" />
    </a>
    <TestimonialGrid>
      {Reviews.map(review => (
        <Testimonial key={review.author} review={review} />
      ))}
    </TestimonialGrid>
  </Wrapper>
)

export default Testimonials

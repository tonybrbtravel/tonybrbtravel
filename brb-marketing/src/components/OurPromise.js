/*
 * OurPromise
 */

import React from 'react'
import styled from 'styled-components'
import BodyContainer from './BodyContainer'
import HalfContainer from './HalfContainer'
import H2 from './H2'
import Colors from '../themes/Colors'

const P = styled.p`
  padding: 0 20px;
  font-size: 22px;
  color: #7f7f7f;
`

const Ul = styled.ul`
  padding: 0 20px;
  list-style-type: none;

  li {
    margin-bottom: 22px;
    position: relative;
    padding: 0 0 0 40px;

    &::before {
      color: ${Colors.red};
      content: '✓';
      display: block;
      position: absolute;
      left: 0px;
      top: 0px;
    }
  }
`

const OurPromise = () => (
  <div>
    <H2>Our Promise</H2>
    <BodyContainer flex>
      <HalfContainer style={{ alignSelf: 'flex-start' }}>
        <P>
          BRB is here to make your life easier, not harder. That’s why we’ve
          made managing your account simple. Unlike a gym, you can cancel at any
          time with no minimum commitment. Pay for what you use, get back what
          you don’t.
        </P>
      </HalfContainer>
      <HalfContainer>
        <Ul>
          <li>
            <strong>Get your money back</strong> - any money in your BRB account
            not committed to a trip is refundable at any time. Like a savings
            account for travel.
          </li>
          <li>
            <strong>Quality accommodation</strong> - you’ll stay in 3* + central
            accommodation. We’re picky about the hotels we choose and hand pick
            hotels with with at least a 3.5 rating on TripAdvisor.
          </li>
          <li>
            <strong>A new destination every time</strong> - our travel experts
            hand pick your trip, you have full control over your list of
            excluded destinations. We won’t send you to the same city twice,
            unless you want us to!
          </li>
        </Ul>
      </HalfContainer>
    </BodyContainer>
  </div>
)

export default OurPromise

/**
 *
 * ProductBox
 *
 */

import React from 'react'
import H2 from '../../components/H2'
import CTA from '../../components/CTA'
import { Link } from 'gatsby'
import { Wrapper, Block, Box, Desc, Price, Info, Checklist } from './styles'

function MarketingHomeHero() {
  return (
    <Wrapper>
      <Block>
        <H2>
          Turn your bucketlist
          <br /> into a checklist.
        </H2>
        <Link to="/how-it-works/">See how it works</Link>
      </Block>
      <Block>
        <Box>
          <Desc>3 trips a year from:</Desc>
          <Price>
            £199<span>/trip</span>
          </Price>
          <Info>4 payments of £49.99</Info>
          <Checklist>
            <li>Flights & hotel included</li>
            <li>Pick your dates</li>
            <li>Choose your break type</li>
            <li>3 star minimum accommodation</li>
            <li>3.5+ Trip Advisor ratings</li>
            <li>Exclude destinations</li>
          </Checklist>
          <CTA to="/sign-up/">Unlock your first trip</CTA>
        </Box>
      </Block>
    </Wrapper>
  )
}

MarketingHomeHero.propTypes = {}

export default MarketingHomeHero

/**
 *
 * Pricing
 *
 */

import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import H2 from '../../components/H2'
import CTA from '../../components/CTA'
import { CtaContainer } from '../HeroSection/styles'
import BodyContainer from '../../components/BodyContainer'
import Spacer from '../../components/Spacer'
import Metrics from '../../themes/Metrics'
import Colors from '../../themes/Colors'

const Grid = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  grid-gap: 12px;
  padding: 0 12px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  margin-top: 60px;
  justify-content: center;
  flex-direction: column;

  @media screen and (min-width: 600px) {
    flex-direction: row;
  }
`;

const Block = styled(Link)`
  color: black;
  background: white;
  border-radius: 6px;
  padding: 20px 30px;
  width: 100%;
  margin: 6px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 0px 10px rgba(0,0,50,0.15);

  @media screen and (min-width: 600px) {
    margin: 12px;
    max-width: 360px;
  }

  h2 {
    margin: 0 0 12px 0;
    font-size: 32px;
    letter-spacing: -1px;
  }

  div {
    bottom: 20px;
  }

  p {
    margin: 0 0 24px 0;
  }

  span {
    font-size: 28px;
    font-weight: 900;
    letter-spacing: -1px;
  }
`;

const Emoji = styled.p`
  font-size: 42px;
  margin: 18px 0 !important;

  @media screen and (min-width: 600px) {
    margin: 24px 0px !important;
    font-size: 60px;
  }

`;

const Ul = styled.ul`
  padding: 0 20px;
  margin: 20px 0;
  list-style-type: none;
  text-align: center;

  li {
    display: inline-block;
    padding: 0;
    margin: 0 12px 12px 12px;
  }
`;

class Pricing extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)

    this.state = {
      active: 1,
      points: ['3 day / 2 night breaks','Flights to and from your destination','3* and up accommodation','Choose your dates','Additional friends can join and pay separately','Get your money back on unused trips'
      ] }
    this.changeDisplay = this.changeDisplay.bind(this)
  }

  changeDisplay(value, plan) {
    this.setState({ active: value, plan: plan })
  }

  render() {
    return (
      <div>
        <H2>Your mini adventures<br /><span style={{color: Colors.red}}>start now</span>.</H2>
        <Grid>
          <Block to="/pricing">
            <Emoji><span role="img" aria-label="Emoji">💃</span></Emoji>
            <h2>Go Solo.</h2>
            <p>Perfect for solo travellers, or you know, people who don’t want to pay for someone else.</p>
            <p><span>£49.99</span> / month</p>
          </Block>
          <Block to="/pricing">
            <Emoji><span role="img" aria-label="Emoji">🤜🤛</span></Emoji>
            <h2>Go Together.</h2>
            <p>2 flights instead of one. Great for couples, but you don’t have to take the same person each time.</p>
            <p><span>£89.99</span> / month</p>
          </Block>
        </Grid>
        <BodyContainer flex>
          <Ul>
            {this.state.points.map(point => (
              <li key={point}>{point}</li>
            ))}
          </Ul>
        </BodyContainer>
        <Spacer height={Metrics.tinySpacer} />
        <CtaContainer>
          <CTA href="https://app1.berightback.travel/signup/">Create your free account</CTA>
        </CtaContainer>
      </div>
    )
  }
}

export default Pricing

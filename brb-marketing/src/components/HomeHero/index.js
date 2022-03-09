/**
 *
 * MarketingHomeHero
 *
 */

import React from 'react'
import BodyContainer from '../BodyContainer'

import { Wrapper, ContentWrapper, Title, P, CTAc } from './styles'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import styled from 'styled-components'

const Img = styled(Image)`
  width: 100%;
  height: 100%;
`

const HomeHero = ({title1, title2, body, ctaText, to, smaller, color}) => (
  <StaticQuery
  query={graphql`
    query {
      background: file(relativePath: { eq: "group-selfie2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `}
  render={data => (
    <Wrapper smaller={smaller}>
        <Img fluid={data.background.childImageSharp.fluid} alt="Customers travelling with BRB" />
        <BodyContainer>
          <ContentWrapper color={color} smaller={smaller}>
          <div className="content">
          <Title>
              {title1} <br />
              <span>{title2}</span>
            </Title>
            {body && body.map(para => <P key={para}>{para}</P>)}
            <CTAc href={to}>{ctaText}</CTAc>
          </div>
          </ContentWrapper>
        </BodyContainer>
      </Wrapper>
  )}
  />
)

HomeHero.propTypes = {}

export default HomeHero

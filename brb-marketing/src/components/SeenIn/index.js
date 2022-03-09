/**
 *
 * SeenIn
 *
 */

import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  align-items: center;
  padding: 0 10px;

  .hm {
    display: inherit;
    @media screen and (max-width: 420px) {
      display: none;
    }
  }

  @media screen and (min-width: 400px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (min-width: 600px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`

const Img = styled(Image)`
  width: 100%;
  max-width: 120px;
  margin-left: auto;
  margin-right: auto;
  max-height: 33px;
  img {
    object-fit: contain!important;
  }
`

export const SeenIn = () => (
  <StaticQuery
    query={graphql`
      query {
        mailOnline: file(relativePath: { eq: "press/mailOnline.png" }) {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        telegraph: file(relativePath: { eq: "press/telegraph.png" }) {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        yahoo: file(relativePath: { eq: "press/yahoo.png" }) {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        times: file(relativePath: { eq: "press/theTimes.png" }) {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        lonelyPlanet: file(relativePath: { eq: "press/lonelyplanet.png" }) {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <Wrapper>
        <a
          href="https://www.dailymail.co.uk/money/smallbusiness/article-6341517/BRB-uses-Netflix-style-subscription-offer-surprise-package-holidays.html"
          target="_blank"
          rel="noopener noreferrer"
          className="hm"
        >
          <Img fluid={data.mailOnline.childImageSharp.fluid} alt="seen in Mail Online" />
        </a>
        <a
          href="https://www.telegraph.co.uk/travel/news/brb-subscription-travel-holidays/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Img fluid={data.telegraph.childImageSharp.fluid} alt="seen in The Telegraph" />

        </a>
        <a
          href="https://sg.style.yahoo.com/50-month-three-trips-subscribe-143807937.html"
          target="_blank"
          rel="noopener noreferrer"
          className="hm"
        >
          <Img fluid={data.yahoo.childImageSharp.fluid} alt="seen in Yahoo Lifestyle" />
        </a>
        <a
          href="https://www.thetimes.co.uk/edition/money/sign-up-to-see-the-sights-for-600-gbht8bk7t/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Img fluid={data.times.childImageSharp.fluid} alt="seen in The Times" />
        </a>
        <a
          href="https://www.lonelyplanet.com/news/2018/11/14/travel-subscription-berightback/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Img fluid={data.lonelyPlanet.childImageSharp.fluid} alt="seen in Lonely Planet" />
        </a>
      </Wrapper>
    )}
  />
)

SeenIn.propTypes = {}

export default SeenIn

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
  grid-gap: 10px;
  align-items: center;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;

  .hm {
    display: inherit;
    @media screen and (max-width: 420px) {
      display: none;
    }
  }

  @media screen and (min-width: 720px) {
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
`

const Img = styled(Image)`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  img {
    object-fit: contain!important;
  }
`

const TravellerGrid = () => (
  <StaticQuery
    query={graphql`
      query {
        traveller1: file(relativePath: { eq: "travellers/7.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        traveller2: file(relativePath: { eq: "travellers/2.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 200) {
                ...GatsbyImageSharpFluid
              }
            }
        }
        traveller3: file(relativePath: { eq: "travellers/3.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 200) {
                ...GatsbyImageSharpFluid
              }
            }
        }
        traveller4: file(relativePath: { eq: "travellers/4.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 200) {
                ...GatsbyImageSharpFluid
              }
            }
        }
        traveller5: file(relativePath: { eq: "travellers/5.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 200) {
                ...GatsbyImageSharpFluid
              }
            }
        }
        traveller6: file(relativePath: { eq: "travellers/6.jpg" }) {
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
        <Img fluid={data.traveller2.childImageSharp.fluid} alt="BRB traveller" />
        <Img fluid={data.traveller3.childImageSharp.fluid} alt="BRB traveller" />
        <Img fluid={data.traveller4.childImageSharp.fluid} alt="BRB traveller" />
        <Img fluid={data.traveller5.childImageSharp.fluid} alt="BRB traveller" />
        <Img fluid={data.traveller6.childImageSharp.fluid} alt="BRB traveller" />
        <Img fluid={data.traveller1.childImageSharp.fluid} alt="BRB traveller" />
      </Wrapper>
    )}
  />
)

export const ContentfulTravellerGrid = ({ images }) => (
  <Wrapper>
    {images.map((img) => <Img fluid={img.fluid} alt="BRB traveller" />)}
  </Wrapper>
)

TravellerGrid.propTypes = {}

export default TravellerGrid

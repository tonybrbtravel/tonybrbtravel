import React from 'react'
import styled from 'styled-components'

import BodyContainer from './BodyContainer'
import H1 from './H1'
import CTA from './CTAsmall'
import { CtaContainer } from './HeroSection/styles'

const Wrapper = styled.div`
  background-color: #f0f1f6;
  padding: 80px 10px 195px 10px;
  text-align: center;
`
const Intro = styled.p`
  font-size: 22px;
  color: #1e1e1e;
  letter-spacing: 0;
  text-align: center;
  margin: 0;
`
const Body = styled.p`
  color: #868789;
  font-size: 22px;
  text-align: center;
  max-width: 420px;
  margin-left: auto;
  margin-right: auto;
`

const Img = styled.img`
  max-width: 960px;
  display: block;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: -135px;
`

const NoImg = styled.div`
  max-width: 720px;
  display: block;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: -135px;
`

const Billboard = ({ intro, title, body, ctaText, ctaLink, image }) => (
  <div>
    <Wrapper>
      <div>
        <Intro>{intro}</Intro>
        <H1>{title}</H1>
        {body && <Body>{body}</Body>}
        <CtaContainer>
          <CTA href={ctaLink}>{ctaText}</CTA>
        </CtaContainer>
      </div>
    </Wrapper>
    <BodyContainer>
      {image && <Img src={image} title={ctaText} alt={ctaText} />}
      {!image && <NoImg />}
    </BodyContainer>
  </div>
)

export default Billboard

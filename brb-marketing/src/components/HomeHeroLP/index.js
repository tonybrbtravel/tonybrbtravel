/**
 *
 * MarketingHomeHero
 *
 */

import React from 'react'
import BodyContainer from '../BodyContainer'

import { Wrapper, ContentWrapper, P, CTAc, Title } from './styles'
import styled from 'styled-components'

const Img = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: top;
  height:40vh;

  @media screen and (min-width: 600px) {
    width: 50%;
    height: 100%;
  }
`

const HomeHero = ({title, body, ctaText, to, smaller, color, image}) => {
  return (
    <Wrapper smaller={smaller}>
        <Img src={image} alt="Customers travelling with BRB" />
        <BodyContainer>
          <ContentWrapper color={color} smaller={smaller}>
          <div className="content">
          <Title 
            dangerouslySetInnerHTML={{
              __html: title,
            }} 
          />
            <P>{body}</P>
            <CTAc href={to}>{ctaText}</CTAc>
          </div>
          </ContentWrapper>
        </BodyContainer>
      </Wrapper>
  );
}

HomeHero.propTypes = {}

export default HomeHero

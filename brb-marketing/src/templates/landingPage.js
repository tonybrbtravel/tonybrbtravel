import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Spacer from '../components/Spacer'
import { H2, H2md } from '../components/H2'
import SeenIn from '../components/SeenIn'
import Metrics from '../themes/Metrics'
import { ContentfulTravellerGrid } from '../components/TravellerGrid'

import HomeHeroLP from '../components/HomeHeroLP'
import BodyContainer from '../components/BodyContainer'
import HalfContainer from '../components/HalfContainer'
import NumberPlusText from '../components/NumberPlusText'
import IconPlusText from '../components/IconPlusText'
import TextBlockGrid from '../components/TextBlockGrid'
import Pricing from '../components/Pricing'
import CTA from '../components/CTA'
import TrustBoxCarousel from '../components/TrustBoxCarousel'
import TrustBoxGrid from '../components/TrustBoxGrid'

import airportMap from '../images/airportMap.svg'
import bucketList from '../images/bucketList.png'
import tripTypes from '../images/tripTypes.png'

const BigImg = styled.img`
  margin-top: 30px;
  object-position: center;
  object-fit: cover;
  width: 100%;

  @media screen and (min-width: 600px) {
    width: auto;
    object-fit: fill;
  }
`

const landingPage = ({ pageContext, data }) => {
  const {
    heroImage,
    mainTitle,
    mainBody,
    bigText1,
    bigText2,
    ctaText,
    ctaLink,
    secondaryImages,
    valuePropositionPoints,
  } = pageContext

  return (
    <Layout>
      <Helmet>
        <title>
          BeRightBack - Discover Europe One Surprise Destination at a Time
        </title>
        <meta
          name="description"
          content="BRB is the world's first travel subscription service. Pay monthly and get a break in Europe every 4 months to a surprise destination."
        />
        <meta
          name="keywords"
          content="travel, be right back, brb, BRB, surprise, europe, holidays, subscription, flights, accommodation, hotel, app, travel agent"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="product" />
        <meta
          property="og:title"
          content="BRB: The world's first travel subscription"
        />
        <meta property="og:url" content="https://berightback.travel" />
        <meta property="og:image" content={heroImage.file.url} />
      </Helmet>
      <HomeHeroLP
        title={mainTitle}
        body={mainBody}
        image={heroImage.file.url}
        ctaText={ctaText}
        to={ctaLink}
      />
      <Spacer height="10vh" />
      <TrustBoxCarousel />
      <Spacer height="10vh" />
      <H2md
        dangerouslySetInnerHTML={{
          __html: bigText1,
        }} 
      />
      <Spacer height={Metrics.bigSpacer} />
      <ContentfulTravellerGrid images={secondaryImages} />
      <Spacer height={Metrics.hugeSpacer} />
      <H2md
        dangerouslySetInnerHTML={{
          __html: bigText2,
        }} 
      />
      <Spacer height={Metrics.bigSpacer} />
      <BodyContainer>
        <TextBlockGrid>
        {valuePropositionPoints.map((vp) => (
          <IconPlusText
            title={vp.title}
            text={vp.text.text}
            icon={vp.icon.file.url}
          />
        ))}
        </TextBlockGrid>
      </BodyContainer>
      <Spacer height={Metrics.bigSpacer} />
      <H2>Getting started couldn't be simpler</H2>
      <Spacer height={Metrics.smallSpacer} />
      <BodyContainer flex>
        <HalfContainer>
          <NumberPlusText
            number="1"
            title="Choose your trip types"
            text="Let us know the kind of trips you want to take with BRB and the activities you enjoy."
          />
        </HalfContainer>
        <BigImg src={tripTypes} height="272" />
      </BodyContainer>
      <Spacer height={Metrics.bigSpacer} />
      <BodyContainer flex>
        <HalfContainer>
          <NumberPlusText
            number="2"
            title="Build your bucketlist"
            text="Nothing’s worse than a bad surprise. So you can build a bucketlist of places you want to visit so you always go somewhere exciting."
            />
        </HalfContainer>
      <BigImg src={bucketList} height="406" />
      </BodyContainer>
      <Spacer height={Metrics.bigSpacer} />
      <BodyContainer flex>
        <HalfContainer>
          <NumberPlusText
            number="3"
            title="Select your preferred airports"
            text="Select at least 3 places you can fly from. More departure airports unlock more opportunities for destinations!"
          />
        </HalfContainer>
        <HalfContainer flex flexAlign="center" justifyContent="center">
          <img src={airportMap} alt="Airport locations in BRB" />
        </HalfContainer>
      </BodyContainer>
      <Spacer height={Metrics.bigSpacer} />
      <Pricing />
        <BodyContainer>
          <TrustBoxGrid />
        </BodyContainer>
        <Spacer height={Metrics.bigSpacer} />
        <H2>Book 3 trips in under <span>3 minutes</span>.</H2>
        <div style={{padding: '20px 20px 0px 20px', maxWidth: '420px', marginLeft: 'auto', marginRight: 'auto' }}>
          <CTA href={ctaLink}>{ctaText}</CTA>
        </div>
        <Spacer height={Metrics.bigSpacer} />
        <p style={{ textAlign: 'center' }}>As seen in:</p>

        <Spacer height={Metrics.bigSpacer} />
    </Layout>
  )
}

export default landingPage

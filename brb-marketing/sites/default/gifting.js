import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Layout from '../../src/components/layout'
import Spacer from '../../src/components/Spacer'
import Metrics from '../../src/themes/Metrics'
import GiftingHeader from '../../src/components/GiftingHeader'
import Steps from '../../src/components/Steps'
import Faqs from '../../src/components/Faqs'
import SeenIn from '../../src/components/SeenIn'
import giftCard from '../../src/images/giftcard-open.png'
import iconCustomise from '../../src/images/illustrations/customise.png'
import iconGift from '../../src/images/illustrations/gift.png'
import iconTrip from '../../src/images/illustrations/trip.png'
import giftingSocialImage from '../../src/images/card-open.jpg'

const GiftWrapped = styled.div`
  display: flex;
  flex-direction: column-reverse;

  p {
    font-size: 18px;
    text-align: center;
    padding: 0 16px;
    min-width: 360px;
  }

  img {
    margin: auto;
    width: 100%;
    height: 500px;
    object-fit: cover;
  }

  @media screen and (min-width: 700px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    img {
      width: 60%;
      object-fit: cover;
      object-position: left;
    }

    p {
      font-size: 22px;
      padding: 0 40px;
      width: 40%;
      max-width: 600px;
      text-align: left;
    }
  }
`

const GiftingPage = () => (
  <Layout>
    <Helmet>
      <title>BRB - Give the gift of travel</title>
      <meta
        name="description"
        content="Gift a BRB trip to a friend, partner, spouse or family. Make giving the gift of travel easy."
      />
      <meta
        name="keywords"
        content="travel, be right back, brb, BRB, surprise, europe, holidays, subscription, flights, accommodation, hotel, app, travel agent, gift, christmas, birthdays, anniversary"
      />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="Give the gift of travel" />
      <meta property="og:type" content="product" />
      <meta property="og:url" content="https://berightback.travel/gifting" />
      <meta property="og:image" content={giftingSocialImage} />
    </Helmet>
    <GiftingHeader />
    <GiftWrapped>
      <p>
        Help a loved one get away more next year with a BRB gift card, entitling
        them to 1, 2 or 3 weekend trips in Europe. Let them choose when they go,
        and what type of experience they have.
      </p>
      <img src={giftCard} alt="BRB gift card" />
    </GiftWrapped>
    <Spacer height={Metrics.bigSpacer} />
    <Steps
      title="How it works"
      color="#FFFFFF"
      points={[
        {
          title: 'Customise',
          text:
            'Choose your plan and number of trips you’d like to gift & write your personalised gift note.',
          icon: iconCustomise,
        },
        {
          title: 'Gift Delivery',
          text:
            'Your custom gift card is sent to you or your recipient by post.',
          icon: iconGift,
        },
        {
          title: 'Trips!',
          text:
            'Your recipient redeems a personalised travel experience (and they’ll probably be thanking you all year long).',
          icon: iconTrip,
        },
      ]}
      ctaPath="/gifting/checkout"
      ctaText="Give the gift of travel"
    />
    <Spacer height={Metrics.bigSpacer} />
    <Faqs type="gifting" />
    <Spacer height={Metrics.bigSpacer} />
  </Layout>
)

export default GiftingPage

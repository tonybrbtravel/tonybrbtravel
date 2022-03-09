import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../../../src/components/layoutnofooter'
import { ReactTypeformEmbed } from 'react-typeform-embed'

const GiftingPageCheckout = () => (
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
    </Helmet>
    <ReactTypeformEmbed
      url={'https://brbtravel.typeform.com/to/VJIapG'}
      hideFooter
      buttonText="Purchase Giftcard"
    />
  </Layout>
)

export default GiftingPageCheckout

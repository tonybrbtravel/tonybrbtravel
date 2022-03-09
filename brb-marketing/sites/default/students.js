import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Layout from '../../src/components/layout'
import homeHero from '../../src/images/homeHero.jpg'

const Wrapper = styled.div`
    display: block;

    iframe {
        width: 100%;
        min-height: 100vh;
    }
`;

const IndexPage = ({ data }) => (
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
        content="student, discount, travel, be right back, brb, BRB, surprise, europe, holidays, subscription, flights, accommodation, hotel, app, travel agent"
      />
      <meta name="robots" content="index, follow" />
      <meta property="og:type" content="product" />
      <meta
        property="og:title"
        content="BRB: The world's first travel subscription"
      />
      <meta property="og:url" content="https://berightback.travel/" />
      <meta property="og:image" content={homeHero} />
    </Helmet>
    <Wrapper>
      {/* STUDENTBEANS */}
      <script
            data-iframe='https://connect.studentbeans.com/v2/berightback/uk'
            data-load='connect'
            id='stb_root'
            src='https://cdn.studentbeans.com/third-party/all.js'
      />
        <iframe
            title="StudentBeans student discount"
            src='https://connect.studentbeans.com/v2/berightback/UK' data-load='connect'
            id='stb_root'
        />
    </Wrapper>
  </Layout>
)

export default IndexPage

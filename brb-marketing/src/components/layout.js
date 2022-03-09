import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import './layout.css'
import TrackPage from './TrackPage'
import NoticeBanner from './NoticeBanner'
import simpleAnimateIn from '../utils/simpleAnimateIn';

const Layout = ({ children, startNavTransparent, siteMode, navCtas }) => {

  if (typeof window !== 'undefined') {
    // eslint-disable-next-line global-require
    require('smooth-scroll')('a[href*="#"]');
  }

  useEffect(() => { simpleAnimateIn.init(); }, []);

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: 'Sample' },
              { name: 'keywords', content: 'sample, something' },
            ]}
          >
            <html lang="en" />
            <script type="text/javascript" src="https://www.bugherd.com/sidebarv2.js?apikey=fnxanrmgbxnkdphh71d8qq" async="true"></script>
          </Helmet>
          <TrackPage />
          <Nav
            startNavTransparent={startNavTransparent}
            siteTitle={data.site.siteMetadata.title}
            siteMode={siteMode}
            navCtas={navCtas}
          />
          <NoticeBanner />
          <div>{children}</div>
          <Footer />
        </>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

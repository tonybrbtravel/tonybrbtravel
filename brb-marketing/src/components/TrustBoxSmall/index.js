/**
 *
 * TrustBox
 *
 */

import React from 'react'
import styled from 'styled-components'
import waitForGlobal from '../../utils/waitForGlobal'

const Div = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
`
class TrustBox extends React.PureComponent {
  componentDidMount() {
    const trustbox = document.getElementById('trustbox')
    waitForGlobal('Trustpilot', 500).then(() =>
      window.Trustpilot.loadFromElement(trustbox)
    )
  }

  render() {
    // if (window.Trustpilot) {
    return (
      <Div
        id="trustbox"
        className="trustpilot-widget"
        data-locale="en-GB"
        data-template-id="5419b6a8b0d04a076446a9ad"
        data-businessunit-id="5b6057842e12e70001e6d887"
        data-style-height="24px"
        data-style-width="100%"
        data-theme="light"
      >
        <a
          href="https://uk.trustpilot.com/review/berightback.travel"
          target="_blank"
          rel="noopener noreferrer"
        >
          Trustpilot
        </a>
      </Div>
    )
    // }

    // return null
  }
}

TrustBox.propTypes = {}

export default TrustBox

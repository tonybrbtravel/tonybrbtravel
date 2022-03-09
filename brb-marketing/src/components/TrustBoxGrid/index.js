/**
 *
 * TrustBoxGrid
 *
 */

import React from 'react'
import styled from 'styled-components'
import waitForGlobal from '../../utils/waitForGlobal'

const Div = styled.div`
  display:block;
  margin: 30px 10px 0px 10px;
  align-items: center;
`

class TrustBoxGrid extends React.PureComponent {
  componentDidMount() {
    const trustbox = document.getElementById('trustboxgrid')
    waitForGlobal('Trustpilot', 500).then(() =>
      window.Trustpilot.loadFromElement(trustbox)
    )
  }

  render() {
    return (
      <Div>
        <div
          id="trustboxgrid"
          className="trustpilot-widget"
          data-locale="en-GB"
          data-template-id="539adbd6dec7e10e686debee"
          data-businessunit-id="5b6057842e12e70001e6d887"
          data-style-height="600px"
          data-style-width="100%"
          data-theme="light"
          data-stars="4,5"
        >
          <a
            href="https://uk.trustpilot.com/review/berightback.travel"
            target="_blank"
            rel="noopener noreferrer"
          >
            Trustpilot
          </a>
        </div>
      </Div>
    )
  }
}

TrustBoxGrid.propTypes = {}

export default TrustBoxGrid

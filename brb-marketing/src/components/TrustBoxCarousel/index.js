/**
 *
 * TrustBoxCarousel
 *
 */

import React from 'react'
import styled from 'styled-components'
import waitForGlobal from '../../utils/waitForGlobal'

const Div = styled.div`
  display:block;
  margin: 0px 10px;
  align-items: center;
`

class TrustBoxCarousel extends React.PureComponent {
  componentDidMount() {
    const trustbox = document.getElementById('trustbox')
    waitForGlobal('Trustpilot', 500).then(() =>
      window.Trustpilot.loadFromElement(trustbox)
    )
  }

  render() {
    const { type } = this.props;
    let dataTemplate = "53aa8912dec7e10d38f59f36"
    let dataHeight = "130px"

    switch(type) {
      case "slider":
        dataTemplate = "54ad5defc6454f065c28af8b";
        dataHeight = "240px"
        break;
      default:
        break;
    }

    return (
      <Div>
        <div
          id="trustbox"
          className="trustpilot-widget"
          data-locale="en-GB"
          data-template-id={dataTemplate}
          data-businessunit-id="5b6057842e12e70001e6d887"
          data-style-height={dataHeight}
          data-style-width="100%"
          data-theme="light"
          data-tags="SelectedReview"
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

TrustBoxCarousel.propTypes = {}

export default TrustBoxCarousel

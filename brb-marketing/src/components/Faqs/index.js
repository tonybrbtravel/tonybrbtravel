/*
 *
 * Faqs
 *
 */

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import content from './content'
import BodyContainer from '../BodyContainer'
import gifting from './gifting'
import Colors from '../../themes/Colors'
import { fadeIn } from '../../themes/animations'
import _ from 'lodash'

const Wrapper = styled.div`
  padding: 60px 20px 0 20px;
  border-top: 1px solid #dadada;
`

const Title = styled.h2`
  font-size: 24px;
  color: #000000;
  letter-spacing: -0.39px;
  margin-bottom: 24px;
`

const Ul = styled.ul`
  list-style-type: none;
  padding: 0;
  animation: ${fadeIn} 0.5s ease-in-out;

  li {
    padding: 0 0 16px 0;
    margin: 0;
    border-bottom: 1px solid #dadada;

    h3 {
      font-size: 16px;
      margin-bottom: 8px;
    }

    p {
      max-width: 660px;
      margin: 0;
      color: #8f8f8f;
    }
  }
`

const A = styled.a`
  color: ${Colors.red};
  display: ${props => (props.toggled ? 'none' : 'block')};

  &:hover {
    cursor: pointer;
  }
`

class Faqs extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)

    this.toggleOn = this.toggleOn.bind(this)
    this.toggleOff = this.toggleOff.bind(this)

    this.state = { toggled: false }
  }

  toggleOn() {
    this.setState({ toggled: true })
  }
  toggleOff() {
    this.setState({ toggled: false })
  }

  render() {
    let FaqToDisplay = content
    if (this.props.type === 'gifting') {
      FaqToDisplay = gifting
    }
    const chunks = _.chunk(FaqToDisplay, 3)
    return (
      <Wrapper>
        <BodyContainer>
          <Title>Frequently Asked Questions</Title>
          <Ul>
            {chunks[0].map(faq => (
              <li key={faq.title}>
                <h3>{faq.title}</h3>
                <p>{faq.text}</p>
              </li>
            ))}
          </Ul>
          {chunks[1] && (
            <A onClick={this.toggleOn} toggled={this.state.toggled}>
              More ⌄
            </A>
          )}
          {this.state.toggled && (
            <div>
              <Ul>
                {chunks[1].map(faq => (
                  <li key={faq.title}>
                    <h3>{faq.title}</h3>
                    <p>{faq.text}</p>
                  </li>
                ))}
              </Ul>
              <A href="https://intercom.help/brb">More FAQs</A>
            </div>
          )}
        </BodyContainer>
      </Wrapper>
    )
  }
}

Faqs.propTypes = {
  type: PropTypes.string,
}

export default Faqs

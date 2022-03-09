/**
 *
 * PlanBox
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  Header,
  Content,
  Ul,
  Btn,
  Caret,
} from './styles'

import caret from '../../images/icons/caret.png'

class PlanBox extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { mobileActive: this.props.active, isTogether: false }
    this.toggleView = this.toggleView.bind(this);
  }

  toggleView() {
    this.setState(prevState => ({ mobileActive: !prevState.mobileActive}))
  }

  render() {
    const { plan, price, gradient, includes, pastel, isTogether, small, order } = this.props

    return (
      <Wrapper bgColor={pastel} small={small} order={order}>
        <Header bg={gradient} active={this.state.mobileActive} onClick={() => this.toggleView()}>
          <div>
            <h3>{plan}.</h3>
            <p><span>£{price}</span> / month</p>
          </div>
          <Caret active={this.state.mobileActive}><img src={caret} alt="view plan details" /></Caret>
        </Header>
        <Content active={this.state.mobileActive}>
            <div>
              <h4>What's included</h4>
              <Ul>
                {includes.map((listItem, index) => <li key={listItem + index}>{listItem}</li>)}
                {isTogether && <li>A plus one on every trip</li>}
              </Ul>
            </div>
            <Btn href="https://app1.berightback.travel/signup/">Get Started</Btn>
            <Btn href="https://app1.berightback.travel/signup/">Get Started</Btn>
          </Content>
      </Wrapper>
    )
  }
}

PlanBox.propTypes = {
  plan: PropTypes.string,
  price: PropTypes.string,
}

export default PlanBox

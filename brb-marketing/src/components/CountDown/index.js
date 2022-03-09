/**
 *
 * CountDown
 *
 */

import React from 'react'
import styled from 'styled-components'
import ReactMomentCountDown from 'react-moment-countdown'
import H1 from '../../components/H1'
import Colors from '../../themes/Colors'
import { scaleIn } from '../../themes/animations'

const Wrapper = styled.div`
  display: flex;
  text-align: ${props => (props.small ? 'left' : 'center')};
  justify-content: ${props => (props.small ? 'flex-start' : 'center')};
`

const Block = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 12px;
    margin-top: -18px;
    color: ${Colors.red};
  }
`

const Ticker = styled(H1)`
  padding: ${props => (props.small ? '0 12px 0 0' : '')};
  animation: ${scaleIn} 0.5s ease-in-out forwards;
  font-size: ${props => (props.small ? '36px' : '')};
  line-height: ${props => (props.small ? '38px' : '')};
  margin: ${props => (props.small ? '12px 0' : '')};
`

class CountDown extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { date, small } = this.props
    return (
      <Wrapper small={small}>
        <Block>
          <Ticker small={small}>
            <ReactMomentCountDown toDate={date} targetFormatMask="DDD" />
          </Ticker>
          <p>Days</p>
        </Block>
        <Block>
          <Ticker small={small}>
            <ReactMomentCountDown toDate={date} targetFormatMask="HH" />
          </Ticker>
          <p>Hours</p>
        </Block>
        <Block>
          <Ticker small={small}>
            <ReactMomentCountDown toDate={date} targetFormatMask="MM" />
          </Ticker>
          <p>Mins</p>
        </Block>
      </Wrapper>
    )
  }
}

CountDown.propTypes = {}

export default CountDown

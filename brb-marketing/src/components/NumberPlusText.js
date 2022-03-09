/**
 *
 * NumberPlusText
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Colors from '../themes/Colors'

const NumberPlusText = ({ number, title, text }) => (
  <Wrapper>
    <Number>{number}</Number>
    <h4>{title}</h4>
    <p>{text}</p>
  </Wrapper>
)

const Wrapper = styled.div`
  width: 100%;
  padding: 0 20px;

  img {
    width: 75px;
    margin: 0 0 0 -10px;
  }

  h4 {
    font-size: 24px;
    color: #000000;
    letter-spacing: -1px;
    margin: 0 0 12px 0;
  }

  p {
    margin: 0 0 12px 0;
    color: #7f7f7f;
  }

  @media screen and (min-width: 600px) {
    max-width: 263px;
  }
`

const Number = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 30px;
  background-color: ${Colors.red};
  color: white;
  font-size: 22px;
  line-height: 45px;
  text-align: center;
  font-weight: 900;
  margin-bottom: 18px;
`

NumberPlusText.propTypes = {
  children: PropTypes.any,
}

export default NumberPlusText

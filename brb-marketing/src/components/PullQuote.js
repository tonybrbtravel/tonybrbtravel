/**
 *
 * PullQuote
 *
 */

import React from 'react'
import styled from 'styled-components'
import Colors from '../themes/Colors'

const Wrapper = styled.div`
  padding: 0 20px;
`

const Quote = styled.p`
  font-size: 102px;
  color: ${Colors.red};
  margin: 0;
  line-height: 36px;
`

const Text = styled.p`
  font-size: 22px;
  line-height: 28px;
  margin: -20px 0 18px 0;
`

const SubText = styled.p`
  margin: 0;
  font-size: 18px;
  color: #8f8f8f;
`

const PullQuote = ({ text, subtext }) => (
  <Wrapper>
    <Quote>“</Quote>
    <Text>{text}</Text>
    <SubText>{subtext}</SubText>
  </Wrapper>
)

export default PullQuote

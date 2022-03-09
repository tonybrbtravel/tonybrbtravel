/**
 *
 * IconPlusText
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const IconPlusText = ({ icon, title, text }) => (
  <Wrapper>
    <img src={icon} alt="" />
    <h3>{title}</h3>
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

  h3 {
    font-size: 24px;
    color: #000000;
    letter-spacing: -1px;
    margin: 0 0 12px 0;
  }

  p {
    margin: 0 0 12px 0;
    color: #7f7f7f;
  }
`

IconPlusText.propTypes = {
  children: PropTypes.any,
}

export default IconPlusText

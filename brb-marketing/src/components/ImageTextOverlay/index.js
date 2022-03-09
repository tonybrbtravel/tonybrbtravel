/**
 *
 * ImageTextOverlay
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import H1 from '../../components/H1'
import SubText from '../../components/SubText'

const Background = styled.div`
  background-image: ${props => (props.image ? `url(${props.image})` : '')};
  background-repeat: no-repeat;
  background-size: cover;
  color: white;

  padding: 60px 0px 0px 0px;

  img {
    width: 100%;
  }
`

function ImageTextOverlay({
  backgroundImage,
  foregroundImage,
  alt,
  title,
  text,
}) {
  return (
    <Background image={backgroundImage}>
      <H1>{title}</H1>
      <SubText>{text}</SubText>
      <img src={foregroundImage} alt={alt} />
    </Background>
  )
}

ImageTextOverlay.propTypes = {
  backgroundImage: PropTypes.string,
  foregroundImage: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  alt: PropTypes.string,
}

export default ImageTextOverlay

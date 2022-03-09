/**
 *
 * PhotoInContainer
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import containerImage from '../images/people/container.png'
import Image from 'gatsby-image'

const PhotoInContainer = ({ src, alt, title }) => (
  <Div>
    <Img fluid={src} alt={alt} title={title} />
  </Div>
)

const Div = styled.div`
  width: 100%;
  background-image: url('${containerImage}');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`
const Img = styled(Image)`
  width: 60%;
  display: block;
  margin: auto;
`

PhotoInContainer.propTypes = {
  src: PropTypes.object,
  title: PropTypes.string,
  alt: PropTypes.string,
}

export default PhotoInContainer

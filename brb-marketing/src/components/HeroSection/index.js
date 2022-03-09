/**
 *
 * HeroSection
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  Container,
  ValueProp,
  FeatureText,
  CtaContainer,
} from './styles'
import CTA from '../../components/CTA'

// eslint-disable-next-line react/prefer-stateless-function
class HeroSection extends React.PureComponent {
  render() {
    const { title, text, ctaText, ctaPath, img, ctaLink } = this.props
    return (
      <Wrapper bg={img}>
        <Container>
          <ValueProp>{title}</ValueProp>
          <FeatureText>{text}</FeatureText>
          {ctaPath && (
            <CtaContainer>
              <CTA to={ctaPath}>{ctaText}</CTA>
            </CtaContainer>
          )}
          {ctaLink && (
            <CtaContainer>
              <CTA href={ctaLink}>{ctaText}</CTA>
            </CtaContainer>
          )}
        </Container>
      </Wrapper>
    )
  }
}

HeroSection.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  ctaText: PropTypes.string,
  ctaPath: PropTypes.string,
  img: PropTypes.string,
}

export default HeroSection

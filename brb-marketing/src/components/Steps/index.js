/**
 *
 * HowItWorks
 *
 */

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import H1 from '../../components/H1'
import SubText from '../../components/H2'
import BigNumber from '../../components/BigNumber'
import BigIcon from '../../components/BigIcon'
import CTA from '../../components/CTA'

const Wrapper = styled.div`
  background: ${props => (props.color ? props.color : 'black')};
  color: black;
  text-align: center;
  padding: 60px 20px 30px 20px;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: auto;
  margin-top: 30px;
  max-width: 1200px;
  justify-content: center;

  @media screen and (min-width: 600px) {
    flex-wrap: no-wrap;
  }
`

const NumberBlock = styled.div`
  padding: 0 10px 30px 10px;
  font-size: 16px;
  text-align: center;

  @media screen and (min-width: 600px) {
    font-size: 16px;
    line-height: 1.2;
    padding: 0 10px;
    max-width: 30%;
  }
`

function Steps(props) {
  const { ctaTrack, color, title, points, ctaPath, ctaText } = props
  return (
    <Wrapper color={color}>
      {props.title && <H1>{title}</H1>}
      {props.subtitle && <SubText>{props.subtitle}</SubText>}
      <Container>
        {points.map((item, value) => (
          <NumberBlock key={item.title}>
            {!item.icon && <BigNumber value={value + 1} />}
            {item.icon && <BigIcon icon={item.icon} />}
            <p>
              <strong>{item.title}</strong>
            </p>
            <p>{item.text}</p>
          </NumberBlock>
        ))}
        {ctaPath && (
          <CTA to={ctaPath} onClick={() => ctaTrack()}>
            {ctaText}
          </CTA>
        )}
      </Container>
    </Wrapper>
  )
}

Steps.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  points: PropTypes.array,
  ctaTrack: PropTypes.func,
  ctaText: PropTypes.string,
  ctaPath: PropTypes.string,
  color: PropTypes.string,
}

export default Steps

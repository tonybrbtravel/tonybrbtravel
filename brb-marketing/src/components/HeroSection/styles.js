import styled from 'styled-components'
import { fadeIn } from '../../themes/animations'

export const Wrapper = styled.section`
  background-image: ${props => (props.bg ? `url(${props.bg})` : '')};
  background-size: cover;
  background-position: 50% 100%;
  min-height: 300px;
  padding: 30px 20px 30px 20px;
  display: flex;
  align-items: center;
  color: #fff;
  justify-content: center;
  text-align: center;

  @media screen and (min-width: 600px) {
    min-height: 584px;
  }
`

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
  display: block;
  align-items: center;
  flex-direction: column;
  animation: ${fadeIn} 2s ease-in-out backwards;
`

export const FeatureText = styled.p`
  font-size: 18px;
  max-width: 620px;
  font-weight: normal;
  letter-spacing: 0;
  line-height: 28px;
  margin-left: auto;
  margin-top: 24px;
  margin-right: auto;

  @media screen and (min-width: 600px) {
    margin-top: 46px;
    font-size: 24px;
    line-height: 32px;
  }
`

export const CtaContainer = styled.div`
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 32px;
`

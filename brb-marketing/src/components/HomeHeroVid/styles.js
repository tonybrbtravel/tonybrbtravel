import styled from 'styled-components'
import CTA from '../../components/CTAsmall'
import Colors from '../../themes/Colors';
import { fadeIn } from '../../themes/animations'

// component setup
export const Wrapper = styled.div`
  display: block;

  @media screen and (min-width: 620px) {
    display: flex;
    flex-direction: row-reverse;
    min-height: 90vh;
  }
`

export const Lightbox = styled.div`
  position: absolute;
  bottom: 20px;
  padding: 10px 30px;

  font-size: 14px;
  color: white;
  text-shadow: 0px 0px 10px black;

  p {
    margin: 0;
  }
`;

export const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

// Content
export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  background-color: white;
  animation: ${fadeIn} 1s ease-in-out;

  .content {
    max-width: 360px;
    text-align: center;
  }

  @media screen and (min-width: 620px) {
    margin: 0;

    .content {
      text-align: left;
    }
  }
`

export const Title = styled.h1`
  font-size: 36px;
  letter-spacing: -2px;
  font-weight: 900;
  line-height: 1;
  color: inherit;
  margin-bottom: 16px;

  span {
    color: ${Colors.red};
  }

  @media screen and (min-width: 620px) {
    font-size: 42px;
  }
`
export const P = styled.p`
  color: #707070;
  font-size: 16px;
  letter-spacing: 0;
  margin: 0;
  margin-bottom: 22px;

  @media screen and (min-width: 620px) {
    font-size: 18px;
  }
`

export const CTAc = styled(CTA)``

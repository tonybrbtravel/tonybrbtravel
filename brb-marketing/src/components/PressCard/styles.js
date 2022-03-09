import styled from 'styled-components'
import Colors from '../../themes/Colors'

export const Wrapper = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  overflow: hidden;
  border-radius: 6px;
  width: 100%;
  text-align: left;
  padding-bottom: 20px;
  box-shadow: 0 2px 24px ${Colors.lightShadow};

  img {
    width: 100%;
    object-fit: cover;
  }
`
export const ImgContainer = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 60%;
  margin-bottom: 12px;
  overflow: hidden;
`
export const Title = styled.h4`
  font-size: 18px !important;
  letter-spacing: -1px;
  padding: 0 16px;
  text-align: left !important;
`
export const Description = styled.p`
  padding: 0 16px;
  color: #858585;
`
export const Byline = styled.p`
  padding: 0 16px;
  font-size: 12px;
  text-transform: uppercase;
  span {
    color: #858585;
  }

  img {
    max-width: 100px;
    max-height: 50px;
  }
`

export const Grid = styled.div`
  width: 100%;
  max-width: 1400px;
  display: grid;
  margin-left: auto;
  margin-right: auto;
  grid-gap: 20px;
  padding: 0 20px;
  grid-template-columns: 1fr;

  @media screen and (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`
